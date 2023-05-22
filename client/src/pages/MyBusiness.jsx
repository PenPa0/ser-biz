import EditBusiness from "../components/EditBusiness";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";

const MyBusiness = () => {
  const auth = useContext(AuthContext);
  const [businesses, setBusinesses] = useState([]);
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` },
  };
  useEffect(() => {
    getBusinesses();
  }, []);

  const getBusinesses = async () => {
    // you can insert a config variable after the '/all-users' to make it only accessible to those who have JWT token
    const id = auth.user.user_id;
    const response = await axios.get(`/get-business/${id}`, config);
    // console.log(response, "Im from GET USERS IN MY BUSINESS");
    setBusinesses(response.data.rows);
    console.log(response.data.rows.length > 0);
  };
  return (
    <div>
      <Navbar />
      {businesses.map((business) => {
        return <EditBusiness businessProps={business} />;
      })}
      {/* <EditBusiness businessProps={users} /> */}
    </div>
  );
};

export default MyBusiness;
