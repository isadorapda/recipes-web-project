import Select, { StylesConfig } from 'react-select'
import {
  CUISINE,
  DIET_TYPES,
  FOOD_INTOLERANCES,
  MEAL_TYPES,
  SORT,
} from '../constants/filters'
import { Option } from '../types/models'

const customStyles: StylesConfig<Option> = {
  menuList: (provided) => ({
    ...provided,
    maxHeight: '200px',
    fontSize: '0.8rem',
    color: '#4A4A4A',
  }),
  menu: (provided) => ({
    ...provided,
    top: 'auto',
  }),
  option: (provided, state) => ({
    ...provided,
    background: state.isFocused ? '#B0C3B5' : '',
    color: state.isFocused ? 'white' : '',
    borderRadius: '6px',
  }),
  container: (provided) => ({
    ...provided,
    width: '100%',
    borderRadius: '6px',
    boxShadow: ' 0 4px 10px rgba(0,0,0,0.12), 0 0 1px rgba(0,0,0,0.05) inset',
  }),

  control: (provided) => ({
    ...provided,
    backgroundColor: ' rgba(255, 255, 255, 0.8)',
    borderRadius: '6px',
    border: '1px solid rgba(255, 255, 255, 0.9)',
    fontSize: '0.8rem',
    maxHeight: '60px',
    overflow: 'scroll',
  }),
  multiValue: (provided) => ({
    ...provided,
    backgroundColor: ' #B0C3B5',
    fontSize: '0.8rem',
    borderRadius: '6px',
  }),
  multiValueRemove: (styles) => ({
    ...styles,
    borderRadius: '6px',
    ':hover': {
      background: '#b0444296',
      color: '#B04342',
    },
  }),
  dropdownIndicator: (provided) => ({
    ...provided,
    color: '#616161',
  }),
  clearIndicator: (provided) => ({
    ...provided,
    color: '#616161',
  }),
}

interface Props {
  setSelectedDietFilters: (newValue: string[]) => void
  setSelectedDishTypeFilters: (newValue: string[]) => void
  setSelectedCuisineFilters: (newValue: string[]) => void
  setSelectedIntolerancesFilters: (newValue: string[]) => void
  setSort: (newValue: Option) => void
}

export function FiltersSelect({
  setSelectedDietFilters,
  setSelectedDishTypeFilters,
  setSelectedCuisineFilters,
  setSelectedIntolerancesFilters,
  setSort,
}: Props) {
  return (
    <div className="flex flex-col mx-auto lg:mr-0 gap-y-2 lg:gap-2">
      <Select
        aria-multiselectable="true"
        styles={customStyles}
        isMulti
        options={DIET_TYPES}
        placeholder="Diet type..."
        onChange={(selectedItemsArray) => {
          setSelectedDietFilters(selectedItemsArray.map(({ value }) => value))
        }}
      />
      <Select
        aria-multiselectable="true"
        styles={customStyles}
        isMulti
        options={MEAL_TYPES}
        placeholder="Meal type..."
        onChange={(selectedItemsArray) => {
          setSelectedDishTypeFilters(
            selectedItemsArray.map(({ value }) => value)
          )
        }}
      />
      <Select
        aria-multiselectable="true"
        styles={customStyles}
        isMulti
        options={FOOD_INTOLERANCES}
        placeholder="Food intolerances..."
        onChange={(selectedItemsArray) => {
          setSelectedIntolerancesFilters(
            selectedItemsArray.map(({ value }) => value)
          )
        }}
      />
      <Select
        aria-multiselectable="true"
        styles={customStyles}
        isMulti
        options={CUISINE}
        placeholder="Cuisine..."
        onChange={(selectedItemsArray) => {
          setSelectedCuisineFilters(
            selectedItemsArray.map(({ value }) => value)
          )
        }}
      />
      <Select
        aria-multiselectable="false"
        options={SORT}
        isMulti={false}
        styles={customStyles}
        placeholder="Sort by..."
        onChange={(selected) => {
          selected ? setSort(selected) : ''
        }}
      />
    </div>
  )
}
