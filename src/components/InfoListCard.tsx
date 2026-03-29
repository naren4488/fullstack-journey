import { FeatureIcon } from './FeatureIcon'

export function InfoListCard({
  title,
  subtitle,
  items,
  icon,
}: {
  title: string
  subtitle: string
  items: string[]
  icon: 'grid' | 'check' | 'spark' | 'flag'
}) {
  return (
    <section className="rounded-[1.75rem] border border-stone-200/80 bg-white/80 p-6 shadow-[0_16px_40px_rgba(87,57,24,0.08)]">
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-900">
          <FeatureIcon type={icon} />
        </div>
        <div>
          <h2 className="text-2xl font-bold text-stone-950">{title}</h2>
          <p className="mt-2 text-sm leading-6 text-stone-600">{subtitle}</p>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {items.map((item, index) => (
          <div
            key={item}
            className="flex gap-3 rounded-2xl border border-stone-200 bg-stone-50 p-4"
          >
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-stone-950 text-xs font-bold text-white">
              {index + 1}
            </div>
            <p className="text-sm leading-6 text-stone-700">{item}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
