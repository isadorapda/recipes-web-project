import { useState } from 'react'
import { IMAGES_CAROUSEL } from '../constants/images'
import { Carousel } from '../components/Carousel'
import { ErrorModal } from '../components/ErrorModal'
import { RandomRecipes } from '../components/RandomRecipes'

export function Home() {
  const [error, setError] = useState<Error | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

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
  ) : (
    <div className="w-screen p-0 mb-20 overflow-x-hidden">
      <Carousel targets={IMAGES_CAROUSEL} />
      <div className="my-10 w-[80vw] mx-auto flex flex-col gap-8">
        <h1 className="heading-green px-0 py-2">Suggestions for you</h1>
        <RandomRecipes tags="vegan" title="Vegan Recipes" />
        <RandomRecipes tags="italian" title="Italian Recipes" />
        <RandomRecipes tags="breakfast" title="Breakfast Ideas" />
        <RandomRecipes tags="dessert" title="Desserts Suggestions" />
      </div>
    </div>
  )
}
