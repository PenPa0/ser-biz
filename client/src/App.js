import "./App.css";
// import SanityTest from "./components/SanityTest";
import HomePage from "./pages/HomePage";
// import Navbar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";
import BusinessPage from "./pages/BusinessPage";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import MyBusiness from "./pages/MyBusiness";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateBusiness from "./pages/CreateBusiness";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import { useContext, useEffect, useState } from "react";
import AdminPage from "./pages/AdminPage";
import axios from "axios";
import SearchPage from "./pages/SearchPage";

function App() {
  const auth = useContext(AuthContext);
  const { user, setUser } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    if (typeof user == "undefined") {
      const token = localStorage.getItem("jwt_token");
      console.log(
        token,
        "IM FROM TOKEN useCONTEXT IM FROM TOKEN useCONTEXT IM FROM TOKEN useCONTEXT IM FROM TOKEN useCONTEXT"
      );
      if (token) {
        axios
          .post("http://localhost:8000/auth/verifyToken", {
            //finish api post endpoint for verification of token
            jwt_token: token,
          })
          .then(function (response) {
            console.log(response, "HI IM FROM RESPONSE IF STATEMENT IN APP JS");
            setUser({
              email: response.data.email,
              role: response.data.role,
              user_id: response.data.user_id,
            });
          })
          .catch(function (error) {
            console.log(
              error,
              "HI IM FROM ERROR RESPONSE IF STATEMENT IN APP JS"
            );
            console.log("Not logged in");
          })
          .finally(() => {
            setIsLoading(false); // Set loading to false when the verification is complete
          });
      } else {
        setIsLoading(false); // If there's no token, set loading to false
      }
    } else {
      setIsLoading(false);
    } // If the user is already defined, set loading to false
  }, [user]);

  if (isLoading) {
    return <div>LOADING......</div>;
  }
  return (
    <div className="App">
      {/* {console.log(user, "HI IM USER FROM APP JS SETSTATE")} */}
      <div className="h-[30px] bg-red-800">{auth?.user?.email}</div>
      <div className="h-[30px] bg-red-800">{auth?.user?.role}</div>
      {/* for testing and seeing if user is logged in */}
      <ToastContainer />
      <Routes>
        <Route
          path="/AdminPage"
          element={
            auth?.user?.role === "admin" ? (
              <AdminPage />
            ) : (
              <Navigate to="/Sign-up" />
            )
          }
        />
        <Route path="/" element={<HomePage />} />
        <Route path="/Business/:businessId" exact element={<BusinessPage />} />
        <Route path="/About" element={<AboutPage />} />
        <Route path="/Sign-up" element={<SignUp />} />
        <Route path="/LogIn" element={<LogIn />} />
        <Route
          path="/Create-Business"
          element={
            auth?.user ? <CreateBusiness /> : <Navigate to="/Sign-up" /> //first ?(optional chaining operator) to stop error, saying if undefined dont continue
          }
          // render={(props) => <CreateBusiness {...props} />}
          // element={<CreateBusiness />}
        />
        <Route path="/My-Business" element={<MyBusiness />} />
        {/* <Route path="/Create-Business" element={<Navigate to="/Sign-up" />} /> */}
        <Route path="/Search" element={<SearchPage />} />
      </Routes>
    </div>
  );
}

export default App;
