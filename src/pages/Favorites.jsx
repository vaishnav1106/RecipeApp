import { useNavigate } from "react-router-dom";


function Favorites({ favorites, toggleFavorite }) {
  const navigate = useNavigate();

  return (
    <div className="bg-linear-to-r from-[#252629]  to-[#01122b] min-h-screen text-white p-6">
      <h1 className="text-yellow-400 text-2xl mb-6">My Favorites</h1>

      {favorites.length === 0 && <p>No Favorites Yet.</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {favorites.map((recipe) => (
          <div key={recipe.idMeal} className="outline-1 rounded p-4">
            <img src={recipe.strMealThumb} className="rounded-2xl " />
            <h3 className="text-yellow-500">{recipe.strMeal}</h3>
            <div className="flex justify-between mt-3">
              <button
                onClick={() => navigate(`/recipe/${recipe.idMeal}`)}
                className="bg-yellow-400 text-black px-3 py-1 text-sm rounded"
              >
                View
              </button>

              <button onClick={() => toggleFavorite(recipe)}>❤️</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Favorites;
