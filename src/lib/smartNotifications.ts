import type { Module } from '../data/modules';

export type StudySuggestion = {
  type: 'topic' | 'module';
  module: string;
  topic?: string;
  reason: string;
};

export type NotificationType = 'streak' | 'inactive' | 'pending' | 'progress' | 'celebration' | 'study';

export type SmartNotification = {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  actionText?: string;
  actionLink?: string;
  priority: 'low' | 'medium' | 'high';
  icon: string;
};

const LAST_ACTIVITY_KEY = 'journey-last-activity';
const STREAK_KEY = 'journey-study-streak';

export async function updateLastActivity(): Promise<void> {
  const now = new Date().toISOString();
  localStorage.setItem(LAST_ACTIVITY_KEY, now);
  updateStreak();

  try {
    await fetch('http://localhost:8080/api/v1/activity/touch', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    })
  } catch (error) {
    console.warn('[ACTIVITY TOUCH ERROR] Cannot send activity touch to backend:', error)
  }
}

export function getLastActivityDate(): Date | null {
  const stored = localStorage.getItem(LAST_ACTIVITY_KEY);
  return stored ? new Date(stored) : null;
}

export function getDaysSinceLastActivity(): number {
  const lastActivity = getLastActivityDate();
  if (!lastActivity) return Infinity;

  const now = new Date();
  const diffTime = now.getTime() - lastActivity.getTime();
  return Math.floor(diffTime / (1000 * 60 * 60 * 24));
}

export function getCurrentStreak(): number {
  const stored = localStorage.getItem(STREAK_KEY);
  return stored ? parseInt(stored, 10) : 0;
}

export function updateStreak(): void {
  const daysSince = getDaysSinceLastActivity();
  const currentStreak = getCurrentStreak();

  if (daysSince === 0) {
    // Already studied today, streak continues
    return;
  } else if (daysSince === 1) {
    // Studied yesterday, streak increases
    localStorage.setItem(STREAK_KEY, (currentStreak + 1).toString());
  } else {
    // Streak broken, reset to 1
    localStorage.setItem(STREAK_KEY, '1');
  }
}

export function getNextStudySuggestion(modules: Module[]): StudySuggestion | null {
  // Find module with most progress but not complete
  const inProgressModules = modules
    .filter(m => m.topics.some(t => t.done) && m.topics.some(t => !t.done))
    .sort((a, b) => {
      const aProgress = a.topics.filter(t => t.done).length / a.topics.length;
      const bProgress = b.topics.filter(t => t.done).length / b.topics.length;
      return bProgress - aProgress; // Most progressed first
    });

  if (inProgressModules.length > 0) {
    const module = inProgressModules[0];
    const nextTopic = module.topics.find(t => !t.done);
    return {
      type: 'topic',
      module: module.title,
      topic: nextTopic?.label,
      reason: `Continue where you left off in ${module.title}`
    };
  }

  // If no in-progress modules, suggest next module
  const nextModule = modules.find(m => m.topics.every(t => !t.done));
  if (nextModule) {
    return {
      type: 'module',
      module: nextModule.title,
      reason: `Start your next learning module`
    };
  }

  return null;
}

export function getSmartNotifications(modules: Module[]): SmartNotification[] {
  const notifications: SmartNotification[] = [];
  const daysSince = getDaysSinceLastActivity();
  const currentStreak = getCurrentStreak();

  // Calculate progress stats
  const totalTopics = modules.reduce((sum, module) => sum + module.topics.length, 0);
  const completedTopics = modules.reduce(
    (sum, module) => sum + module.topics.filter((topic) => topic.done).length,
    0,
  );
  const completionRate = totalTopics > 0 ? (completedTopics / totalTopics) * 100 : 0;

  // Find modules with pending topics
  const modulesWithPending = modules.filter(m =>
    m.topics.some(t => !t.done) && m.topics.some(t => t.done)
  );

  // Get AI suggestions
  const studySuggestion = getNextStudySuggestion(modules);

  // 1. Study suggestion (always show if available)
  if (studySuggestion) {
    notifications.push({
      id: 'study-suggestion',
      type: 'study',
      title: 'Next kya padhe?',
      message: studySuggestion.type === 'topic'
        ? `${studySuggestion.topic} in ${studySuggestion.module}`
        : `Start ${studySuggestion.module}`,
      actionText: 'Continue Learning',
      actionLink: `/modules/${modules.find(m => m.title === studySuggestion.module)?.slug}`,
      priority: 'medium',
      icon: 'book'
    });
  }

  // 3. Inactive user notification
  if (daysSince >= 1) {
    const message = daysSince === 1
      ? "You haven't studied today. Keep your streak going!"
      : `You haven't studied for ${daysSince} days. Time to get back on track!`;

    notifications.push({
      id: 'inactive',
      type: 'inactive',
      title: 'Missed Study Session',
      message,
      actionText: 'Continue Learning',
      actionLink: modulesWithPending[0]?.slug ? `/modules/${modulesWithPending[0].slug}` : '/',
      priority: daysSince >= 3 ? 'high' : 'medium',
      icon: 'calendar'
    });
  }

  // 4. Pending module completion
  if (modulesWithPending.length > 0) {
    const topModule = modulesWithPending[0];
    const pendingCount = topModule.topics.filter(t => !t.done).length;

    notifications.push({
      id: 'pending',
      type: 'pending',
      title: 'Complete Your Module',
      message: `Finish ${pendingCount} remaining topics in ${topModule.title}`,
      actionText: 'Continue',
      actionLink: `/modules/${topModule.slug}`,
      priority: 'medium',
      icon: 'target'
    });
  }

  // 5. Streak celebration
  if (currentStreak >= 3 && daysSince === 0) {
    notifications.push({
      id: 'streak',
      type: 'celebration',
      title: `🔥 ${currentStreak} Day Streak!`,
      message: "You're on fire! Keep up the amazing progress.",
      priority: 'low',
      icon: 'flame'
    });
  }

  // 6. Progress milestone
  if (completionRate >= 25 && completionRate % 25 === 0) {
    const milestone = Math.floor(completionRate / 25) * 25;
    notifications.push({
      id: 'progress',
      type: 'progress',
      title: `🎉 ${milestone}% Complete!`,
      message: `You've completed ${milestone}% of your learning journey. Amazing work!`,
      priority: 'low',
      icon: 'trophy'
    });
  }

  // 7. First study session encouragement
  if (completedTopics === 0 && daysSince === Infinity) {
    notifications.push({
      id: 'welcome',
      type: 'progress',
      title: 'Welcome to Your Journey!',
      message: 'Ready to start learning? Begin with the HTML module.',
      actionText: 'Get Started',
      actionLink: '/modules/html',
      priority: 'medium',
      icon: 'rocket'
    });
  }

  // Sort by priority (high -> medium -> low)
  const priorityOrder = { high: 3, medium: 2, low: 1 };
  return notifications.sort((a, b) => priorityOrder[b.priority] - priorityOrder[a.priority]);
}