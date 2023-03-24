import { KeyboardEventHandler, useEffect, useState } from 'react'

import CreatableSelect from 'react-select/creatable'
import { StylesConfig } from 'react-select'

import { SEARCH_RECIPE_BY_INGREDIENTS_BASE_URL } from '../constants/endpoints'
import { PANTRY_ACTIONABLES } from '../constants/pantryActionables'
import { FoundRecipesByIngredients } from '../types/models'
import useDataContext from '../hooks/useDataContext'
import { EmptyResults } from '../components/EmptyResults'
import { CardRecipeByIngredients } from '../components/recipes/CardRecipeByIngredients'
import { Loader } from '../components/Loader'
import { ErrorModal } from '../components/ErrorModal'

interface Option {
  readonly label: string
  readonly value: string
}

const key = import.meta.env.VITE_API_KEY

const INPUT_VALUES_KEY = 'INPUT_VALUES_KEY'

const components = {
  DropdownIndicator: null,
}
const createOption = (label: string) => ({
  label,
  value: label,
})

const customStyles: StylesConfig<Option> = {
  container: (provided) => ({
    ...provided,
    maxHeight: '80px',
    overflowY: 'auto',
  }),
  control: (provided) => ({
    ...provided,
    backgroundColor: ' transparent',
    border: 'transparent',
    fontSize: '1rem',
    borderRadius: '30px',
    maxHeight: '80px',
    padding: '0 5px 0 10px',
    overflowY: 'auto',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: '#B0C3B5',
    fontSize: '1rem',
    borderRadius: '30px',
    padding: '0 5px',
    fontFamily: "'ABeeZee', sans-serif;",
  }),
  clearIndicator: (provided) => ({
    ...provided,
    position: 'absolute',
    top: '4px',
    right: '2px',
  }),
  placeholder: (provided) => ({
    ...provided,
    fontSize: '0.8rem',
  }),
}

