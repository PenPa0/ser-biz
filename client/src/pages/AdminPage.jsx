import Comments from "../components/Comments";
const AdminPage = () => {
  return (
    <div className="bg-[url('/public/topography.png')] w-auto h-[500px]">
      <div className="text-neutral-50">.</div>
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Admin Dashboard
          </h1>
        </div>
      </header>
      <div
        id="BOX"
        className="text-lg bg-neutral-300 w-4/5 min-h-[600px] mx-auto mt-10 rounded-lg flex flex-wrap"
      >
        <Comments />
        <Comments />
        <Comments />
        <Comments />
        <Comments />
        <Comments />
        <Comments />
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
        {/* <div className="border-2 border-black">
          <div className="border-2 border-red-600 w-1/2 h-1/2 m-auto">
            <div>
              Wow The food here sucks massive bad vibes bro, juju is not on the
              beat
            </div>
            <div>
              <button
                type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                ACCEPT
              </button>
              <button
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                REJECT
              </button>
            </div>
            <div>
              Wow The food here sucks massive bad vibes bro, juju is not on the
              beat
            </div>
            <div>
              <button
                type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                ACCEPT
              </button>
              <button
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                REJECT
              </button>
            </div>
            <div>
              Wow The food here sucks massive bad vibes bro, juju is not on the
              beat
            </div>
            <div>
              <button
                type="button"
                class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800"
              >
                ACCEPT
              </button>
              <button
                type="button"
                class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
              >
                REJECT
              </button>
            </div>
          </div>
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
        {/* <ul class="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 dark:text-gray-400 sm:mt-0">
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">
              About
            </a>
          </li>
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#" class="mr-4 hover:underline md:mr-6">
              Licensing
            </a>
          </li>
          <li>
            <a href="#" class="hover:underline">
              Contact
            </a>
          </li>
        </ul> */}
      </footer>
    </div>
  );
};

export default AdminPage;
