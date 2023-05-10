import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const Navbar = () => {
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
          {auth?.user ? (
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
          ) : (
            <div>
              <Link
                to="/LogIn"
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-blue-500 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-base px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Log in
              </Link>

              <Link
                to="/Sign-Up"
                type="button"
                className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-blue-500 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-base px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
