interface ErrorProps {
  setIsModalOpen: (visible: boolean) => void
  message: string
  setError: (error: Error | null) => void
}
export function ErrorModal({ setIsModalOpen, message, setError }: ErrorProps) {
  return (
    <div
      aria-modal="true"
      onClick={() => setIsModalOpen(false)}
      className="col-center w-screen h-screen fixed top-0 left-0 z-50 bg-[rgba(0,0,0,0.4)]"
    >
      <div className="absolute top-44 z-[70] p-10 w-80 col-center gap-4 bg-white rounded-md shadow-2xl text-base lg:text-lg">
        <p>{message}</p>
        <button
          type="button"
          name="close"
          title="Close window"
          onClick={() => {
            setIsModalOpen(false)
            setError(null)
          }}
        >
          close
        </button>
      </div>
    </div>
  )
}
