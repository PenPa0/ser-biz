import { BsSearch } from "react-icons/bs";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div>
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
          {/* ABOUT ABOUT ABOUT */}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
