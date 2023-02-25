import { useEffect, useMemo } from 'react'
import { createContext, ReactNode, useState } from 'react'
import {
  Categories,
  MENU_CATEGORY_OPTIONS,
} from '../constants/menuCategoriesOptions'
import {
  FoundRecipesByIngredients,
  IngredientsDetails,
  Recipe,
} from '../types/models'
import { getRecipes } from '../utils/getRecipes'

interface DataContextProviderProps {
  children: ReactNode
}

interface DataContext {
  groceryList: Array<IngredientsDetails>
  setGroceryList: (_newGroceryList: Array<IngredientsDetails>) => void

  recipesFoundByIngredients: Array<FoundRecipesByIngredients> | undefined
  setRecipesFoundByIngredients: (
    _newRecipesFoundByIngredients: Array<FoundRecipesByIngredients>
  ) => void

  likedRecipesIds: Array<number>
  setLikedRecipesIds: (_newLikedRecipesIds: Array<number>) => void

  categories: Categories
  handleToggleToCategory: (category: keyof Categories, recipeId: number) => void

  savedIds: Array<number>

  recipeStore: Record<number, Recipe>
  storeRecipe: (id: number, recipe: Recipe) => void

  recipes: Array<Recipe>
}

export const DataContext = createContext<DataContext>({} as DataContext)

export function DataContextProvider({ children }: DataContextProviderProps) {
  const [groceryList, setGroceryList] = useState<Array<IngredientsDetails>>([])

  const [recipesFoundByIngredients, setRecipesFoundByIngredients] = useState<
    Array<FoundRecipesByIngredients> | undefined
  >(undefined)

  const [likedRecipesIds, setLikedRecipesIds] = useState<Array<number>>([])

  const [categories, setCategories] = useState<Categories>(
    MENU_CATEGORY_OPTIONS
  )

  const [savedIds, setSavedIds] = useState<Array<number>>([])

  const [recipeStore, setRecipeStore] = useState<Record<number, Recipe>>({})

  useEffect(() => {
    const getSavedIds = (): Array<number> => {
      let savedIds: Array<number> = []
      for (const category in categories) {
        const parsedCategory = category as keyof Categories
        savedIds = savedIds.concat(categories[parsedCategory].recipesIds)
      }
      return [...new Set(savedIds)]
    }
    setSavedIds(getSavedIds())
  }, [categories])

  const storeRecipe = (id: number, recipe: Recipe) => {
    setRecipeStore((prevRecipeStore) => ({ ...prevRecipeStore, [id]: recipe }))
  }
  const recipes: Recipe[] = useMemo(() => {
    return getRecipes(savedIds, recipeStore)
  }, [savedIds, recipeStore])

  const handleToggleToCategory = (
    category: keyof Categories,
    recipeId: number
  ) => {
    if (categories[category].recipesIds.includes(recipeId)) {
      setCategories((prevCategories) => ({
        ...prevCategories,
        [category]: {
          ...prevCategories[category],
          recipesIds: categories[category].recipesIds.filter(
            (id) => id !== recipeId
          ),
        },
      }))
    } else {
      setCategories((prevCategories) => ({
        ...prevCategories,
        [category]: {
          ...prevCategories[category],
          recipesIds: [...categories[category].recipesIds, recipeId],
        },
      }))
    }
  }

  return (
    <DataContext.Provider
      value={{
        groceryList,
        setGroceryList,
        recipesFoundByIngredients,
        setRecipesFoundByIngredients,
        likedRecipesIds,
        setLikedRecipesIds,
        handleToggleToCategory,
        savedIds,
        categories,
        storeRecipe,
        recipeStore,
        recipes,
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
