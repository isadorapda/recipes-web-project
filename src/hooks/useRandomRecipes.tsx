import { useEffect, useState } from 'react'
import { SEARCH_RECIPE_RANDOM_BASE_URL } from '../constants/endpoints'
import { ApiResponseRandom } from '../types/models'
import useDataContext from './useDataContext'

const key = import.meta.env.VITE_API_KEY

export function useRandomRecipes(tags: string) {
  const { storeRecipe } = useDataContext()

  const [randomRecipes, setRandomRecipes] = useState<ApiResponseRandom>({
    recipes: [] || undefined,
  })
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    if (randomRecipes.recipes) {
      randomRecipes.recipes.forEach((recipe) => {
        storeRecipe(recipe.id, recipe)
      })
    }
  }, [randomRecipes])

  useEffect(() => {
    async function fetchData() {
      try {
        const url = new URL(SEARCH_RECIPE_RANDOM_BASE_URL)
        const params = new URLSearchParams(url.search)
        params.set('number', '10')
        params.set('apiKey', `${key}`)
        params.set('tags', `${tags}`)
        const response = await fetch(`${url}${params}`)
        const apiResponse = await response.json()
        setRandomRecipes(apiResponse)
      } catch (_) {
        setError(
          new Error(
            'Something went wrong. Please, reload the page and try again.'
          )
        )
      }
    }
    fetchData()
  }, [])

  return { randomRecipes, error }
}
