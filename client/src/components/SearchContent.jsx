import React from "react";

const SearchContent = (props) => {
  return (
    <div>
      <div className="flex flex-row">
        <div className="ml-32 mt-12 w-2/5 ">
          <img
            className="object-cover min-h-[45vh] rounded-lg"
            src={props.business.photo}
            alt=""
          />
        </div>
        <div className="ml-9 mt-24 text-white-50 border-2 w-2/5 h-80 rounded-lg bg-[url('/public/stardust.png')]">
          <p>Business name:{props.business.business_name}</p>
          <p>Category:{props.business.business_type}</p>
          <p>Description:{props.business.business_description}</p>
          <p>Location:{props.business.business_address}</p>
        </div>
      </div>
    </div>
  );
};

export default SearchContent;
