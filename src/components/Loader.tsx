export function Loader() {
  return (
    <div className="flex flex-col items-center mx-auto h-screen w-screen bg-white pt-2 md:pt-4 absolute top-0 left-0 z-20">
      <img
        src={'/loader.gif'}
        alt="Loader gif"
        className="w-24 md:w-32 xl:w-36 mt-44"
      />
    </div>
  )
}
