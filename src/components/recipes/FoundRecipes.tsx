import { ApiResponseGlobalSearch } from '../../types/models'
import { RecipeCard } from './RecipeCard'

interface DataProps {
  apiResponseSearch: ApiResponseGlobalSearch
}

export function FoundRecipes({ apiResponseSearch }: DataProps) {
  return (
    <div className="grid-cards">
      {(apiResponseSearch.results || []).map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} />
      ))}
    </div>
  )
}
