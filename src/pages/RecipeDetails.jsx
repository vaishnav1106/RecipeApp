import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "../components/Loader";

function RecipeDetail() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetchRecipe();
  }, [id]);

  const fetchRecipe = async () => {
    try {
      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`,
      );

      setRecipe(res.data.meals[0]);
    } catch (error) {
      console.log(error);
    }
  };

  if (!recipe) {
    return <Loader />;
  }

  // Extract ingredients dynamically
  const ingredients = [];

  for (let i = 1; i <= 20; i++) {
    const ingredient = recipe[`strIngredient${i}`];
    const measure = recipe[`strMeasure${i}`];

    if (ingredient && ingredient.trim() !== "") {
      ingredients.push(`${ingredient} - ${measure}`);
    }
  }

  return (
    <div className=" min-h-screen bg-linear-to-r from-[#252629]  to-[#01122b] text-white p-6 flex flex-col px-10 ">
      <h1 className="text-3xl font-extrabold text-white mb-4 text-center">
        {recipe.strMeal}
      </h1>
        {/* combining the UI structure of thumb img and the category here */}
      <div>
        <img
          src={recipe.strMealThumb}
          alt={recipe.strMeal}
          className="w-72 mb-6 rounded flex outline-2 p-2"
        />

        <h2 className="text-xl text-yellow-400 mb-2 ">
          Category: {recipe.strCategory}
        </h2>
      </div>

        {/* here we are combining the Ingredients and Instructions UI structure  */}
       
      <div className="rounded border-5 p-3 mb-2 flex gap-50 ">
        <div>
          <h2 className="text-xl text-yellow-400 font-bold mb-2 ">
            Ingredients
          </h2>

          <ul className="list-disc ml-6 mb-6">
            {ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="rounded border-5 p-3">
        <h2 className="text-xl font-bold text-yellow-500 mb-2 ">
          Instructions
        </h2>

        <p className="leading-7 ">{recipe.strInstructions}</p>
      </div>
    </div>
  );
}

export default RecipeDetail;
