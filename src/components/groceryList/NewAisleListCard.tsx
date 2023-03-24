import { useState } from 'react'

import { MdKeyboardArrowDown } from 'react-icons/md'
import { RiDeleteBin5Line } from 'react-icons/ri'

import { IngredientsDetails } from '../types/models'
import { GroceryListSingleItem } from './GroceryListSingleItem'

interface Props {
  newItemsToAdd: IngredientsDetails[]
  setNewItemsToAdd: (ingredients: IngredientsDetails[]) => void
  aisle: string
  ingredientsList: IngredientsDetails[]
}

export function NewAisleListCard({
  aisle,
  ingredientsList,
  newItemsToAdd,
  setNewItemsToAdd,
}: Props) {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false)

  function handleDeleteIngredientItem(id: number) {
    setNewItemsToAdd(newItemsToAdd.filter((item) => item.id !== id))
  }
  function deleteListCard(aisle: string) {
    setNewItemsToAdd(newItemsToAdd.filter((card) => card.aisle !== aisle))
  }

  return (
    <div>
      <div className="flex flex-col rounded-lg shadow-10 px-2 mb-8 md:mb-6 md:p-3 text-median md:text-base lg:text-lg xl:text-xl">
        <div
          className={`relative row-center lg:border-b-[1.5px] lg:border-b-gray-200 lg:mb-1 ${
            isAccordionOpen
              ? 'border-b-[1.5px] border-b-gray-200 mb-1 md:pb-2'
              : null
          } `}
        >
          <button
            title="Delete this category"
            onClick={() => deleteListCard(aisle)}
            className="block absolute top-[10px] md:top-1 lg:top-2 left-2 text-smaller lg:text-median hover:text-red-500"
          >
            <RiDeleteBin5Line className="p-[1px] md:p-0" />
          </button>
          <h1
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="text-center uppercase  text-gray-500 font-thin py-2 md:py-0 lg:py-1"
          >
            {aisle}{' '}
            <span className="text-green-100 text-smaller lg:text-median">
              ({ingredientsList.length})
            </span>
            <button
              onClick={() => {
                setIsAccordionOpen(!isAccordionOpen)
              }}
            >
              <MdKeyboardArrowDown
                size="1.5rem"
                color="#616161"
                className={`${
                  isAccordionOpen ? ' rotate-180' : 'rotate-[360]'
                } transition-transform duration-200 block absolute right-2 top-[10px] md:top-0 lg:hidden`}
              />
            </button>
          </h1>
        </div>
        {ingredientsList.map((ingredient, index) => (
          <GroceryListSingleItem
            key={index}
            isAccordionOpen={isAccordionOpen}
            item={ingredient}
            handleDeleteIngredientItem={handleDeleteIngredientItem}
          />
        ))}
      </div>
    </div>
  )
}