export function WhatsInFridge() {
  const { recipesFoundByIngredients, setRecipesFoundByIngredients } =
    useDataContext()
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [inputIngredientsValue, setInputIngredientsValue] = useState<string>('')
  const [inputValues, setInputValues] = useState<readonly Option[]>(
    window.localStorage
      .getItem(INPUT_VALUES_KEY)
      ?.split(',')
      .map((label) => createOption(label)) || []
  )
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    window.localStorage.setItem(
      INPUT_VALUES_KEY,
      inputValues.map((value) => value.label).join(',')
    )
  }, [inputValues])

  const onSubmitHandler = async (e: any) => {
    e.preventDefault()

    try {
      setIsLoading(true)
      const url = new URL(SEARCH_RECIPE_BY_INGREDIENTS_BASE_URL)
      const params = new URLSearchParams(url.search)
      params.set('apiKey', `${key}`)
      const ingredientsInput = inputValues.map((value) =>
        value.value.toLowerCase()
      )
      params.set('ingredients', ingredientsInput.join(',+'))
      params.set('ignorePantry', 'false')
      params.set('number', '8')

      const response = await fetch(`${url}${params}`)
      const apiResponse = (await response.json()) as FoundRecipesByIngredients[]

      setRecipesFoundByIngredients(apiResponse)
    } catch (_) {
      setError(new Error('Sorry, something went wrong. Please, try again.'))
    } finally {
      setIsLoading(false)
    }
  }
  useEffect(() => {
    if (!recipesFoundByIngredients) {
      setIsModalOpen(true)
    }
  }, [recipesFoundByIngredients])

  const handleKeyDown: KeyboardEventHandler = (event) => {
    if (!inputIngredientsValue) return
    switch (event.key) {
      case 'Enter':
      case 'Tab':
        event.preventDefault()
        setInputValues((prev) => [...prev, createOption(inputIngredientsValue)])
        setInputIngredientsValue('')
    }
  }

  const getSearchResultLabel = (
    recipesFoundByIngredients: FoundRecipesByIngredients[] | undefined
  ) => {
    if (recipesFoundByIngredients === undefined) return null

    if (!recipesFoundByIngredients.length) {
      return (
        <> {isModalOpen && <EmptyResults setIsModalOpen={setIsModalOpen} />}</>
      )
    }
    return (
      <h1 className="py-1 lg:py-3 text-green-500 font-bold text-sm md:text-base lg:text-2xl">
        Yummy! We found {`${recipesFoundByIngredients.length}`} recipes for you.
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
      )}
    </div>
  ) : (
    <div>
      <div className="bg-[url(/assets/tableIngredients.png)] bg-top bg-img-header h-96 md:h-[400px] lg:h-[500px] justify-start md:relative">
        <h1 className="text-green-500 md:text-2xl lg:text-4xl font-bold mx-auto md:mx-0 md:pl-20 pt-8 md:pt-16 first-letter:uppercase">
          Cook with what you have
        </h1>
        <p className="text-center text-gray-600 md:text-left w-full md:w-2/3 lg:w-1/2 mx-auto md:mx-0 px-2 md:pl-20 py-4 text-smaller md:text-sm lg:text-base xl:text-lg tracking-wide">
          Don't want to go to the store? No problem! Enter the ingredients you
          have on hand, and we'll show you recipes you could make. For best
          results, enter 10 or more ingredients below, including staples like
          salt, pepper, and olive oil.
        </p>
        <div className="pt-0 md:pt-5 relative">
          <form
            onSubmit={onSubmitHandler}
            className="flex flex-col lg:flex-row bg-white shadow-lg rounded-[30px] w-[80vw] lg:w-[70vw] py-1 mx-auto"
          >
            <div className="w-full">
              <CreatableSelect
                components={components}
                inputValue={inputIngredientsValue}
                isClearable
                isMulti
                menuIsOpen={false}
                onChange={setInputValues}
                onInputChange={setInputIngredientsValue}
                styles={customStyles}
                onKeyDown={handleKeyDown}
                placeholder="Type an ingredient at time and press enter..."
                value={inputValues}
              />
            </div>
            <button
              type="submit"
              className="absolute top-36 right-[10%] xl:right-[15%] rounded-4xl shadow-30 bg-white hover:bg-[rgba(176,_195,_181,_0.9)] text-green-500 hover:text-white text-base lg:text-lg xl:text-xl font-secondary px-4 lg:px-9 py-1"
            >
              Search
            </button>
          </form>
        </div>
      </div>
      {!recipesFoundByIngredients && !isLoading ? (
        <section className="flex flex-col md:flex-row md:bottom-20 w-[80vw] md:w-full lg:w-[90vw] mx-auto pt-8 md:px-14 md:gap-20 ">
          {PANTRY_ACTIONABLES.map((actionable) => (
            <div
              key={actionable.value}
              className="row-center pb-10 md:pb-0 gap-x-5 md:gap-x-10 lg:w-1/2"
            >
              <img
                src={actionable.image}
                alt={`${actionable.value} icon`}
                className="w-14 md:w-16 lg:w-20 "
              />
              <div className="flex flex-col justify-start">
                <h1 className="first-letter:capitalize text-smaller lg:text-lg xl:text-xl font-bold font-secondary pb-2">
                  {actionable.header}
                </h1>
                <h4 className="text-gray-500 first-letter:capitalize text-smaller lg:text-base xl:text-lg">
                  {actionable.description}
                </h4>
              </div>
            </div>
          ))}
        </section>
      ) : null}

      {isLoading ? (
        <Loader />
      ) : (
        <>
          <div className="w-full row-center py-3 md:py-10">
            {getSearchResultLabel(recipesFoundByIngredients)}
          </div>
          <div className="flex flex-col md:grid md:grid-cols-3 laptopL:grid-cols-4 gap-4 md:gap-x-10 md:gap-y-20 w-[80vw] mx-auto">
            {(recipesFoundByIngredients || []).map((recipe) => {
              return <CardRecipeByIngredients recipe={recipe} key={recipe.id} />
            })}
          </div>
        </>
      )}
    </div>
  )
}
