import { useEffect } from 'react'
import { EmptyComponent } from '../components/EmptyComponent'
import { RandomRecipes } from '../components/recipes/RandomRecipes'
import { RecipeCard } from '../components/recipes/RecipeCard'
import { CategoryOption } from '../constants/menuCategoriesOptions'
import useDataContext from '../hooks/useDataContext'
import { getRecipes } from '../utils/getRecipes'

export function SavedRecipes() {
  const { categories, savedIds, recipeStore } = useDataContext()

  useEffect(() => {
    document.title = `Saved: ${savedIds.length}`
  }, [])

  return (
    <div className="flex flex-col overflow-x-hidden">
      <div className="bg-[url(../assets/favorites.webp)] bg-img-header h-60 md:h-[400px] justify-end">
        <h1 className="bg-text-header">saved recipes</h1>
      </div>

      {savedIds.length === 0 ? (
        <>
          <EmptyComponent
            title={"You haven't got any recipe saved yet"}
            subtitle={''}
          />
          <div className="mt-10 mb-20 w-[80vw] mx-auto flex flex-col gap-8">
            <h1 className="heading-green px-0 py-2">Suggestions for you</h1>
            <RandomRecipes tags="vegan" title="Vegan Recipes" />
            <RandomRecipes tags="italian" title="Italian Recipes" />
            <RandomRecipes tags="breakfast" title="Breakfast Ideas" />
            <RandomRecipes tags="dessert" title="Desserts Suggestions" />
          </div>
        </>
      ) : (
        <section className="flex flex-col w-[80vw] my-20 mx-auto gap-10 lg:gap-20">
          {Object.values(categories).map((_categoryOption) => {
            const categoryOption = _categoryOption as CategoryOption
            if (categoryOption.recipesIds.length === 0) {
              return null
            }
            return (
              <div key={categoryOption.label}>
                <h1 className="text-gray-400 uppercase text-xl lg:text-2xl pb-5 ">
                  {categoryOption.label}
                </h1>

                <div className="flex flex-col  md:grid md:grid-cols-3 laptopL:grid-cols-4 gap-4 md:gap-10 w-full ">
                  {getRecipes(categoryOption.recipesIds, recipeStore).map(
                    (recipe) => {
                      return (
                        <RecipeCard
                          key={`${categoryOption.label}-${recipe.id}`}
                          recipe={recipe}
                        />
                      )
                    }
                  )}
                </div>
              </div>
            )
          })}
        </section>
      )}
    </div>
  )
}
