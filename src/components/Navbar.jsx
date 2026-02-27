import { useNavigate } from "react-router-dom";
import Logo from "../assets/main-logo.png"
function Navbar(){
    const navigate = useNavigate()

    return(
        <div className="bg-gray-600 text-amber-400 lg:p-4 flex justify-between text-center  lg:px-8 p-2 px-8">
            {/* <h1 className="cursor-pointer font-bold p-1 outline-1 bg-gray rounded 3x1 text-2xl" onClick={() => navigate("/")}>My Recipe App</h1> */}
            <img src={Logo} className="  cursor-pointer m-0 lg:w-15 w-8" onClick={() => navigate("/")}/>
            <button className="text-white font-bold" onClick={()=>navigate("/favorites")}>Favorites</button>
        </div>
    )
}
export default Navbar