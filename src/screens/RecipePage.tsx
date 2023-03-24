import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { Markup } from 'interweave'

import { IoPrintOutline as IconPrint } from 'react-icons/io5'
import { MdOutlineFavorite as IconFavorite } from 'react-icons/md'
import {
  AiOutlineMinusCircle as IconMinus,
  AiFillPlusCircle as IconPlus,
} from 'react-icons/ai'

import useWindowWidth from '../hooks/useWindowWidth'
import useDataContext from '../hooks/useDataContext'
import useLikesCount from '../hooks/useLikesCount'
import { SEARCH_RECIPE_INFO_BASE_URL } from '../constants/endpoints'
import { IngredientsList } from '../components/recipes/IngredientsList'
import { ToggleFavorites } from '../components/recipes/ToggleFavorites'
import { RenderMobile } from '../components/RenderMobile'
import { FloatingButtonTray } from '../components/FloatingButtonTray'
import { AnimateScroll } from '../components/AnimateScroll'
import { ErrorModal } from '../components/ErrorModal'
import { Loader } from '../components/Loader'
import { Recipe } from '../types/models'

const key = import.meta.env.VITE_API_KEY

export function RecipePage() {
  const params = useParams()
  const width = useWindowWidth()
  const { setGroceryList, groceryList, storeRecipe } = useDataContext()
  const { handleLiked, isLiked } = useLikesCount(Number(params.recipeId))
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [recipe, setRecipe] = useState<Recipe | undefined>(undefined)
  const [servingsCount, setServingsCount] = useState<number>(0)
  const [measure, setMeasure] = useState<string>('metric')
  const [listItemsCount, setListItemsCount] = useState<number>(0)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    async function fetchRecipeData() {
      try {
        setIsLoading(true)
        const url = new URL(SEARCH_RECIPE_INFO_BASE_URL)
        const queryParams = new URLSearchParams(url.search)
        queryParams.set('includeNutrition', 'true')
        queryParams.set('apiKey', `${key}`)
        const response = await fetch(
          `${url}${params.recipeId}/information?${queryParams}`
        )
        const apiResponse = (await response.json()) as Recipe
        storeRecipe(apiResponse.id, apiResponse)
        setRecipe(apiResponse)
      } catch (_) {
        setError(
          new Error(
            'Sorry, something went wrong. Please, reload the page and try again.'
          )
        )
      }
    }
    fetchRecipeData()
    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (recipe) {
      document.title = ` ${recipe.title}`
      setServingsCount(recipe.servings)
    }
  }, [recipe])

  const handleAddToList = (id: number) => {
    const itemsIds = groceryList.map((item) => item.id)

    if (itemsIds.includes(id)) {
      setGroceryList(groceryList.filter((item) => item.id !== id))
      setListItemsCount(listItemsCount - 1)
    } else {
      const ingredient = recipe?.extendedIngredients.find(
        (item) => item.id === id
      )
      if (ingredient) {
        setGroceryList([...groceryList, ingredient])
        setListItemsCount(listItemsCount + 1)
      }
    }
  }

  const showCalories = (): string | undefined => {
    if (recipe?.nutrition) {
      const nutrientName = recipe.nutrition.nutrients.find(
        (name) => name.name === 'Calories'
      )
      return nutrientName?.amount.toFixed(0)
    }
  }
  if (!recipe) {
    return null
  }

  return error ? (
    <div>
      {isModalOpen && (
        <ErrorModal
          setIsModalOpen={setIsModalOpen}
          message={error.message}
          setError={setError}
        />
      )}
    </div>
  ) : isLoading ? (
    <Loader />
  ) : (
    <div>
      <RenderMobile width={width}>
        {<AnimateScroll>{<FloatingButtonTray />}</AnimateScroll>}
      </RenderMobile>
      <section className="flex flex-col md:grid md:grid-cols-2 gap-5 mx-auto lg:my-20 pt-10 w-[80vw]">
        <div className="col-center items-start lg:justify-start gap-y-3">
          <div className="relative flex flex-col w-full">
            <h1 className="text-xl md:text-2xl lg:text-4xl pb-3 w-2/3">
              {recipe.title}
            </h1>
            <div className="absolute right-5 lg:right-0 top-0 w-2/3">
              <ToggleFavorites
                menuPosition={'dialog-menu-bottom md:dialog-menu-side'}
                recipeId={recipe.id}
                circle={'circle-sm lg:circle-lg bg-red-500 hover:bg-red-300'}
              />
            </div>
          </div>
          <h2 className="text-sm md:text-median xl:text-lg uppercase font-thin">
            {recipe.sourceName}
          </h2>
          <button
            aria-label={`${
              isLiked ? 'Dislike this recipe' : 'Like this recipe'
            }`}
            type="button"
            onClick={() => {
              handleLiked(recipe.id)
            }}
            className="flex items-center gap-2 text-sm xl:text-lg"
          >
            {
              <IconFavorite
                aria-hidden="true"
                color={isLiked ? '#B04342' : ''}
              />
            }
            {isLiked ? recipe.aggregateLikes + 1 : recipe.aggregateLikes}
          </button>
          <button
            aria-label="Print this recipe"
            type="button"
            className="flex items-center gap-x-1 text-smallest md:text-smaller font-thin"
            onClick={() => window.print()}
          >
            <IconPrint aria-hidden="true" /> Print recipe
          </button>
          <div className="grid grid-cols-3 w-full lg:w-[90%] mx-auto gap-2 py-5 xl:pt-10 text-gray-600">
            <div className="border-grid-recipe-summary">
              <h4
                className="number-grid-recipe-summary"
                title="Ingredient count"
              >
                {recipe.extendedIngredients?.length}
              </h4>
              <h2 className="title-grid-recipe-summary">ingredients</h2>
            </div>
            <div className="border-grid-recipe-summary">
              <h4 title="Total time" className="number-grid-recipe-summary">
                {recipe.readyInMinutes}
              </h4>
              <h2 className="title-grid-recipe-summary">minutes</h2>
            </div>
            <div className="col-center gap-y-2">
              <h4 title="Total calories" className="number-grid-recipe-summary">
                {showCalories()}
              </h4>
              <h2 className="title-grid-recipe-summary">calories</h2>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          <img
            src={recipe.image}
            alt={`${recipe.title} recipe`}
            className="rounded-xl"
          />
        </div>
      </section>

      <section className="flex flex-col md:grid-cols-2 md:grid-cards md:gap-5 mx-auto pt-10 md:pt-14 lg:pt-0 text-gray-600 w-[80vw]">
        <div className="lg:pl-1">
          <div className="flex items-center justify-between pb-4 relative">
            <h1 className="section-title-recipe-summary">Ingredients:</h1>
            <div className="absolute right-5 md:right-10 xl:right-64 row-center gap-x-2 w-fit h-full font-primary text-gray-500 text-smaller lg:text-median cursor-pointer">
              <button
                aria-label="Select us measurement system"
                type="button"
                onClick={() => setMeasure('us')}
                className={`${measure === 'us' ? 'text-red-500' : ''}`}
              >
                US
              </button>
              <span className="h-[12px] w-[1px] bg-gray-500"></span>
              <button
                aria-label="Select metric measurement system"
                type="button"
                onClick={() => setMeasure('metric')}
                className={`${measure === 'metric' ? ' text-red-500' : ''}`}
              >
                METRIC
              </button>
            </div>
          </div>
          <div className="flex items-center py-1 gap-9">
            <h2 className="xl:text-xl text-gray-500 first-letter:uppercase">
              Servings
            </h2>
            <div className="row-center gap-4">
              <button
                aria-label="Decrease the number of servings by 1"
                aria-disabled={`${servingsCount <= 1}`}
                disabled={servingsCount <= 1}
                onClick={() => setServingsCount(servingsCount - 1)}
              >
                <IconMinus aria-hidden="true" color="#476548" size="1.1rem" />
              </button>
              <span className="md:text-lg lg:text-xl xl:text-2xl text-gray-500">
                {servingsCount}
              </span>
              <button
                aria-label="Increase the number of servings by 1"
                aria-disabled={`${servingsCount > 20}`}
                disabled={servingsCount > 20}
                onClick={() => setServingsCount(servingsCount + 1)}
              >
                <IconPlus aria-hidden="true" color="#476548" size="1.1rem" />
              </button>
            </div>
          </div>
          {recipe.extendedIngredients.map((ingredient, index) => {
            return (
              <IngredientsList
                key={`${ingredient.id}-${index + 1}`}
                ingredient={ingredient}
                count={servingsCount}
                handleAddToList={handleAddToList}
                measure={measure}
                id={recipe.id}
              />
            )
          })}
          <h1 className="section-title-recipe-summary pt-10 pb-4">Steps:</h1>
          <ul className="pl-4 md:pr-10">
            {recipe.analyzedInstructions.map((instruction, index) =>
              instruction.steps.map((step) => {
                return (
                  <li
                    className="list-decimal pb-3 text-sm md:text-base xl:text-lg leading-6 md:leading-8"
                    key={`instruction-${index + 1}-step-${step.number}`}
                  >
                    {step.step}
                  </li>
                )
              })
            )}
          </ul>
        </div>
        <div className="col-start-2">
          <div>
            <h1 className="pb-4 pt-5 md:pt-0 section-title-recipe-summary">
              Summary
            </h1>
            <p className="leading-relaxed lg:leading-9 text-sm md:text-base xl:text-lg text-justify tracking-wide">
              <Markup content={recipe.summary} />
            </p>
          </div>
          <div className="w-full flex flex-col items-center md:items-start">
            <h1 className="section-title-recipe-summary pt-5 lg:pt-10 tracking-wide">
              nutrition information per serving:{' '}
              <small
                title="1 serving"
                className="text-sm lg:text-base font-thin"
              >
                ({recipe.nutrition.weightPerServing?.amount}
                {recipe.nutrition.weightPerServing?.unit})
              </small>
            </h1>
            <div className="grid grid-cols-3 w-full py-10 text-gray-600 text-sm lg:text-base">
              <div className="main-nutrients-border-recipe">
                <h2 className="main-nutrients-value-recipe">
                  {recipe.nutrition.caloricBreakdown?.percentCarbs.toFixed(1)}
                  <small>%</small>{' '}
                </h2>
                <span className="main-nutrients-recipe">carbs</span>
              </div>
              <div className="main-nutrients-border-recipe">
                <h2 className="main-nutrients-value-recipe">
                  {recipe.nutrition.caloricBreakdown?.percentProtein.toFixed(1)}{' '}
                  <small>%</small>{' '}
                </h2>
                <span className="main-nutrients-recipe">protein</span>
              </div>
              <div className="col-center">
                <h2 className="main-nutrients-value-recipe">
                  {recipe.nutrition.caloricBreakdown?.percentFat.toFixed(1)}{' '}
                  <small>%</small>
                </h2>
                <span className="main-nutrients-recipe">total fat</span>
              </div>
            </div>
            <div>
              {recipe.nutrition.nutrients.map((nutri) => (
                <div
                  key={nutri.name}
                  className="grid grid-cols-2 md:gap-14 leading-9 text-sm md:text-base md:pb-2"
                >
                  <h2 className="font-bold">{nutri.name}</h2>
                  <p className="ml-5">
                    {nutri.amount} {nutri.unit}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
