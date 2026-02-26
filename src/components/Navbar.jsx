import { useNavigate } from "react-router-dom";
function Navbar(){
    const navigate = useNavigate()

    return(
        <div className="bg-gray-500 text-amber-400 p-4 flex justify-between text-center  px-8">
            <h1 className="cursor-pointer font-bold p-1 outline-1 rounded 3x1 text-3xl" onClick={() => navigate("/")}>My Recipe App</h1>
            <button className="text-white font-bold" onClick={()=>navigate("/favorites")}>Favorites</button>
        </div>
    )
}
export default Navbar