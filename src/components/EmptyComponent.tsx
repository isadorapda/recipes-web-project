interface Props {
  title: string
  subtitle: string
}

export function EmptyComponent({ title, subtitle }: Props) {
  return (
    <div
      aria-modal="true"
      className="w-full lg:w-[75%] px-6 md:px-0 py-6 text-center mx-auto col-center gap-6 text-gray-500"
    >
      <h1 className="text-sm lg:text-lg uppercase font-thin">{title}</h1>
      <div className="text-sm md:text-base xl:text-xl tracking-wide md:px-8">
        <h2 className="pb-4">
          Start by searching by{' '}
          <a href="/search-recipes" className="text-red-500 italic">
            recipe name{' '}
          </a>
          or by{' '}
          <a href="/whats-in-your-fridge" className="text-red-500 italic">
            ingredients that you have at home
          </a>{' '}
          .
        </h2>
        <h2>{subtitle}</h2>
      </div>
    </div>
  )
}
