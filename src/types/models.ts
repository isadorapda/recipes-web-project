interface Nutrients {
  name: string
  amount: number
  unit: string
}

interface Nutrition {
  caloricBreakdown: {
    percentCarbs: number
    percentFat: number
    percentProtein: number
  }
  nutrients: Nutrients[]
  weightPerServing?: { amount: number; unit: string }
}

export interface Ingredients {
  id: number
  name: string
  aisle: string
  amount: number
}
interface Instructions {
  steps: Steps[]
}
interface Steps {
  number?: number
  step: string
  ingredients?: Ingredients[]
}

export interface Measures {
  metric: { unitShort: string }
  us?: { unitShort: string }
}

export interface IngredientsDetails extends Ingredients {
  amountFraction?: string
  unit?: string
  measures?: Measures
  original?: string
}
export interface Recipe {
  id: number
  title: string
  aggregateLikes: number
  readyInMinutes: number
  preparationMinutes: number
  cookingMinutes: number
  servings: number
  image: string
  diets: string[]
  cuisines: string[]
  dishTypes: string[]
  nutrition: Nutrition
  summary: string
  extendedIngredients: IngredientsDetails[]
  analyzedInstructions: Instructions[]
  sourceName: string
  occasions: string[]
}

export interface FoundRecipesByIngredients {
  id: number
  image: string
  missedIngredients: IngredientsDetails[]
  title: string
  missedIngredientCount: number
  likes: number
  usedIngredientCount: number
  unusedIngredients: IngredientsDetails[]
}

export interface ApiResponseGlobalSearch {
  results?: Recipe[]
}
export interface ApiResponseRandom {
  recipes: Recipe[] | undefined
}

export type Option = {
  value: string
  label: string
  direction?: string
}

export type Options = Array<Option>
