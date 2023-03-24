import { useNavigate } from 'react-router-dom'
import { FoundRecipesByIngredients } from '../../types/models'

interface Props {
  recipe: FoundRecipesByIngredients
}
function getIngredientsCount(recipe: FoundRecipesByIngredients): JSX.Element {
  return (
    <strong>
      {recipe.missedIngredientCount === 0
        ? 'all the'
        : `${recipe.usedIngredientCount}/
        ${recipe.missedIngredientCount + recipe.usedIngredientCount}`}
    </strong>
  )
}
export function CardRecipeByIngredients({ recipe }: Props) {
  const navigate = useNavigate()
  return (
    <div className="card relative">
      <div className="card-img-container md:min-h-[90%] justify-center">
        <img
          src={recipe.image}
          alt={`Photo of ${recipe.title} recipe`}
          onClick={() => navigate(`/recipes/${recipe.id}`)}
          className="card-recipe-img"
        />

        <h4 className="absolute top-4 flex px-2 py-1 gap-1 bg-gray-100 shadow-xl rounded-2xl text-smallest md:text-smaller text-center text-gray-500">
          You have
          {getIngredientsCount(recipe)}
          ingredients
        </h4>
      </div>
      <h1 className="card-recipe-name">{recipe.title}</h1>
    </div>
  )
}
