import PendingComment from "../components/PendingComment";
import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const AdminPage = () => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();

  const logOut = () => {
    auth.setUser();
    navigate("/");
  };
  return (
    <div className="bg-[url('/public/topography.png')] w-auto h-[500px]">
      <div className="h-[30px] bg-red-800">{auth.user?.user_email}</div>
      {console.log(auth, "AUTH KO DI MEGO")}
      <div className="text-neutral-50">.</div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 flex justify-between">
            Admin Dashboard
            <button
              onClick={logOut}
              className="text-white border-2 border-gray-300 hover:duration-500 hover:bg-red-700 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 mr-2 mb-2"
            >
              Sign Out
            </button>
          </h1>
        </div>
      </header>
      <div
        id="BOX"
        className="text-lg bg-neutral-300 w-4/5 min-h-[600px] mx-auto mt-10 rounded-lg"
      >
        <PendingComment />
        {/* <PendingComment />*/}
        {/* <div class="block max-w-sm rounded-lg bg-white bg-cover p-6 shadow-lg dark:bg-neutral-700">
          <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 text-white dark:text-neutral-50">
            Card title
          </h5>
          <p class="mb-4 text-base text-neutral-600 text-white  dark:text-neutral-200">
            Some quick example text to build on the card title and make up the
            bulk of the card's content. Wow The food here sucks massive bad
            vibes bro, juju is not on the beat
          </p>
          <button
            type="button"
            class="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-black  transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-green-500 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            data-te-ripple-init
          >
            Accept
          </button>
          <button
            type="button"
            class="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-red-700 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
            data-te-ripple-init
          >
            Reject
          </button>
        </div> */}
      </div>

      <footer class="fixed bottom-0 left-0 z-20 w-full p-4 bg-white border-t border-gray-200 shadow md:flex md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
        <span class="text-sm text-gray-500 sm:text-center dark:text-gray-400">
          © 2023{" "}
          <a href="https://flowbite.com/" class="hover:underline">
            Flowbite™
          </a>
          . All Rights Reserved.
        </span>
      </footer>
    </div>
  );
};

export default AdminPage;
