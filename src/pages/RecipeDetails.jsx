import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from "axios"
import Loader from "../components/Loader"

function RecipeDetail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)

  useEffect(() => {
    fetchRecipe()
  }, [id])

  const fetchRecipe = async () => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
      )

      setRecipe(res.data.meals[0])
    } catch (error) {
      console.log(error)
    }
  }

  if (!recipe) {
    return <Loader />
  }

  // Extract ingredients dynamically
  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`]
    const measure = recipe[`strMeasure${i}`]

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${ingredient} - ${measure}`)
    }
  }

  return (
    <div className="bg-black min-h-screen text-white p-6">

      <h1 className="text-3xl text-yellow-500 mb-4">
        {recipe.strMeal}
      </h1>

      <img
        src={recipe.strMealThumb}
        alt={recipe.strMeal}
        className="w-72 mb-6 rounded"
      />

      <h2 className="text-xl text-yellow-500 mb-2">
        Category: {recipe.strCategory}
      </h2>

      <h2 className="text-xl text-yellow-500 mt-6 mb-2">
        Ingredients
      </h2>

      <ul className="list-disc ml-6 mb-6">
        {ingredients.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>

      <h2 className="text-xl text-yellow-500 mb-2">
        Instructions
      </h2>

      <p className="leading-7 whitespace-pre-line">
        {recipe.strInstructions}
      </p>

    </div>
  )
}

export default RecipeDetail