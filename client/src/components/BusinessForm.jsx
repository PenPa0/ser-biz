import { useState } from "react";
// import Select from "react-select";
// import Creatable, { useCreatable } from "react-select/creatable";
import CreatableSelect from "react-select/creatable";
import axios from "axios";
import { useNavigate } from "react-router-dom";
const BusinessForm = () => {
  const navigate = useNavigate();
  const [registerBusiness, setRegisterBusiness] = useState({});
  const [isUploading, setIsUploading] = useState(false);
  const [photoMain, setPhotoMain] = useState();
  const [photoSecond, setPhotoSecond] = useState();
  const [photoThird, setPhotoThird] = useState();

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

  const uploadPhoto = async (file) => {
    //FormData is used when sending files to the backend so the endpoint can read it
    const formData = new FormData();
    formData.append("file", file);
    //uploading to cloudinary

    const response = await axios.post(
      "http://localhost:8000/upload-picture",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );

    console.log(response.data.url);
    return response.data.url;
  };

  console.log(registerBusiness, "this is from business form");
  const uploadSet = async (businessId) => {
    if (photoMain) {
      const mainURL = await uploadPhoto(photoMain);
      console.log(mainURL, "HELLO I AM MAIN");
      axios.post(
        "http://localhost:8000/create-picture",
        {
          photo: mainURL,
          business_id: businessId,
          photo_priority: 1,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
    }
    if (photoSecond) {
      const secondURL = await uploadPhoto(photoSecond);
      console.log(secondURL, "HELLO I AM SECOND URL");
      axios.post(
        "http://localhost:8000/create-picture",
        {
          photo: secondURL,
          business_id: businessId,
          photo_priority: 2,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
    }
    if (photoThird) {
      const thirdURL = await uploadPhoto(photoThird);
      axios.post(
        "http://localhost:8000/create-picture",
        {
          photo: thirdURL,
          business_id: businessId,
          photo_priority: 3,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
          },
        }
      );
    }
  };

  const addBusiness = async (e) => {
    e.preventDefault();
    setIsUploading(true);
    const response = await axios.post("/add-business", registerBusiness, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    });
    localStorage.setItem("businessId", response.data.businessId);

    setRegisterBusiness({
      ...registerBusiness,
      businessId: response.data.businessId,
    });
    await uploadSet(response.data.businessId);
    navigate("/");
  };
  // const addBusiness = (e) => {
  //   e.preventDefault();
  //   console.log(registerBusiness);
  // };
  const options_business_types = [
    { value: "restaurant", label: "Restaurant" },
    { value: "toy_shop", label: "Toy Shop" },
    { value: "pet_clinic", label: "Veterinary Clinic" },
    { value: "meat_shop", label: "Butcher's Shop" },
    { value: "hobby_shop", label: "Hobby Shop" },
    { value: "family_store", label: "Convenience Store" },
  ];
  return (
    <div className="mt-5">
      <form onSubmit={addBusiness}>
        <div className="flex flex-col gap-y-3 w-3/5 border-2 m-auto border-solid bg-slate-50">
          Please Provide information about your business.
          <label className="text-left" htmlFor="businessName">
            Business Name
          </label>
          <input
            onChange={(e) => {
              let value = e.target.value;

              setRegisterBusiness({
                ...registerBusiness,
                business_name: value,
              });
            }}
            value={registerBusiness.business_name}
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
            // options={business_types}
            placeholder="Business Type"
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
            Business Contacts
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
            onChange={(e) => {
              let value = e.target.files[0];
              console.log(value, "I am Value of first photo");

              setPhotoMain(value);
            }}
            id="mainPhoto"
            className="w-1/2 border-gray-200 border-opacity-100 border-2 rounded-lg"
            type="file"
          />
          <input
            onChange={(e) => {
              let value = e.target.files[0];
              console.log(value, "I am Value of first photo");

              setPhotoSecond(value);
            }}
            id="secondPhoto"
            className="w-1/2 border-gray-200 border-opacity-100 border-2 rounded-lg"
            type="file"
          />
          <input
            id="thirdPhoto"
            onChange={(e) => {
              let value = e.target.files[0];
              console.log(value, "I am Value of first photo");

              setPhotoThird(value);
            }}
            className="w-1/2 border-gray-200 border-opacity-100 border-2 rounded-lg"
            type="file"
          />
          <label className="text-left" htmlFor="businessDescription">
            Business Description
          </label>
          <textarea
            onChange={(e) => {
              let value = e.target.value;

              setRegisterBusiness({
                ...registerBusiness,
                business_description: value,
              });
            }}
            value={registerBusiness.photo_second_display}
            rows="5"
            placeholder="Describe your business"
            className="resize-none w-2/5 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
          ></textarea>
          {/* <button type="submit">TESTSETS</button> */}
          <button
            type="submit"
            disabled={isUploading}
            class="w-1/6 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center "
          >
            Create Business
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
    </div>
  );
};

export default BusinessForm;
