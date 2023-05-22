import { useState, useEffect } from "react";
import { TbCalendarTime } from "react-icons/tb";
import { IoLocationSharp } from "react-icons/io5";
// import Select from "react-select";
// import Creatable, { useCreatable } from "react-select/creatable";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
const EditBusiness = (props) => {
  const navigate = useNavigate();
  const [registerBusiness, setRegisterBusiness] = useState({
    business_name: props.businessProps.business_name,
    business_type: props.businessProps.business_type,
    business_address: props.businessProps.business_address,
    business_contacts: props.businessProps.business_contact,
    business_socials: props.businessProps.business_socials,
    business_email: props.businessProps.business_email,
    business_description: props.businessProps.business_description,
    business_id: props.businessProps.business_id,
  });
  const [photos, setPhotos] = useState([]);
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` },
  };

  const getPhotos = async () => {
    const response = await axios.get(
      `/get-picture/${props.businessProps.business_id}`,
      config
    );
    setPhotos(response.data);
  };
  const numberHandler = (e) => {
    let value = e.target.value;
    console.log(value);
    const validatedValue = value.replace(/[^0-9]/g, "");
    console.log(validatedValue);
    setRegisterBusiness({
      ...registerBusiness,
      business_contacts: validatedValue,
    });
  };
  const getPhotoURL = (priorityNumber) => {
    const orderPriorityNumber = photos.find(
      ({ photo_priority }) => photo_priority === priorityNumber
    );
    return orderPriorityNumber?.photo || ""; //safety measure incase user didnt upload a photo so it doesnt return undefined
  };

  const updateBusiness = async (e) => {
    e.preventDefault();
    console.log(e);
    console.log(
      registerBusiness,
      "THIS IS REGISTER BUSINESS FROM UPDATE BUSIESSSS"
    );
    const response = await axios.put(
      `/update-business-info/${props.businessProps.business_id}`,
      registerBusiness,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
        },
      }
    );
    console.log(response);
    // navigate("/");
    // window.location.reload(false)
    toast.success("Successfully updated business", {
      position: "top-center",
      autoClose: 1500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const options_business_types = [
    { value: "restaurant", label: "Restaurant" },
    { value: "toy_shop", label: "Toy Shop" },
    { value: "pet_clinic", label: "Veterinary Clinic" },
    { value: "meat_shop", label: "Butcher's Shop" },
    { value: "hobby_shop", label: "Hobby Shop" },
    { value: "family_store", label: "Convenience Store" },
  ];
  useEffect(() => {
    getPhotos();
    updateBusiness();
  }, []);
  return (
    <div className="mt-10">
      {console.log(
        getPhotoURL(1),
        " HEY IM PHOTO HEY IM PHOTO HEY IM PHOTO HEY IM PHOTO "
      )}
      {/* <div className="border-2 rounded-lg bg-slate-50 w-2/3 min-h-[750px] m-auto">
        <h1 className="text-2xl mt-5">Edit your Business Information</h1>
        <div className="flex flex-col items-start">
          <div className="w-full h-1 my-4 bg-gray-500 border-0 rounded md:my-10"></div>
          <p className="ml-5">
            Business Name
            <span className="ml-3 border-2 p-2 text-xl">{`${props.businessProps.business_name}`}</span>
          </p>

          <div className="w-full h-1  my-4 bg-gray-500 border-0 rounded md:my-10"></div>
          <p className="ml-5">
            Business Type:
            <span className="ml-3 border-2 p-2 text-xl">{`${props.businessProps.business_type}`}</span>
          </p>
          <div className="w-full h-1  my-4 bg-gray-500 border-0 rounded md:my-10"></div>
          <p className="ml-5">
            Business Address:
            <span className="ml-3 border-2 p-2 text-xl">{`${props.businessProps.business_address}`}</span>
          </p>
          <div className="w-full h-1  my-4 bg-gray-500 border-0 rounded md:my-10"></div>
          <p className="ml-5">
            Business Contact:
            <span className="ml-3 border-2 p-2 text-xl">{`${props.businessProps.business_contact}`}</span>
          </p>
          <div className="w-full h-1  my-4 bg-gray-500 border-0 rounded md:my-10"></div>
          <p className="ml-5">
            Business Email:
            <span className="ml-3 border-2 p-2 text-xl">{`${props.businessProps.business_email}`}</span>
          </p>
          <div className="w-full h-1  my-4 bg-gray-500 border-0 rounded md:my-10"></div>
          <p className="ml-5">
            Business Description:
            <span className="ml-3 border-2 p-2 text-xl">{`${props.businessProps.business_description}`}</span>
          </p>
        </div>
      </div> */}
      <form onSubmit={updateBusiness}>
        <div className="flex flex-col gap-y-3 w-3/5 border-2 m-auto border-solid bg-slate-50 rounded-lg">
          <h1 className="text-2xl mt-5">Edit your Business Information</h1>
          <label className="text-left" htmlFor="businessName">
            Business Name
          </label>
          <input
            value={registerBusiness.business_name}
            onChange={(e) => {
              let value = e.target.value;

              setRegisterBusiness({
                ...registerBusiness,
                business_name: value,
              });
            }}
            id="businessName"
            type="text"
            placeholder="ex. Zee's Pizza Tree"
            className="pl-10 shadow-lg w-1/4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
          />
          <label className="text-left" htmlFor="businessTag">
            Business Tag
          </label>
          <CreatableSelect
            onChange={(e) => {
              // console.log(e, "I am creatable select");
              let value = e.label;

              setRegisterBusiness({
                ...registerBusiness,
                business_type: value,
              });
            }}
            // styles={style}
            id="businessTag"
            className="shadow-lg w-1/2"
            // isMulti
            options={options_business_types}
            placeholder="Business Type"
            // defaultInputValue={registerBusiness.business_type}
            // inputValue={registerBusiness.business_type}
          />
          <label className="text-left" htmlFor="businessAdress">
            Business Address
          </label>
          <input
            onChange={(e) => {
              let value = e.target.value;

              setRegisterBusiness({
                ...registerBusiness,
                business_address: value,
              });
            }}
            value={registerBusiness.business_address}
            type="text"
            placeholder="business address"
            className="pl-10 w-1/4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
          />
          <label className="text-left" htmlFor="businessContacts">
            Business Contact
          </label>
          <input
            value={registerBusiness.business_contacts}
            id="businessContacts"
            type="tel"
            placeholder="business contact"
            className="pl-10 w-1/4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
            onChange={(e) => {
              numberHandler(e);
            }}
          />
          <label className="text-left" htmlFor="businessSocials">
            Business Socials
          </label>
          <input
            value={registerBusiness.business_socials}
            onChange={(e) => {
              let value = e.target.value;

              setRegisterBusiness({
                ...registerBusiness,
                business_socials: value,
              });
            }}
            id="businessSocials"
            type="text"
            placeholder="business socials"
            className="pl-10 w-1/4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
          />
          <label className="text-left" htmlFor="businessEmail">
            Business Email
          </label>
          <input
            onChange={(e) => {
              let value = e.target.value;

              setRegisterBusiness({
                ...registerBusiness,
                business_email: value,
              });
            }}
            value={registerBusiness.business_email}
            id="businessEmail"
            type="email"
            placeholder="business email"
            className="pl-10 w-1/4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
          />
          <label className="text-left">Business Photos</label>
          <input
            id="thisIsFile"
            // value={registerBusiness.ded}
            className="w-1/2 border-gray-200 border-opacity-100 border-2 rounded-lg"
            type="file"
          />
          <input
            id="mainPhoto"
            // value={registerBusiness.photo_main_display}
            className="w-1/2 border-gray-200 border-opacity-100 border-2 rounded-lg"
            type="file"
          />
          <input
            // value={registerBusiness.photo_first_display}
            className="w-1/2 border-gray-200 border-opacity-100 border-2 rounded-lg"
            type="file"
          />
          <label className="text-left" htmlFor="businessDescription">
            Business Description
          </label>
          <textarea
            value={registerBusiness.business_description}
            onChange={(e) => {
              let value = e.target.value;

              setRegisterBusiness({
                ...registerBusiness,
                business_description: value,
              });
            }}
            rows="5"
            placeholder="Describe your business"
            className="resize-none w-2/5 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
          ></textarea>
          <button
            type="submit"
            class="w-1/6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
          >
            Confirm Edit
            <svg
              aria-hidden="true"
              class="w-5 h-5 ml-2 -mr-1"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
        </div>
      </form>
      {/*================================================================================================================*/}
      <div className=" w-full h-screen flex justify-center items-center">
        <div className="w-[1202px] h-[813px] grid gap-y-[15px]">
          <div
          // id="productLandingMainImage"
          // className=" w-[1201px] h-[377px] rounded-[16.5px]"
          >
            <img
              className=" w-[1201px] h-[377px] rounded-[16.5px] object-cover object-center"
              src={getPhotoURL(1)}
              alt=""
            />
          </div>
          <div className="w-[1201px] h-[419px] flex justify-between text-white-50">
            <div className="w-[660px] h-[419px] text-start text-[23px] bg-[url(../public/stardust.png)] p-[25px] rounded-tl-[16.5px] rounded-bl-[16.5px]">
              <div>{`${props.businessProps.business_description}`}</div>
              <p className="flex items-center">
                <TbCalendarTime className="mr-3" />
                Opening Hours:
              </p>
              <p>Mon-Sun, 9 am - 7 pm</p>
              <p>Contact Info:</p>
              <p>{`${props.businessProps.business_contact}`}</p>
              <div className="flex items-center">
                <IoLocationSharp />
                {`${props.businessProps.business_address}`}
              </div>

              <p>{`${props.businessProps.business_email}`}</p>
            </div>
            <div
            // id="productLandingLeftImage"
            // className="w-[255px] h-[419px]"
            >
              <img
                className="w-[255px] h-[419px] object-cover"
                src={getPhotoURL(2)}
                alt=""
              />
            </div>
            <div
            // id="productLandingRightImage"
            // className="w-[255px] h-[419px] rounded-tr-[16.5px] rounded-br-[16.5px]"
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
    </div>
  );
};

export default EditBusiness;
