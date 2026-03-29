export function MetricCard({
  label,
  value,
  dark = false,
}: {
  label: string
  value: string
  dark?: boolean
}) {
  return (
    <div
      className={[
        'rounded-2xl px-4 py-4',
        dark
          ? 'bg-stone-950 text-white'
          : 'border border-stone-200 bg-stone-50 text-stone-950',
      ].join(' ')}
    >
      <p
        className={[
          'text-xs uppercase tracking-[0.2em]',
          dark ? 'text-stone-400' : 'text-stone-500',
        ].join(' ')}
      >
        {label}
      </p>
      <p className="mt-2 text-3xl font-black">{value}</p>
    </div>
  )
}
