import "./App.css";
// import SanityTest from "./components/SanityTest";
import HomePage from "./pages/HomePage";
// import Navbar from "./components/Navbar";
import AboutPage from "./pages/AboutPage";
import BusinessPage from "./pages/BusinessPage";
import { Route, Routes } from "react-router-dom";
function App() {
  return (
    <div className="App">
      {/* <h1>SANITY TEST</h1> */}
      {/* <SanityTest /> */}
      {/* <HomePage/> */}
      {/* <img src="./SerBizNavLogo.png" className="App-logo" alt="logo" /> */}
      {/* <HomePage /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Business" element={<BusinessPage />} />
        <Route path="/About" element={<AboutPage />} />
      </Routes>
      {/* <AboutPage /> */}
      {/* <BusinessPage /> */}
    </div>
  );
}

export default App;
