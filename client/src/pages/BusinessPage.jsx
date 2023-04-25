import FlowbiteFooter from "../components/FlowbiteFooter";
import Navbar from "../components/Navbar";
import { Footer } from "flowbite-react";
import { TbCalendarTime } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";

const BusinessPage = () => {
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
              <div>
                <IoLocationSharp />
                Address here
              </div>

              <p>09493111934</p>
              <p>blahblah@gmail.com</p>
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
