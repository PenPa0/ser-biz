import { useEffect, useState, useContext } from "react";
import FlowbiteFooter from "../components/FlowbiteFooter";
import Navbar from "../components/Navbar";
import { Footer } from "flowbite-react";
import { TbCalendarTime } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
import axios from "axios";
import BusinessComments from "../components/BusinessComments";
import { useParams } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const BusinessPage = () => {
  let { businessId } = useParams();
  const [business, setBusiness] = useState([]);
  const [photos, setPhotos] = useState([]);
  // const config = {
  //   headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` },
  // };

  const getBusiness = async () => {
    const response = await axios.get(`/get-business-public/${businessId}`);
    console.log(response, "IM FROM RESPONSE MEGGGGG");
    setBusiness(response.data);
  };
  const getPhotos = async () => {
    const response = await axios.get(`/get-picture-public/${businessId}`);
    setPhotos(response.data);
  };
  const getPhotoURL = (priorityNumber) => {
    const orderPriorityNumber = photos.find(
      ({ photo_priority }) => photo_priority === priorityNumber
    );
    return (
      orderPriorityNumber?.photo ||
      "https://peacemakersnetwork.org/wp-content/uploads/2019/09/placeholder.jpg"
    ); //safety measure incase user didnt upload a photo so it doesnt return undefined
  };

  useEffect(() => {
    getPhotos();
    getBusiness();
  }, []);

  return (
    <div>
      {/* {console.log(user[0]?.business_description, "WHERE AM I")} the ? is basically await */}
      <Navbar />
      {/* <FlowbiteFooter /> */}
      <div className="productLandingWrapper">
        <div className="productLandingViewContainer">
          <div
            // id="productLandingMainImage"
            // className="productLandingMainView"
            className="h-[377px] overflow-hidden"
          >
            <img
              className="w-[1201px] h-[377px] rounded-[16.5px] object-cover transition-transform duration-[0.5s] ease-[ease-in-out] origin-[0_0] hover:translate-y-[-30%] hover:scale-125"
              src={getPhotoURL(1)}
              alt=""
            />
          </div>
          <div className="productLandingSubContainer">
            <div className="productLandingDetailsView">
              <div>{business[0]?.business_description}</div>
              <p className="flex items-center">
                <TbCalendarTime className="mr-3" />
                Opening Hours:
              </p>
              <p>Mon-Sun, 9 am - 7 pm</p>
              <p>Contact Info:</p>
              <p>{business[0]?.business_contact}</p>
              <div className="flex items-center">
                <IoLocationSharp />
                {business[0]?.business_address}
              </div>

              {/* {JSON.stringify(user)} */}
              <p>{business[0]?.business_email}</p>
              {/* <button onClick={() => getUsers()}>HERERERER</button> */}
            </div>
            <div
            // id="productLandingLeftImage"
            // className="productLandingLeftView"
            >
              <img
                className=" w-[255px] h-[419px] object-cover"
                src={getPhotoURL(2)}
                alt=""
              />
            </div>
            <div
            // id="productLandingRightImage"
            // className="productLandingRightView"
            >
              <img
                className="w-[255px] h-[419px] rounded-tr-[16.5px] rounded-br-[16.5px] object-cover"
                src={getPhotoURL(3)}
                alt=""
              />
            </div>
          </div>
        </div>
      </div>
      <BusinessComments />
    </div>
  );
};

export default BusinessPage;
