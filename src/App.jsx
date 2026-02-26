import { Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import Navbar from "./components/Navbar"
import Home from "./pages/Home"
import RecipeDetail from "./pages/RecipeDetails"
import Favorites from "./pages/Favorites"

function App() {
  const [favorites, setFavorites] = useState(() => {
    const data = localStorage.getItem("favorites")
    return data ? JSON.parse(data) : []
  })

  useEffect(() => {
    localStorage.setItem("favorites", JSON.stringify(favorites))
  }, [favorites])

  const toggleFavorite = (recipe) => {
    const exists = favorites.find(item => item.idMeal === recipe.idMeal)

    if (exists) {
      setFavorites(favorites.filter(item => item.idMeal !== recipe.idMeal))
    } else {
      setFavorites([...favorites, recipe])
    }
  }

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
        <Route
          path="/favorites"
          element={
            <Favorites
              favorites={favorites}
              toggleFavorite={toggleFavorite}
            />
          }
        />
      </Routes>
    </>
  )
}

export default App