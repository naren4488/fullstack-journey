const STORAGE_KEY = 'journey-search-recent'
const MAX_ITEMS = 8

export function getRecentSearches(): string[] {
  if (typeof window === 'undefined') return []
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as unknown
    if (!Array.isArray(parsed)) return []
    return parsed.filter((x): x is string => typeof x === 'string' && x.trim().length > 0)
  } catch {
    return []
  }
}

export function pushRecentSearch(query: string): void {
  const trimmed = query.trim()
  if (!trimmed || typeof window === 'undefined') return
  const prev = getRecentSearches().filter((s) => s.toLowerCase() !== trimmed.toLowerCase())
  const next = [trimmed, ...prev].slice(0, MAX_ITEMS)
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
}
