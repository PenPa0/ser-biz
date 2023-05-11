import { useEffect, useState } from "react";
import FlowbiteFooter from "../components/FlowbiteFooter";
import Navbar from "../components/Navbar";
import { Footer } from "flowbite-react";
import { TbCalendarTime } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import axios from "axios";

const BusinessPage = () => {
  const [user, setUser] = useState([]);
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` },
  };

  const getUsers = async () => {
    const response = await axios.get("http://localhost:8000/all-users", config);
    setUser(response.data);
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div>
      <Navbar />
      {/* <FlowbiteFooter /> */}
      <div className="productLandingWrapper">
        <div className="productLandingViewContainer">
          <div
            id="productLandingMainImage"
            className="productLandingMainView"
          ></div>
          <div className="productLandingSubContainer">
            <div className="productLandingDetailsView">
              <div>Coffee Shop and Study Hub!</div>
              <p className="flex items-center">
                <TbCalendarTime className="mr-3" />
                Opening Hours:
              </p>
              <p>Mon-Sun, 9 am - 7 pm</p>
              <p>Contact Info:</p>
              <p>09321314106</p>
              <div className="flex items-center">
                <IoLocationSharp />
                Infront of CPU 3rd gate Jaro Iloilo City
              </div>

              {/* {JSON.stringify(user)} */}
              <p>notthereal@gmail.com</p>
              {/* <button onClick={() => getUsers()}>HERERERER</button> */}
            </div>
            <div
              id="productLandingLeftImage"
              className="productLandingLeftView"
            ></div>
            <div
              id="productLandingRightImage"
              className="productLandingRightView"
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusinessPage;
