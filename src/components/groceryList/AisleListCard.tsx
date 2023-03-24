import { useState } from 'react'

import { RiMoreLine as IconPlus } from 'react-icons/ri'
import { IoAddCircleOutline as IconAdd } from 'react-icons/io5'
import { MdKeyboardArrowDown as IconArrowDown } from 'react-icons/md'

import useDataContext from '../../hooks/useDataContext'
import useWindowWidth from '../../hooks/useWindowWidth'
import { IngredientsDetails } from '../../types/models'
import { GroceryListSingleItem } from './GroceryListSingleItem'
import { SetAmountInput } from './SetAmountInput'
import { RenderMobile } from './../RenderMobile'
import { RenderDasktop } from './../RenderDasktop'
import { generateUserAddedIngredientId } from '../../utils/generateUserAddedIngredientId'

interface Props {
  aisle: string
  ingredientsList: IngredientsDetails[]
}

export function AisleListCard({ aisle, ingredientsList }: Props) {
  const width = useWindowWidth()
  const [showMore, setShowMore] = useState<boolean>(false)
  const { groceryList, setGroceryList } = useDataContext()
  const [newItemsToAdd, setNewItemsToAdd] = useState<IngredientsDetails[]>([])
  const [amount, setAmount] = useState<number>(0)
  const [amountFraction, setAmountFraction] = useState<string>('')
  const [newItemName, setNewItemName] = useState<string>('')
  const [unit, setUnit] = useState<string>('')
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(false)
  const [edit, setEdit] = useState<boolean>(false)

  function handleAddNewListItem(e: any) {
    e.preventDefault()
    setNewItemsToAdd([
      ...newItemsToAdd,
      {
        name: newItemName,
        id: generateUserAddedIngredientId(),
        aisle: aisle,
        amount,
        amountFraction,
        unit,
      },
    ])
    setNewItemName('')
    setAmount(0)
    setAmountFraction('')
    setUnit('')
  }

  function handleDeleteIngredientItem(id: number) {
    setGroceryList(groceryList.filter((item) => item.id !== id))
  }
  return (
    <div>
      <div className="flex flex-col rounded-lg shadow-10 mb-8 md:mb-6 md:p-3">
        <div
          className={`relative row-center ${
            isAccordionOpen
              ? 'border-b-[1.5px] border-b-gray-200 mb-1 md:pb-2'
              : null
          } lg:border-b-[1.5px] lg:border-b-gray-200 lg:mb-1`}
        >
          <h1
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            className="text-center uppercase text-median md:text-base lg:text-lg xl:text-xl text-gray-500 font-thin py-2 md:py-0 lg:py-1"
          >
            {aisle}{' '}
            <span className="text-green-100 text-sm lg:text-lg">
              ({ingredientsList.length + newItemsToAdd.length})
            </span>
            <button
              aria-label={`Show ingredients in ${aisle} aisle`}
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
            >
              <IconArrowDown
                aria-hidden="true"
                size="1.5rem"
                color="#616161"
                className={`${
                  isAccordionOpen ? 'rotate-180' : 'rotate-[360]'
                } transition-transform duration-200 block absolute right-2 top-[10px] md:top-0 lg:hidden`}
              />
            </button>
          </h1>
        </div>

        {ingredientsList.map((ingredient) => {
          return (
            <GroceryListSingleItem
              key={ingredient.id}
              item={ingredient}
              isAccordionOpen={isAccordionOpen}
              handleDeleteIngredientItem={handleDeleteIngredientItem}
            />
          )
        })}

        {newItemsToAdd
          ? newItemsToAdd.map((item) => (
              <GroceryListSingleItem
                isAccordionOpen={isAccordionOpen}
                key={item.id}
                item={item}
                handleDeleteIngredientItem={handleDeleteIngredientItem}
              />
            ))
          : null}
        <form
          aria-modal="true"
          onSubmit={handleAddNewListItem}
          className={` ${
            isAccordionOpen
              ? 'h-10 py-2 border-b border-gray-100 flex'
              : 'h-0 hidden py-0 '
          } ${
            edit ? 'bg-[rgba(97,97,97,0.2)] my-1' : ''
          } relative justify-between items-center lg:flex px-2 py-1 lg:h-10 text-smaller md:text-median xl:text-lg lg:border-b lg:border-gray-100`}
        >
          <div className="flex w-1/2 lg:w-1/3 gap-2 lg:gap-1">
            <button type="submit" aria-label="Add new ingredient to this list">
              <IconAdd color="#B0C3B5" />
            </button>
            <input
              aria-required="true"
              required
              type="text"
              value={newItemName}
              placeholder="Add new item..."
              onChange={(e) => setNewItemName(e.target.value)}
              className={`${
                edit ? 'bg-transparent italic my-1' : ''
              } text-sm lg:text-median md:py-1 w-2/3 lg:w-full placeholder:text-smaller pl-1`}
            />
          </div>
          <RenderMobile width={width}>
            {
              <>
                <div>
                  <button
                    type="button"
                    onClick={() => {
                      setShowMore(true)
                      setEdit(true)
                    }}
                    className={`${
                      showMore && edit
                        ? 'hidden h-0'
                        : 'absolute right-3 top-2 md:top-3 flex justify-end bg-white text-lg text-green-100 hover:text-green-500'
                    } `}
                  >
                    <IconPlus />
                  </button>
                </div>
                <div
                  className={`${
                    showMore
                      ? 'absolute right-0 top-0 flex items-center z-30 bg-white rounded shadow-30 transition-opacity animate-appear2 w-[80%] h-full px-1'
                      : 'hidden h-0'
                  } `}
                >
                  <div
                    className={`${
                      edit
                        ? 'flex items-center justify-end gap-x-1 w-full'
                        : 'hidden h-0 '
                    }`}
                  >
                    <SetAmountInput
                      setAmount={setAmount}
                      setAmountFraction={setAmountFraction}
                      setUnit={setUnit}
                      setEdit={setEdit}
                      setShowMore={setShowMore}
                      handleAddNewListItem={handleAddNewListItem}
                    />
                  </div>
                </div>
              </>
            }
          </RenderMobile>
          <RenderDasktop width={width}>
            {
              <div className="flex items-center justify-end gap-x-3 text-median">
                <SetAmountInput
                  setAmount={setAmount}
                  setAmountFraction={setAmountFraction}
                  setUnit={setUnit}
                  handleAddNewListItem={handleAddNewListItem}
                />
              </div>
            }
          </RenderDasktop>
        </form>
      </div>
    </div>
  )
}
