import { Routes, Route } from 'react-router-dom'
import { RecipePage } from './screens/RecipePage'
import { SavedRecipes } from './screens/SavedRecipes'
import { GroceryList } from './screens/GroceryList'
import { Home } from './screens/Home'
import { SearchRecipes } from './screens/SearchRecipes'
import { WhatsInFridge } from './screens/WhatsInFridge'

export function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="search-recipes" element={<SearchRecipes />} />
      <Route path="whats-in-your-fridge" element={<WhatsInFridge />} />
      <Route path="saved" element={<SavedRecipes />} />
      <Route path="grocery-list" element={<GroceryList />} />
      <Route path="recipes/:recipeId" element={<RecipePage />} />
    </Routes>
  )
}
