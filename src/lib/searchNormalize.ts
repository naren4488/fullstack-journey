/** Lowercase trim for client-side contains checks. */
export function normalizeSearchQuery(raw: string): string {
  return raw.trim().toLowerCase()
}

export function textMatchesQuery(text: string, normalizedQuery: string): boolean {
  if (!normalizedQuery) return true
  return text.toLowerCase().includes(normalizedQuery)
}
