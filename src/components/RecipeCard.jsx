import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipes] = useState(null);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );

      setRecipes(res.data.meals[0]);
    } catch (error) {
      console.log(error);
    }
  };

  if (!recipe) {
    return <Loader />;
  }

  //Extract ingredients dynamically

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredients = recipe[`strIngredients${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredients && ingredients.trim() !== "") {
      ingredients.push(`${ingredients}-${measure}`);
    }
  }

  return(
    <div className="bg-black min-h-screen text-white p-6">
        <h1 className="text-3xl text-yellow-400 mb-4">
            {recipe.strMeal}
        </h1>
        <img 
        src="recipe.strMealThumb" alt={recipe.strMeal} className="w-24 m-b-6 rounded">
        </img>

        <h2 className="text-xl"></h2>
    </div>
  )
}

export default RecipeDetail