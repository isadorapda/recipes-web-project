import { useEffect, useState } from 'react'
import { AiOutlineCloseCircle as IconClose } from 'react-icons/ai'
import { IoPrintOutline as IconPrinter } from 'react-icons/io5'

import { v4 as uuidv4 } from 'uuid'

import useDataContext from '../hooks/useDataContext'
import { IngredientsDetails } from '../types/models'
import { EmptyComponent } from '../components/EmptyComponent'
import { AisleListCard } from '../components/groceryList/AisleListCard'
import { AddNewListManually } from '../components/groceryList/AddNewListManually'
import { NewAisleListCard } from '../components/groceryList/NewAisleListCard'

export function GroceryList() {
  const { groceryList } = useDataContext()
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
  const [isAccordionOpen, setIsAccordionOpen] = useState<boolean>(false)
  const [newItemsToAdd, setNewItemsToAdd] = useState<IngredientsDetails[]>([])

  useEffect(() => {
    document.title = `Grocery list: ${
      groceryList.length + newItemsToAdd.length
    } item${groceryList.length + newItemsToAdd.length === 1 ? '' : 's'}`
  }, [groceryList, newItemsToAdd])

  function groupByAisle(ingredients: IngredientsDetails[]) {
    return ingredients.reduce((acc, current) => {
      const aisleName = current.aisle
      if (acc[aisleName]) {
        acc[aisleName].push(current)
      } else {
        acc[aisleName] = [current]
      }
      return acc
    }, {} as { [key: string]: IngredientsDetails[] })
  }
  const groceriesGroupedByAisle = groupByAisle(groceryList)

  const newItemsGroupedByAisle = groupByAisle(newItemsToAdd)

  return (
    <div>
      <div className="bg-img-header bg-[url(../assets/ingredients.webp)] bg-center h-60 md:h-[400px] justify-start md:justify-end">
        <h1 className="bg-text-header">grocery List</h1>
      </div>
      <button
        aria-hidden={`${isMenuOpen ? false : true}`}
        aria-label="Close menu"
        type="button"
        title="Close"
        onClick={() => setIsMenuOpen(false)}
        className={`${
          isMenuOpen
            ? 'fixed top-5 right-10 z-[1003] row-center gap-1'
            : 'hidden h-0'
        }`}
      >
        <IconClose size="0.8rem" />
        <span className="text-smallest">Close</span>
      </button>
      <button
        aria-hidden={`${isMenuOpen ? true : false}`}
        aria-label="Add ingredients to your grocery list"
        type="button"
        title="Add ingredients to your grocery list"
        onClick={() => setIsMenuOpen(true)}
        className={`${
          isMenuOpen
            ? 'hidden h-0'
            : 'fixed top-20 lg:top-36 right-[10%] z-[999] row-center circle-sm md:circle-lg bg-white shadow-30 rounded-full'
        } `}
      >
        <span className="text-3xl font-thin">+</span>
      </button>

      <div
        aria-modal="true"
        className={`${
          isMenuOpen
            ? 'bg-[rgba(0,0,0,0.3)] w-screen h-screen z-[1002] fixed top-0'
            : 'hidden'
        }`}
      >
        <AddNewListManually
          isAccordionOpen={isAccordionOpen}
          setNewItemsToAdd={setNewItemsToAdd}
          newItemsToAdd={newItemsToAdd}
          setIsAccordionOpen={setIsAccordionOpen}
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
      </div>

      {!groceryList.length && !newItemsToAdd.length ? (
        <EmptyComponent
          title="You haven't got any ingredient in your grocery list yet."
          subtitle="Find ingredients that are missing and click in the basket to add them to your
        grocery list or add them manually."
        />
      ) : (
        <section className="relative">
          <button
            aria-label="Print grocery list"
            type="button"
            className="absolute top-3 right-5 flex items-center gap-3 text-smallest md:text-base font-thin my-2"
            onClick={() => window.print()}
          >
            <IconPrinter aria-hidden="true" />
            print grocery list
          </button>
          <div
            className={`${
              !groceryList.length
                ? 'h-0 hidden'
                : 'flex-col md:grid-cards md:grid-cols-2 w-[90vw] md:w-screen mx-auto pt-14 md:pt-24 md:gap-2 lg:gap-x-10 md:p-8'
            } `}
          >
            {Object.entries(groceriesGroupedByAisle).map(
              ([aisle, ingredientsList]) => (
                <AisleListCard
                  aisle={aisle}
                  key={uuidv4()}
                  ingredientsList={ingredientsList}
                />
              )
            )}
          </div>
        </section>
      )}
      <div
        className={`${
          !groceryList.length ? 'pt-14' : ''
        } relative w-fit mb-5 ml-6 md:ml-10`}
      >
        <h2
          className={`${
            newItemsToAdd.length > 0
              ? 'text-gray-600 md:text-lg lg:text-2xl font-primary first-letter:capitalize pb-1'
              : 'hidden h-0'
          } `}
        >
          lists you've created
        </h2>
        <span className="absolute bottom-0 h-[2px] bg-red-500 w-full rounded-full" />
      </div>
      <div className="flex-col md:grid-cards md:grid-cols-2 md:gap-2 lg:gap-x-10 mx-auto w-[90vw] md:w-screen pt-0 pb-20 md:p-8">
        {Object.entries(newItemsGroupedByAisle).map(
          ([aisle, ingredientsList]) => (
            <NewAisleListCard
              key={uuidv4()}
              aisle={aisle}
              ingredientsList={ingredientsList}
              newItemsToAdd={newItemsToAdd}
              setNewItemsToAdd={setNewItemsToAdd}
            />
          )
        )}
      </div>
    </div>
  )
}
