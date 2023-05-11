import { useState } from "react";
// import Select from "react-select";
// import Creatable, { useCreatable } from "react-select/creatable";
import CreatableSelect from "react-select/creatable";

const BusinessForm = () => {
  const [contacts, setContacts] = useState("");
  const numberHandler = (e) => {
    let value = e.target.value;
    const validatedValue = value.replace(/[^0-9]/g, "");
    setContacts(validatedValue);
  };

  // const style = {
  //   control: (base) => ({
  //     ...base,
  //     border: 0,
  //     // This line disable the blue border
  //     boxShadow: "none",
  //   }),
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
    <div className="border-2 mt-5">
      <form>
        <div className="flex flex-col gap-y-3 w-3/5 border-2 m-auto border-solid bg-slate-50">
          Please Provide information about your business.
          <label className="text-left" htmlFor="businessName">
            Business Name
          </label>
          <input
            id="businessName"
            type="text"
            placeholder="ex. Zee's Pizza Tree"
            className="pl-10 shadow-lg w-1/4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
          />
          <label className="text-left" htmlFor="businessTag">
            Business Tag
          </label>
          <CreatableSelect
            // styles={style}
            id="businessTag"
            className="shadow-lg w-1/2"
            isMulti
            options={options_business_types}
            // options={business_types}
            placeholder="Business Type"
          />
          <label className="text-left" htmlFor="businessAdress">
            Business Address
          </label>
          <input
            type="text"
            placeholder="business address"
            className="pl-10 w-1/4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
          />
          <label className="text-left" htmlFor="businessContacts">
            Business Contacts
          </label>
          <input
            id="businessContacts"
            value={contacts}
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
            id="businessSocials"
            type="text"
            placeholder="business socials"
            className="pl-10 w-1/4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
          />
          <label className="text-left" htmlFor="businessEmail">
            Business Email
          </label>
          <input
            id="businessEmail"
            type="email"
            placeholder="business email"
            className="pl-10 w-1/4 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
          />
          <label className="text-left" htmlFor="businessDescription">
            Business Description
          </label>
          <input className="w-1/2" type="file" />
          <input type="file" />
          <input type="file" />
          <textarea
            rows="5"
            placeholder="Describe your business"
            className="resize-none w-2/5 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
          ></textarea>
        </div>
      </form>
    </div>
  );
};

export default BusinessForm;
