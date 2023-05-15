const Comments = () => {
  return (
    <div class="block max-w-sm rounded-lg bg-white bg-cover p-6 shadow-lg dark:bg-neutral-700">
      <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 text-white dark:text-neutral-50">
        Food Review
      </h5>
      <p class="mb-4 text-base text-neutral-600 text-white  dark:text-neutral-200">
        Some quick example text to build on the card title and make up the bulk
        of the card's content. Wow The food here sucks massive bad vibes bro,
        juju is not on the beat
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
    </div>
  );
};

export default Comments;
