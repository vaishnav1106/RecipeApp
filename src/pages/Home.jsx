import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function Home({ favorites, toggleFavorite }) {
  const [search, setSearch] = useState("");
  const [recipes, setRecipes] = useState([]);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // on first load mixed recipe have to display
  useEffect(() => {
    loadRandomRecipes();
  }, []);

  // search function to find the recipe as we like
  const fetchRecipes = async (query) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`,
      );

      setRecipes(res.data.meals || []);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  // Load random mixed recipes
  const loadRandomRecipes = async () => {
    try {
      setLoading(true);

      const requests = [];

      for (let i = 0; i < 15; i++) {
        requests.push(
          axios.get("https://www.themealdb.com/api/json/v1/1/random.php"),
        );
      }

      const responses = await Promise.all(requests);

      const mixedRecipes = responses.map((res) => res.data.meals[0]);

      setRecipes(mixedRecipes);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  /*
   * Handles the logic when a user submits the search form
   * (either by clicking the Search button or pressing 'Enter')
   */
  const handleSubmit = (e) => {
    // 1. Stop the browser from reloading the entire page
    // (React apps should stay on the same page)
    e.preventDefault();

    // 2. Check if the search box is empty (or only has spaces)
    if (search.trim() === "") {
      // If empty, show the 12 random "surprise" recipes
      loadRandomRecipes();
    } else {
      // If the user typed something, go fetch those specific recipes
      fetchRecipes(search);
    }
  };

  // Here we are structuring the UI interface
  return (
    <div className=" bg-linear-to-r from-[#252629]  to-[#01122b] min-h-screen text-white p-6 px-8">
      <div className="text-center p-3 ">
        <h1 className="text-extrabold hover:animate-bounce sm:text-lg md:text-2xl lg-text-3xl ">
          "Welcome To The World Of Food"
        </h1>
        <p className="text-xs hidden md:block">(place your pointer)👆</p>
      </div>

      {/* search bar is adding here */}
      <form onSubmit={handleSubmit} className="flex justify-center">
        <input
          name="search-meals"
          type="text"
          placeholder="Search..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full md:w-1/3 md/max-auto  p-2 mb-6 bg-black border-2 border-yellow-500 rounded-2xl "
        />
      </form>

      {loading ? (
        <Loader />
      ) : (
        // here we are checking that if the loader is true or false if it true
        // then we present the recipe card of desired product we searched
        // otherwise it will get the "No result found" text
        <>
          {recipes.length === 0 && <p>No results found</p>}

          {/* // here we are structuring the output to the screen how the screen gets its recipe-card display*/}
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5  gap-6">
            {recipes.map((recipe) => {
              const isFavorites = favorites.some(
                (item) => item.idMeal === recipe.idMeal
              );
              //  here we are designing the UI of Recipe-Card How it looks.
              return (
                <div
                  key={recipe.idMeal}
                  className="outline outline-offset-2 p-2 rounded flex flex-col "
                >
                  {/*here the recipe image is fetching from the API */}
                  <img
                    src={recipe.strMealThumb}
                    className=" object-cover mb-3 rounded"
                  />
                  <div className="flex flex-col justify-end">
                    {/*here the recipe header name is fetching from the API */}
                    <h3 className="text-yellow-600">{recipe.strMeal}</h3>{" "}
                    <p className="text-sm text-white mb-3">
                      {recipe.strCategory}
                    </p>
                  </div>
                  {/* here we are placing the two button on the card  */}
                  <div className="flex justify-between">
                    <button
                      onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                      className="bg-yellow-600 text-black px-3 py-1 text-sm rounded"
                    >
                      View
                    </button>

                    {/* here we are placing the favorites button */}
                    <button onClick={() => toggleFavorite(recipe)}>
                      {isFavorites ? "❤️" : "🤍"}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

export default Home;
