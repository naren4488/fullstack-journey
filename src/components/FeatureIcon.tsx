export function FeatureIcon({ type }: { type: 'grid' | 'check' | 'spark' | 'flag' }) {
  if (type === 'check') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
        <path d="m5 13 4 4L19 7" />
      </svg>
    )
  }

  if (type === 'spark') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
        <path d="M12 3v5M12 16v5M4.9 4.9l3.5 3.5M15.6 15.6l3.5 3.5M3 12h5M16 12h5M4.9 19.1l3.5-3.5M15.6 8.4l3.5-3.5" />
      </svg>
    )
  }

  if (type === 'flag') {
    return (
      <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
        <path d="M6 21V5m0 0h10l-2 3 2 3H6" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6 fill-none stroke-current stroke-2">
      <path d="M4 4h7v7H4zm9 0h7v7h-7zM4 13h7v7H4zm9 0h7v7h-7z" />
    </svg>
  )
}
