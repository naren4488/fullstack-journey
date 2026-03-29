/** HTML id for a topic row; must stay in sync with `TopicsTable` row `id`. */
export function topicRowId(topicLabel: string): string {
  const base = topicLabel
    .toLowerCase()
    .replace(/[^a-z0-9]+/gi, '-')
    .replace(/^-+|-+$/g, '')
  return base ? `topic-${base}` : 'topic-row'
}
