import { useNavigate } from "react-router-dom";
import Logo from "../assets/main-logo.png";
function Navbar() {
  const navigate = useNavigate();

  return (
    <div className="bg-gray-600 text-amber-400 lg:p-4 flex justify-between text-center  lg:px-8 p-2 px-8">
      <img
        src={Logo}
        className="  cursor-pointer m-0 lg:w-15 w-8"
        onClick={() => navigate("/")}
      />
      <h1>hello</h1>
      <button
        className="text-white font-bold"
        onClick={() => navigate("/favorites")}
      >
        Favorites
      </button>
    </div>
  );
}
export default Navbar;
