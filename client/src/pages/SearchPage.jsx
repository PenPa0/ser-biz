import Navbar from "../components/Navbar";
import SearchContent from "../components/SearchContent";
import { useState, useEffect } from "react";
import axios from "axios";

const SearchPage = () => {
  const [businesses, setBusinesses] = useState([]);
  const [filteredBusiness, setFilteredBusiness] = useState([]);
  const getBusinesses = async () => {
    const response = await axios.get("/all-businesses");
    console.log(response, "IM FROM SEARCH PAGE");
    setBusinesses(response.data);
    setFilteredBusiness(response.data);
    // setBusinesses(response.data.rows);
  };

  const searching = (e) => {
    let value = e;
    const filtered = businesses.filter((filteredBusiness) => {
      return (
        filteredBusiness.business_name.includes(value) ||
        filteredBusiness.business_type.includes(value)
      );
    });

    setFilteredBusiness(filtered);
    console.log(filtered, "HI IM FILTERED FROM SEARCHING");
  };
  useEffect(() => {
    getBusinesses();
  }, []);

  return (
    <div>
      <Navbar searching={searching} />
      <div className="mx-auto my-3 w-4/5 min-h-[90vh] rounded-lg border-2 bg-[url('/public/topography.png')]">
        {filteredBusiness.map((business) => {
          return <SearchContent business={business} />;
        })}
      </div>
    </div>
  );
};

export default SearchPage;
