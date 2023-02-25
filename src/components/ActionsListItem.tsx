import { AiOutlineEdit as IconEdit } from 'react-icons/ai'
import { RiDeleteBin5Line as IconBin } from 'react-icons/ri'

interface Props {
  setShowMore: (value: boolean) => void
  setEdit: (value: boolean) => void
  handleDeleteIngredientItem: (item: number) => void
  id: number
}

export function ActionsListItem({
  setEdit,
  setShowMore,
  handleDeleteIngredientItem,
  id,
}: Props) {
  return (
    <div className="flex items-center justify-end text-sm lg:text-lg gap-x-1">
      <button
        aria-label="Edit ingredient`s quantity"
        type="button"
        onClick={() => {
          setEdit(true)
          setShowMore(false)
        }}
      >
        <IconEdit
          aria-hidden="true"
          className="hover:text-green-100 "
          title="edit quantity"
        />
      </button>
      <button
        aria-label="Delete item"
        type="button"
        onClick={() => handleDeleteIngredientItem(id)}
        title="Delete item"
      >
        <IconBin aria-hidden="true" className="hover:text-red-500" />
      </button>
    </div>
  )
}
