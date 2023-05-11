import Navbar from "../components/Navbar";
import axios from "axios";
import { useState, useContext } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const LogIn = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [account_Info, setAccount_Info] = useState({});

  const verify = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/auth", account_Info)
      .then(function (response) {
        localStorage.setItem("jwt_token", response.data);
        console.log(response);
        toast.success(`Welcome Back ${account_Info.user_email}`, {
          position: "top-center",
          autoClose: 1000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        navigate("/");
        auth.setUser(account_Info.user_email);
      })
      .catch(function (error) {
        toast.error(`Email or password does not match. ${error.message}`);
        console.log(error);
      });
  };
  return (
    <div>
      <Navbar />
      <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
        <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden max-w-[1000px]">
          <div className="md:flex w-full">
            <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
              <div className="text-center mb-10">
                <h1 className="font-bold text-3xl text-gray-900">Log In</h1>
              </div>
              <form onSubmit={verify}>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <label className="text-xs font-semibold px-1">Email</label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-email-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        value={account_Info.user_email}
                        onChange={(e) => {
                          let value = e.target.value;

                          setAccount_Info({
                            ...account_Info,
                            user_email: value,
                          });
                        }}
                        type="email"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 text-black"
                        placeholder="johnsmith@example.com"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-12">
                    <label className="text-xs font-semibold px-1">
                      Password
                    </label>
                    <div className="flex">
                      <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                        <i className="mdi mdi-lock-outline text-gray-400 text-lg"></i>
                      </div>
                      <input
                        value={account_Info.password}
                        onChange={(e) => {
                          let value = e.target.value;

                          setAccount_Info({ ...account_Info, password: value });
                        }}
                        type="password"
                        className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500 text-black"
                        placeholder="************"
                      />
                    </div>
                  </div>
                </div>
                <div className="flex -mx-3">
                  <div className="w-full px-3 mb-5">
                    <button
                      type="submit"
                      className="text-white-50 block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                    >
                      Log In
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <div className="hidden md:block w-1/2 bg-zinc-300 py-10 px-10">
              <img src="SerBizMainLogo.png" alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
