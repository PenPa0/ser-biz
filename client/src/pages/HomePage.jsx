import Navbar from "../components/Navbar";
// import NavBarFlowbite from "./NavBarFlowbite";
import FlowbiteFooter from "../components/FlowbiteFooter";
import NewProduct from "../components/NewProduct";
import RandomProduct from "../components/RandomProduct";
import TrendingProduct from "../components/TrendingProduct";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import NavbarLoggedIn from "../components/NavbarLoggedIn";

const HomePage = () => {
  const auth = useContext(AuthContext);
  return (
    <div>
      {/* <NavBarFlowbite /> */}
      <Navbar />
      <NewProduct />
      <TrendingProduct />
      <RandomProduct />
      <FlowbiteFooter />
    </div>
  );
};

export default HomePage;
