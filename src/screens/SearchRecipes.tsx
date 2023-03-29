import React, { useState, useEffect } from 'react'

import { AiOutlineCloseCircle as IconClose } from 'react-icons/ai'
import { BsSearch as IconSearch } from 'react-icons/bs'

import { AnimateScroll } from '../components/AnimateScroll'
import { EmptyResults } from '../components/EmptyResults'
import { ErrorModal } from '../components/ErrorModal'
import { FiltersSelect } from '../components/recipes/FiltersSelect'
import { FloatingButtonTray } from '../components/FloatingButtonTray'
import { FoundRecipes } from '../components/recipes/FoundRecipes'
import { Loader } from '../components/Loader'
import { RandomRecipes } from '../components/recipes/RandomRecipes'
import { RenderMobile } from '../components/RenderMobile'
import { SEARCH_RECIPE_BASE_URL } from '../constants/endpoints'
import useDataContext from '../hooks/useDataContext'
import useWindowWidth from '../hooks/useWindowWidth'
import { ApiResponseGlobalSearch, Option } from '../types/models'
import Background from '../assets/foodBg.webp'

const key = import.meta.env.VITE_API_KEY
const DATA_INITIAL_STATE = {
  results: undefined,
}
export function SearchRecipes() {
  const { storeRecipe } = useDataContext()

  const width = useWindowWidth()
  const [apiResponseSearch, setApiResponseSearch] =
    useState<ApiResponseGlobalSearch>(DATA_INITIAL_STATE)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState<Error | null>(null)
  const [searchTerm, setSearchTerm] = useState<string>('')
  const [sort, setSort] = useState<Option>({
    value: '',
    label: '',
    direction: '',
  })
  const [selectedDietFilters, setSelectedDietFilters] = useState<string[]>([])
  const [selectedDishTypeFilters, setSelectedDishTypeFilters] = useState<
    string[]
  >([])
  const [selectedCuisineFilters, setSelectedCuisineFilters] = useState<
    string[]
  >([])
  const [selectedIntolerancesFilters, setSelectedIntolerancesFilters] =
    useState<string[]>([])

  useEffect(() => {
    document.title = `Search recipes`
  }, [])

  useEffect(() => {
    if (apiResponseSearch.results?.length === 0) {
      setIsModalOpen(true)
    }
    if (apiResponseSearch.results) {
      apiResponseSearch.results.forEach((recipe) => {
        storeRecipe(recipe.id, recipe)
      })
    }
  }, [apiResponseSearch])

  const handleChange = (e: React.FormEvent<HTMLInputElement>) => {
    setSearchTerm(e.currentTarget.value)
  }

  const onSubmitHandler = async (e: any) => {
    e.preventDefault()
    setIsMenuOpen(false)
    try {
      setIsLoading(true)
      const url = new URL(SEARCH_RECIPE_BASE_URL)
      const params = new URLSearchParams(url.search)
      params.set('apiKey', `${key}`)
      params.set('query', searchTerm)
      if (selectedDishTypeFilters) {
        params.set('type', selectedDishTypeFilters.join(','))
      }
      if (selectedDietFilters) {
        params.set('diet', selectedDietFilters.join(','))
      }
      if (selectedCuisineFilters) {
        params.set('cuisine', selectedCuisineFilters.join(','))
      }
      if (selectedIntolerancesFilters) {
        params.set('intolerances', selectedIntolerancesFilters.join(','))
      }
      params.set('addRecipeInformation', 'true')
      params.set('addRecipeNutrition', 'true')
      params.set('number', '8')
      if (sort) {
        params.set('sort', sort.value)
        params.set('sortDirection', sort.direction!)
      }
      const response = await fetch(`${url}${params}`)
      const apiResponse = (await response.json()) as ApiResponseGlobalSearch
      setApiResponseSearch(apiResponse)
    } catch (_) {
      setError(new Error('Something went wrong, please try again!'))
      setIsModalOpen(true)
    } finally {
      setIsLoading(false)
      setIsMenuOpen(false)
    }
  }

  const getSearchResultLabel = (apiResponseSearch: ApiResponseGlobalSearch) => {
    if (apiResponseSearch.results === undefined) {
      return null
    }
    if (apiResponseSearch.results.length === 0) {
      return (
        <> {isModalOpen && <EmptyResults setIsModalOpen={setIsModalOpen} />}</>
      )
    }

    return (
      <h1 className="text-green-500 font-bold text-sm md:text-base lg:text-[20px] py-1 lg:py-3">
        Yummy! We found {`${apiResponseSearch.results.length}`} recipes for you.
      </h1>
    )
  }

  return error ? (
    <div>
      {isModalOpen && (
        <ErrorModal
          setIsModalOpen={setIsModalOpen}
          message={error.message}
          setError={setError}
        />
      )}{' '}
    </div>
  ) : (
    <div>
      <RenderMobile width={width}>
        {<AnimateScroll>{<FloatingButtonTray />}</AnimateScroll>}
      </RenderMobile>

      <section className="bg-[url(/assets/foodBg.webp)] bg-img-header h-60 md:h-[400px] lg:h-[500px] bg-top justify-center items-center">
        <h1 className="absolute top-16 md:top-24 xl:top-28 left-5 md:left-16 text-white text-[15px] md:text-xl lg:text-2xl w-2/3 md:w-[40%] md:tracking-wide xl:pr-20">
          Looking for specific recipes, diet types, cuisines, dish types?
        </h1>
        <h4 className="absolute top-36 md:top-64 lg:top-44 xl:top-48 right-5 md:left-96 lg:left-16 text-smaller md:text-lg lg:text-xl text-right md:text-left md:pr-14 w-1/2 xl:w-1/3">
          Find your next adventure in the kitchen by typing keywords and/or
          using the search filters!
        </h4>
        <RenderMobile width={width}>
          {isMenuOpen ? (
            <button
              aria-label="Close search window"
              type="button"
              name="close"
              title="Close"
              onClick={() => setIsMenuOpen(false)}
              className="fixed top-5 right-10 row-center z-[101] gap-1"
            >
              <IconClose aria-hidden="true" size="0.8rem" />
              <span className="text-smallest">Close</span>
            </button>
          ) : (
            <button
              aria-label="Open window to search recipes"
              type="button"
              name="search-recipe"
              title="Search recipe"
              className="bg-white shadow-30 row-center z-10 absolute top-60 md:top-24 right-5 md:right-8 circle-sm md:circle-lg "
              onClick={() => setIsMenuOpen(true)}
            >
              <IconSearch aria-hidden="true" />
            </button>
          )}
        </RenderMobile>
      </section>
      <section
        className={`${
          isMenuOpen
            ? 'transition-all animate-fadeInDown shadow-xl fixed'
            : 'hidden h-0 z-0'
        } bg-white absolute z-[100] top-0 lg:top-24 left-0 pt-28 h-screen w-screen lg:bg-transparent lg:block`}
      >
        <form
          onSubmit={onSubmitHandler}
          className={`px-10 md:px-28 lg:px-10 flex flex-col w-full lg:absolute lg:right-0 lg:top-0 lg:items-end sm:${
            isMenuOpen ? 'absolute top-0 ' : 'hidden h-0'
          } `}
        >
          <div className="px-4 mb-8 lg:mb-6 border-b-2 border-b-gray-100 flex gap-x-3 lg:border-none lg:w-[40vw] lg:ml-6 lg:bg-[rgba(255,_255,_255,_0.8)] lg:shadow-30 lg:border-[rgba(255,_255,_255,_0.3)] lg:rounded-md lg:items-center lg:py-2">
            <IconSearch name="search-recipe" title="Search recipe" />
            <input
              className="w-full lg:bg-transparent placeholder:text-sm lg:placeholder:text-base"
              type="text"
              name="search-recipe"
              placeholder="Search recipes..."
              value={searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="lg:w-[40vw]">
            <FiltersSelect
              setSelectedDietFilters={setSelectedDietFilters}
              setSelectedDishTypeFilters={setSelectedDishTypeFilters}
              setSelectedCuisineFilters={setSelectedCuisineFilters}
              setSelectedIntolerancesFilters={setSelectedIntolerancesFilters}
              setSort={setSort}
            />
            <button
              aria-label="Search recipes"
              type="submit"
              title="Search"
              name="search"
              className="bg-green-500 hover:bg-[rgba(71,_101,_72,0.9)] shadow-lg hover:shadow-xl py-2 px-6 md:py-[10px] lg:py-2 mt-10 w-full row-center rounded-md text-white font-secondary text-sm lg:text-lg mx-auto"
            >
              Search
            </button>
          </div>
        </form>
      </section>
      <section className={` ${isMenuOpen ? 'hidden' : 'block'}`}>
        {isLoading ? (
          <Loader />
        ) : (
          <>
            <div className="flex justify-center text-2xl w-full py-5">
              {getSearchResultLabel(apiResponseSearch)}
            </div>

            <FoundRecipes apiResponseSearch={apiResponseSearch} />
          </>
        )}
      </section>
      <div className="mt-10 mb-20 w-[80vw] mx-auto flex flex-col gap-8">
        <h1 className="heading-green px-0 py-2">Suggestions for you</h1>

        <RandomRecipes tags="vegan" title="Vegan Recipes" />
        <RandomRecipes tags="italian" title="Italian Recipes" />
        <RandomRecipes tags="breakfast" title="Breakfast Ideas" />
        <RandomRecipes tags="dessert" title="Desserts Suggestions" />
      </div>
    </div>
  )
}
