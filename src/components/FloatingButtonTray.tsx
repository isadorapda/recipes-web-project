import { BsBasket as IconBasket } from 'react-icons/bs'
import { BsFillBookmarkFill as IconBookmark } from 'react-icons/bs'
import { useNavigate } from 'react-router-dom'

import useDataContext from '../hooks/useDataContext'

export function FloatingButtonTray() {
  const navigate = useNavigate()
  const { groceryList, savedIds } = useDataContext()

  return (
    <div className="h-fit fixed right-[10%] top-28 z-30">
      <div className="flex justify-end relative mb-3">
        <button
          aria-label="Go to your saved recipes"
          type="button"
          title="Go to your saved recipes"
          onClick={() => navigate('/saved')}
          className="rounded-full max-w-[48px] w-auto max-h-[48px] bg-white row-center shadow-30"
        >
          <span aria-hidden="true" className="p-4">
            <IconBookmark className="w-[18px]" />
          </span>

          <span
            className={`top-1 right-1 bg-red-500 h-2 w-2 rounded-full ${
              savedIds.length ? 'absolute z-30' : 'hidden'
            }`}
          />
        </button>
      </div>
      <div className="flex justify-end relative">
        <button
          aria-label="Go to your grocery list"
          type="button"
          title="Go to your grocery list"
          onClick={() => navigate('/grocery-list')}
          className="rounded-full max-w-[48px] w-auto max-h-[48px] bg-white row-center shadow-30"
        >
          <span aria-hidden="true" className="p-4">
            <IconBasket className="w-[18px]" />
          </span>

          <span
            className={`top-1 right-1 bg-red-500 h-2 w-2 rounded-full  ${
              groceryList.length > 0 ? 'absolute z-30' : 'hidden'
            }`}
          />
        </button>
      </div>
    </div>
  )
}
