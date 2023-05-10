import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
// import { toast } from "react-toastify";

const NavbarLoggedIn = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = () => {
    auth.setUser();
    navigate("/");
  };
  return (
    <div className="sticky top-0 z-50">
      <div className="Mother">
        <img src="/SerBizNavLogo.png" alt="" />
        <div className="headerContainers"></div>
        <div className="searchBarContainer">
          <input className="searchBar" type={"text"} placeholder="Search..." />
          <BsSearch size={24} className="searchIcon" />
        </div>
        <div className="navbarHeader">
          <Link to="/">HOME</Link>
          <Link to="/About">ABOUT</Link>
          <Link>CONTACTS</Link>
          <div>
            <Link
              to="/Create-Business"
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Create Business
            </Link>
            <button
              onClick={logOut}
              className="text-white bg-gray-800 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
            >
              Sign Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavbarLoggedIn;
