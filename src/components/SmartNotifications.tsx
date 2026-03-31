import { Link } from 'react-router-dom';
import type { SmartNotification } from '../lib/smartNotifications';

interface SmartNotificationsProps {
  notifications: SmartNotification[];
  onDismiss?: (id: string) => void;
}

function NotificationIcon({ type }: { type: string }) {
  switch (type) {
    case 'calendar':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
          <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
          <line x1="16" y1="2" x2="16" y2="6" />
          <line x1="8" y1="2" x2="8" y2="6" />
          <line x1="3" y1="10" x2="21" y2="10" />
        </svg>
      );
    case 'target':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
          <circle cx="12" cy="12" r="10" />
          <circle cx="12" cy="12" r="6" />
          <circle cx="12" cy="12" r="2" />
        </svg>
      );
    case 'book':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
          <path d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      );
    case 'flame':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
          <path d="M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z" />
        </svg>
      );
    case 'trophy':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
          <path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6m0 0V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2h1.5a2.5 2.5 0 0 1 0 5H14m0 0v2.5a6.5 6.5 0 0 1-13 0V9z" />
          <path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" />
        </svg>
      );
    case 'rocket':
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
          <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
          <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
          <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
          <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" className="h-5 w-5 fill-none stroke-current stroke-2">
          <circle cx="12" cy="12" r="10" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
  }
}

function NotificationCard({ notification, onDismiss }: {
  notification: SmartNotification;
  onDismiss?: (id: string) => void;
}) {
  const getCardStyles = (type: string) => {
    switch (type) {
      case 'study':
        return 'border-amber-200 bg-amber-50';
      case 'inactive':
      case 'pending':
        return 'border-amber-200 bg-amber-50';
      case 'celebration':
      case 'progress':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-stone-200 bg-stone-50';
    }
  };

  const getActionColor = (type: string) => {
    switch (type) {
      case 'study':
        return 'text-amber-700 hover:text-amber-800';
      case 'inactive':
      case 'pending':
        return 'text-amber-700 hover:text-amber-800';
      case 'celebration':
      case 'progress':
        return 'text-green-700 hover:text-green-800';
      default:
        return 'text-stone-700 hover:text-stone-800';
    }
  };

  return (
    <div className={`rounded-xl border p-4 shadow-sm ${getCardStyles(notification.type)}`}>
      <div className="flex items-start gap-3">
        <div className={`rounded-full p-2 ${getCardStyles(notification.type)}`}>
          <NotificationIcon type={notification.icon} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-semibold text-stone-900">{notification.title}</h3>
          <p className="text-sm text-stone-700 mt-1">{notification.message}</p>
          {notification.actionText && notification.actionLink && (
            <Link
              to={notification.actionLink}
              className={`inline-flex items-center text-xs font-medium mt-2 ${getActionColor(notification.type)}`}
            >
              {notification.actionText} →
            </Link>
          )}
        </div>
        {onDismiss && notification.type !== 'study' && (
          <button
            onClick={() => onDismiss(notification.id)}
            className="text-stone-400 hover:text-stone-600 p-1"
            aria-label="Dismiss notification"
          >
            <svg viewBox="0 0 24 24" className="h-4 w-4 fill-none stroke-current stroke-2">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
}

export function SmartNotifications({ notifications, onDismiss }: SmartNotificationsProps) {
  if (notifications.length === 0) {
    return null;
  }

  // Show top notifications (increased limit since we now include AI suggestions)
  const displayNotifications = notifications.slice(0, 5);

  return (
    <section className="space-y-3">
      {displayNotifications.map((notification) => (
        <NotificationCard
          key={notification.id}
          notification={notification}
          onDismiss={onDismiss}
        />
      ))}
    </section>
  );
}