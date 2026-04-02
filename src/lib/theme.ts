/** localStorage key for light/dark preference */
export const THEME_STORAGE_KEY = 'theme'

export type ThemePreference = 'light' | 'dark'

export function getStoredTheme(): ThemePreference {
  if (typeof window === 'undefined') return 'light'
  try {
    return localStorage.getItem(THEME_STORAGE_KEY) === 'dark'
      ? 'dark'
      : 'light'
  } catch {
    return 'light'
  }
}

export function applyTheme(theme: ThemePreference): void {
  const root = document.documentElement
  if (theme === 'dark') root.classList.add('dark')
  else root.classList.remove('dark')
  try {
    localStorage.setItem(THEME_STORAGE_KEY, theme)
  } catch {
    /* quota / private mode */
  }
}

export function toggleTheme(): ThemePreference {
  const next: ThemePreference =
    document.documentElement.classList.contains('dark') ? 'light' : 'dark'
  applyTheme(next)
  return next
}
