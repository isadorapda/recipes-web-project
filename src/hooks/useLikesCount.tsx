import useDataContext from './useDataContext'

export default function useLikesCount(recipeId: number) {
  const { likedRecipesIds, setLikedRecipesIds } = useDataContext()

  const isLiked = likedRecipesIds.includes(recipeId)
  function handleLiked(id: number) {
    if (likedRecipesIds.includes(id)) {
      setLikedRecipesIds(likedRecipesIds.filter((likedId) => likedId !== id))
    } else {
      setLikedRecipesIds([...likedRecipesIds, id])
    }
  }

  return { isLiked, handleLiked }
}
