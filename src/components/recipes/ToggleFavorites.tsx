import { BsFillBookmarkFill as IconBookmark } from 'react-icons/bs'
import { VscCheck as IconCheck } from 'react-icons/vsc'

import useMenuVisible from '../../hooks/useMenuVisible'
import useDataContext from '../../hooks/useDataContext'
import { MenuSelectCategories } from './MenuSelectCategories'

interface Props {
  circle: string
  recipeId: number
  menuPosition: string
}

export function ToggleFavorites({ recipeId, menuPosition, circle }: Props) {
  const { ref, isMenuVisible, setIsMenuVisible } = useMenuVisible(false)
  const { handleToggleToCategory, savedIds } = useDataContext()

  return (
    <div className="relative">
      <button
        type="button"
        className={`cursor-pointer ${circle}`}
        onClick={() => {
          setIsMenuVisible(!isMenuVisible)
        }}
      >
        {savedIds.some((id) => id === recipeId) ? (
          <IconCheck
            color="white"
            name="is saved"
            title="Remove from favorites"
          />
        ) : (
          <IconBookmark title="Save" color="white" name="save" />
        )}
      </button>

      <div ref={ref}>
        {isMenuVisible && (
          <MenuSelectCategories
            menuPosition={menuPosition}
            setIsMenuVisible={setIsMenuVisible}
            handleToggleToCategory={handleToggleToCategory}
            id={recipeId}
          />
        )}
      </div>
    </div>
  )
}
