import { useEffect, useState } from 'react'

import { BsBasket as IconBasket } from 'react-icons/bs'

import useDataContext from '../../hooks/useDataContext'
import useWindowWidth from '../../hooks/useWindowWidth'
import { IngredientsDetails } from '../../types/models'
import { RenderDasktop } from './../RenderDasktop'
import { RenderMobile } from './../RenderMobile'

interface Props {
  ingredient: IngredientsDetails
  handleAddToList: (id: number) => void
  count: number
  measure: string
  id: number
}

export function IngredientsList({
  ingredient,
  handleAddToList,
  count,
  measure,
  id,
}: Props) {
  const width = useWindowWidth()
  const { recipesFoundByIngredients, recipeStore } = useDataContext()
  const [isSelected, setIsSelected] = useState(false)
  const [missingIngredients, setMissingIngredients] = useState<
    IngredientsDetails[]
  >([])
  const currentRecipe = recipeStore[id]

  useEffect(() => {
    const recipeFoundByIng = recipesFoundByIngredients?.find(
      (item) => currentRecipe.id === item.id
    )
    if (recipeFoundByIng) {
      setMissingIngredients(recipeFoundByIng.missedIngredients)
    } else {
      setMissingIngredients([])
    }
  }, [])

  return (
    <div className="grid grid-cols-[0.3fr,_1fr,_2fr] gap-2 lg:gap-1 pt-3 text-median lg:text-base xl:text-lg relative">
      <ul className="flex items-center h-full">
        <button
          aria-label={
            isSelected
              ? 'Remove ingredient from shopping list'
              : 'Add ingredient to shopping list'
          }
          type="button"
          title={
            isSelected
              ? 'Remove ingredient from shopping list'
              : 'Add ingredient to shopping list'
          }
          onClick={() => {
            handleAddToList(ingredient.id)
            setIsSelected(!isSelected)
          }}
        >
          <IconBasket
            aria-hidden="true"
            className="p-[1.5px]"
            style={isSelected ? { color: '#B04342' } : { color: '#616161' }}
          />
        </button>
      </ul>
      <ul className="flex items-center">
        <li className="font-bold flex items-center gap-x-1 lowercase">
          <span>
            {count && count !== currentRecipe.servings
              ? ((ingredient.amount / currentRecipe.servings) * count).toFixed(
                  1
                )
              : ingredient.amount.toFixed(1)}
          </span>
          <span>
            {measure === 'us'
              ? ingredient.measures?.us?.unitShort
              : ingredient.measures?.metric.unitShort}
          </span>
        </li>
      </ul>

      <ul>
        <li className="capitalize flex items-center gap-2">
          {ingredient.name}
          {missingIngredients.map((missing) =>
            missing.id === ingredient.id ? (
              <div key={missing.id}>
                <RenderMobile width={width}>
                  {!isSelected ? (
                    <span
                      className="absolute left-3 bottom-4 h-[5.5px] w-[5.5px] bg-red-500 rounded-full"
                      title="You don't have this ingredient. Add to your list!"
                    />
                  ) : null}
                </RenderMobile>
                <RenderDasktop width={width}>
                  {
                    <span
                      className="row-center px-2 py-[2px] h-fit leading-none bg-red-500 rounded-full text-[8px] text-white"
                      title="You don't have this ingredient. Add to your list!"
                    >
                      Missing
                    </span>
                  }
                </RenderDasktop>
              </div>
            ) : null
          )}
        </li>
      </ul>
    </div>
  )
}
