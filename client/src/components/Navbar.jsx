import { BsSearch } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import { useContext, useState, useEffect } from "react";
import axios from "axios";

const Navbar = (props) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [hasBusiness, setHasBusiness] = useState(false);
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` },
  };
  useEffect(() => {
    console.log(auth, " HI IM FROM USE EFFECT CHECK BUSINESS");
    if (auth?.user?.user_id) {
      checkBusiness();
    }
  }, [auth?.user?.user_id]);

  const checkBusiness = async () => {
    //to check if user has existing business or not
    const id = auth.user.user_id;
    console.log(id, "IM FROM CHECK BUSINESS");
    const response = await axios.get(`/get-business/${id}`, config);
    setHasBusiness(response.data.rows.length > 0);
    console.log(response.data.rows.length > 0);
  };

  const logOut = () => {
    localStorage.removeItem("jwt_token");
    auth.setUser();
    navigate("/");
  };

  const pathExempt = window.location.pathname;
  return (
    <div className="sticky top-0 z-50">
      <div className="Mother">
        <img src="/SerBizNavLogo.png" alt="" />
        <div className="headerContainers"></div>
        <div className="searchBarContainer">
          {pathExempt === "/Search" ? ( //use && if you want to render nothing if statement is false, else use ?: if u want to render something after a false statement
            <>
              <input
                onChange={(e) => {
                  // let value = e.target.value
                  props.searching(e.target.value);
                }}
                className="searchBar"
                type={"text"}
                placeholder="Search..."
              />
              <BsSearch size={24} className="searchIcon" />
            </>
          ) : (
            <Link to="/Search" className="text-black font-bold text-lg">
              Looking for a particular business? Click here
            </Link>
          )}
        </div>
        <div className="navbarHeader">
          <Link to="/">HOME</Link>
          <Link to="/About">ABOUT</Link>
          {/* <Link>CONTACTS</Link> */}
          {auth?.user ? (
            <div>
              {hasBusiness ? ( //ternary condition to display a button if the user has a business or not
                <Link
                  to="/My-Business"
                  className=" bg-gray-400 hover:duration-500 hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  My Business
                </Link>
              ) : (
                <Link
                  to="/Create-Business"
                  className=" bg-gray-400 hover:duration-500 hover:bg-gray-500 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                >
                  Create Business
                </Link>
              )}

              <button
                onClick={logOut}
                className="text-white bg-gray-400 hover:duration-500 hover:bg-red-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div>
              <Link
                to="/LogIn"
                type="button"
                className="text-gray-900 border hover:duration-500 border-gray-300 focus:outline-none hover:bg-blue-500 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-base px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              >
                Log in
              </Link>

              <Link
                to="/Sign-Up"
                type="button"
                className="text-gray-900 border hover:duration-500 border-gray-300 focus:outline-none hover:bg-blue-500 focus:ring-4 focus:ring-gray-200 font-medium rounded-full text-base px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
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
