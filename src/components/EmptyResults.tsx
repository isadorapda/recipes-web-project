interface Props {
  setIsModalOpen: (visible: boolean) => void
}
export function EmptyResults({ setIsModalOpen }: Props) {
  return (
    <div
      aria-modal="true"
      onClick={() => setIsModalOpen(false)}
      className="col-center w-screen h-screen fixed top-0 left-0 z-50 bg-[rgba(0,0,0,0.4)]"
    >
      <div className="absolute top-44 z-30 p-10 col-center gap-4 bg-white rounded-md shadow-2xl text-base lg:text-lg">
        <h2>Sorry, we could not find any recipe matching your search. </h2>
        <h3>Try changing your filters.</h3>

        <button
          type="button"
          title="Go back to search"
          name="go back to search"
          onClick={() => setIsModalOpen(false)}
          className="px-3 py-1 bg-red-500 shadow-lg hover:shadow-2xl rounded-full font-secondary text-white row-center "
        >
          Go back to search
        </button>
      </div>
    </div>
  )
}
