import { useState } from 'react'

import { IoAddCircleOutline as IconAdd } from 'react-icons/io5'
import { MdKeyboardArrowDown as IconArrowDown } from 'react-icons/md'
import { RiDeleteBack2Line as IconClear } from 'react-icons/ri'

import { AISLES } from '../../constants/aisles'
import { IngredientsDetails } from '../../types/models'
import { generateUserAddedIngredientId } from '../../utils/generateUserAddedIngredientId'
import { SetAmountInput } from '../groceryList/SetAmountInput'

interface Props {
  isAccordionOpen: boolean
  isMenuOpen: boolean
  setNewItemsToAdd: (newItemsToAdd: IngredientsDetails[]) => void
  newItemsToAdd: IngredientsDetails[]
  setIsAccordionOpen: (value: boolean) => void
  setIsMenuOpen: (value: boolean) => void
}

export function AddNewListManually({
  isAccordionOpen,
  isMenuOpen,
  setIsMenuOpen,
  setNewItemsToAdd,
  newItemsToAdd,
  setIsAccordionOpen,
}: Props) {
  const [newItemName, setNewItemName] = useState<string>('')
  const [amount, setAmount] = useState<number>(0)
  const [amountFraction, setAmountFraction] = useState<string>('')
  const [newAisle, setNewAisle] = useState<string>('Misc')
  const [unit, setUnit] = useState<string>('')

  function handleAddNewListItem(e: any) {
    e.preventDefault()
    setNewItemsToAdd([
      ...newItemsToAdd,
      {
        name: newItemName,
        id: generateUserAddedIngredientId(),
        aisle: newAisle,
        amount,
        amountFraction,
        unit,
      },
    ])
    setNewItemName('')
    setAmount(0)
    setAmountFraction('')
    setUnit('')
    setNewAisle('Misc')
  }
  const sortedAisles = AISLES.map((aisle) => aisle.label).sort()

  return (
    <section
      className={`${
        isMenuOpen
          ? 'absolute top-0 right-0 z-[60] flex flex-col transition-all animate-fadeInRight bg-white shadow-[5px_0_15px_2px_rgba(0,_0,_0,_0.7)] pt-10 h-screen w-screen md:w-1/2 overflow-y-scroll'
          : 'hidden'
      } `}
    >
      <form
        onSubmit={handleAddNewListItem}
        className="flex flex-col w-[90%] mx-auto z-50"
      >
        <h1 className="flex text-red-500 text-lg lg:text-2xl pb-10 pt-4 md:pt-0 tracking-wide font-semibold font-primary">
          Add items to your list
        </h1>
        <div className="relative flex items-center gap-3 border-b border-b-gray-100 lg:text-lg">
          <IconAdd color="#B0C3B5" />
          <input
            className="placeholder:text-gray-300 placeholder:text-sm capitalize w-[80%] pl-2"
            type="text"
            aria-required="true"
            required
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            placeholder="Add new item..."
          />
          <button
            type="button"
            aria-label="Clear your search"
            title="Clear"
            onClick={() => setNewItemName('')}
          >
            <IconClear className="text-gray-500 hover:text-red-500 absolute right-4 top-1" />
          </button>
        </div>
        <div className="flex flex-col mt-6 lg:mt-10 lg:mb-6 lg:flex-row lg:gap-x-10">
          <h2
            className="relative flex gap-3 lg:gap-1 items-center text-sm lg:text-base text-gray-500"
            onClick={() => setIsAccordionOpen(!isAccordionOpen)}
          >
            Set an amount
            <button
              type="button"
              aria-label="Open to set ingredient's amount"
              title="Open"
            >
              <IconArrowDown
                className={`text-green-100 font-bold text-lg lg:text-xl  ${
                  isAccordionOpen
                    ? ' rotate-180 lg:rotate-90'
                    : 'rotate-[360] lg:rotate-[-90deg]'
                } transition-transform duration-200`}
              />
            </button>
            <span
              aria-modal="true"
              className={`${
                isAccordionOpen
                  ? 'opacity-0 hidden'
                  : 'absolute right-10 lg:left-0 lg:top-8 lg:w-full text-green-100 font-secondary font-thin transition-opacity ease-in'
              } `}
            >
              {amount} {amountFraction} {unit}
            </span>
          </h2>
          <div
            aria-modal="true"
            className={` ${
              isAccordionOpen
                ? 'relative flex items-center justify-between lg:justify-end w-full lg:w-[55%] px-4 py-2 shadow-30 rounded-md my-3 lg:my-0 lg:gap-x-3 transition-all animate-fadeInDown'
                : 'overflow-hidden h-0'
            }`}
          >
            <SetAmountInput
              setAmount={setAmount}
              setAmountFraction={setAmountFraction}
              setUnit={setUnit}
              setIsAccordionOpen={setIsAccordionOpen}
            />
          </div>
        </div>
        <div className="mt-6 lg:mt-8 flex flex-col">
          <h2 className="text-sm lg:text-base text-gray-500 pb-4">
            Choose a category
          </h2>
          <div className="flex flex-wrap w-full px-1 gap-x-2 justify-center gap-y-1">
            {sortedAisles.map((aisle) => (
              <button
                aria-label={`Add my ingredient to ${aisle}`}
                type="button"
                title={`${aisle}`}
                onClick={() => setNewAisle(aisle)}
                key={aisle}
                className={`${
                  !newAisle ? 'bg-white' : ''
                } cursor-pointer rounded-full border md:border-[2px] border-green-100 hover:shadow-20 hover:scale-105 ${
                  newAisle === aisle
                    ? 'bg-green-100 text-white'
                    : 'text-gray-600'
                } px-4 text-smallest md:text-sm lg:text-base font-secondary`}
              >
                {aisle}
              </button>
            ))}
          </div>
        </div>
        <button
          aria-label="Add ingredient to my shopping list"
          title="Add"
          onClick={() => setIsMenuOpen(newItemName ? false : true)}
          type="submit"
          className="flex flex-col rounded-full px-8 lg:px-10 py-1 capitalize lg:text-lg font-secondary bg-green-100 hover:bg-[rgb(166,187,172)] text-white shadow-lg hover:shadow-20 my-10 mx-auto"
        >
          add
        </button>
      </form>
    </section>
  )
}
