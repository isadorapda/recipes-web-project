import { useNavigate } from 'react-router-dom'

import { MdOutlineFavorite as IconLike } from 'react-icons/md'

import { Recipe } from '../../types/models'
import { ToggleFavorites } from './ToggleFavorites'
import useLikesCount from '../../hooks/useLikesCount'

interface DataProps {
  recipe: Recipe
}

export function RecipeCard({ recipe }: DataProps) {
  const navigate = useNavigate()
  const { handleLiked, isLiked } = useLikesCount(recipe.id)

  return (
    <div className="card group">
      <div className="card-img-container">
        <img
          src={recipe.image}
          alt={`Photo of ${recipe.title} recipe`}
          onClick={() => navigate(`/recipes/${recipe.id}`)}
          className="card-recipe-img"
        />
        <div className="card-gradient-bg group-hover:to-[rgba(0,0,0,0.4)] group-hover:transition-colors group-hover:duration-500">
          <span className="flex items-center gap-3">
            <button
              aria-label="Like this recipe"
              type="button"
              name="like"
              title="Like this recipe"
            >
              <IconLike
                color={isLiked ? '#B04342' : ''}
                onClick={() => {
                  handleLiked(recipe.id)
                }}
              />
            </button>
            {isLiked ? recipe.aggregateLikes + 1 : recipe.aggregateLikes}
          </span>
          <h4>{recipe.readyInMinutes} min</h4>
        </div>
      </div>

      <div className="flex justify-between relative px-1 ">
        <h1
          className="card-recipe-name group-hover:text-green-100 group-hover:transition-colors group-hover:duration-500"
          onClick={() => navigate(`/recipes/${recipe.id}`)}
        >
          {recipe.title}
        </h1>
        <div className="absolute right-0 top-0 ">
          <ToggleFavorites
            recipeId={recipe.id}
            menuPosition={'dialog-menu-top'}
            circle={'circle-sm bg-green-100'}
          />
        </div>
      </div>
      <h3 className="pl-1 font-thin uppercase text-green-500 group-hover:text-gray-500 group-hover:transition-colors group-hover:duration-500 text-smaller md:text-sm xl:text-base">
        {recipe.sourceName}
      </h3>

      <h4 className="flex pl-1 capitalize text-left font-secondary text-smaller xl:text-sm group-hover:text-green-100 group-hover:transition-colors group-hover:duration-500">
        {recipe.diets.join(` ${'\u25CF'} `)}
      </h4>
    </div>
  )
}
