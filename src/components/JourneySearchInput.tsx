export function JourneySearchInput({
  id,
  label,
  value,
  onChange,
  placeholder,
}: {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  return (
    <label
      htmlFor={id}
      className="flex w-full max-w-xl flex-col gap-1.5 text-sm font-medium text-stone-700"
    >
      {label}
      <input
        id={id}
        type="search"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        autoComplete="off"
        className="w-full rounded-xl border border-stone-200 bg-white px-3 py-2.5 text-stone-900 outline-none ring-amber-500/30 placeholder:text-stone-400 focus:ring-2"
      />
    </label>
  )
}
