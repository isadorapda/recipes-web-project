import { useRandomRecipes } from '../../hooks/useRandomRecipes'
import { RecipeCard } from './RecipeCard'

interface RandomRecipesProps {
  tags: string
  title: string
}

export function RandomRecipes({ tags, title }: RandomRecipesProps) {
  const { randomRecipes } = useRandomRecipes(tags)
  return (
    <div>
      <h2 className="heading-green text-base md:text-lg px-0">{title}</h2>
      <div className="flex flex-col md:grid md:grid-cols-3 laptopL:grid-cols-4 gap-4 md:gap-10 ">
        {randomRecipes.recipes?.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </div>
  )
}
