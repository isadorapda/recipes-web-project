import React from 'react'
import {
  Categories,
  MENU_CATEGORY_OPTIONS,
} from '../../constants/menuCategoriesOptions'
import useDataContext from '../../hooks/useDataContext'

interface Props {
  setIsMenuVisible: (value: boolean) => void
  id: number
  menuPosition: string
  handleToggleToCategory: (category: keyof Categories, recipeId: number) => void
}

export function MenuSelectCategories({
  setIsMenuVisible,
  id,
  menuPosition,
  handleToggleToCategory,
}: Props) {
  const { categories } = useDataContext()
  return (
    <div className={`${menuPosition}`}>
      <div className="flex items-center justify-between py-2 md:py-4 px-4 leading-8 text-gray-600 text-smaller md:text-sm xl:text-median uppercase">
        <h2>add to a collection</h2>
        <span
          aria-label="Click to close this menu"
          className="text-gray-300 hover:text-red-500 cursor-pointer"
          onClick={() => setIsMenuVisible(false)}
        >
          x
        </span>
      </div>
      <div className="overflow-y-auto scroll-smooth px-4">
        {Object.keys(MENU_CATEGORY_OPTIONS).map((_category) => {
          const categoryKey = _category as keyof Categories
          const category = categories[categoryKey]
          return (
            <div className="flex items-center gap-3 pb-2" key={category.value}>
              <input
                type="checkbox"
                name="category"
                checked={category.recipesIds.includes(id)}
                id={category.value}
                onChange={() => handleToggleToCategory(categoryKey, id)}
              />
              <label
                htmlFor={category.value}
                className="text-gray-400 text-sm md:text-base xl:text-lg"
              >
                {category.label}
              </label>
            </div>
          )
        })}
      </div>
    </div>
  )
}
