import { Recipe } from '../types/models'

export function getRecipes(
  ids: Array<number>,
  recipeStore: Record<number, Recipe>
): Array<Recipe> {
  const _recipes: Array<Recipe> = []
  ids.forEach((id) => {
    const recipe = recipeStore[id]
    if (recipe) {
      _recipes.push(recipe)
    }
  })
  return _recipes
}
