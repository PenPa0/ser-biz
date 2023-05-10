import "./App.css";
// import SanityTest from "./components/SanityTest";
import HomePage from "./pages/HomePage";
// import Navbar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";
import BusinessPage from "./pages/BusinessPage";
import { Route, Routes, Navigate } from "react-router-dom";
import SignUp from "./pages/SignUp";
import LogIn from "./pages/LogIn";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateBusiness from "./pages/CreateBusiness";
import { AuthProvider, AuthContext } from "./contexts/AuthContext";
import { useContext } from "react";

function App() {
  const auth = useContext(AuthContext);
  return (
    <div className="App">
      <div className="h-[30px] bg-red-800">{auth?.user}</div>{" "}
      {/* for testing and seeing if user is logged in */}
      <ToastContainer />
      {/* <h1>SANITY TEST</h1> */}
      {/* <SanityTest /> */}
      {/* <HomePage/> */}
      {/* <img src="./SerBizNavLogo.png" className="App-logo" alt="logo" /> */}
      {/* <HomePage /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Business" element={<BusinessPage />} />
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
        {/* <Route path="/Create-Business" element={<Navigate to="/Sign-up" />} /> */}
      </Routes>
      {/* <HomePageLoggedIn /> */}
      {/* <AboutPage /> */}
      {/* <BusinessPage /> */}
    </div>
  );
}

export default App;
