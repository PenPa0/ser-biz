import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
const Comments = (props) => {
  const [isHidden, setIsHidden] = useState(true);
  const auth = useContext(AuthContext);
  let menuRef = useRef();
  const handleDropdown = () => {
    setIsHidden(false);
  };
  const hideDropdown = () => {
    setIsHidden(true);
  };

  useEffect(() => {
    let handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsHidden(true);
        console.log(menuRef.current);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  return (
    <article class="p-6 mb-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      {console.log(auth.user, "HI IM AUTH USER AT COMMENTS")}
      <footer class="flex justify-between items-center mb-2">
        <div class="flex items-center">
          <p class="inline-flex items-center mr-3 text-sm text-neutral-200 dark:text-white">
            {/* <img
            class="mr-2 w-6 h-6 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt="Bonnie Green"
          /> */}
            {props.viewComment.user_email}
          </p>
          <p class="text-sm text-gray-600 dark:text-gray-400">
            <time pubdate datetime="2022-03-12" title="March 12th, 2022">
              {props.viewComment.created_at}
            </time>
          </p>
        </div>
        {auth?.user ? (
          <div>
            {isHidden ? (
              <button
                onClick={handleDropdown}
                id="dropdownCommentButton"
                data-dropdown-toggle="dropdownComment"
                class="inline-flex items-center p-2 text-sm font-medium text-center text-gray-400 bg-white rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-50 dark:bg-gray-900 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
              >
                <svg
                  class="w-5 h-5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z"></path>
                </svg>
                <span class="sr-only">Comment settings</span>
              </button>
            ) : (
              /* <!-- Dropdown menu --> */

              <div
                ref={menuRef}
                id="dropdownComment"
                class="{}hidden z-10 w-36 bg-white rounded divide-y divide-gray-100 shadow dark:bg-gray-700 dark:divide-gray-600"
              >
                <ul
                  class="py-1 text-sm text-gray-700 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconHorizontalButton"
                >
                  {auth.user.user_id === props.viewComment.user_id && ( //&& means if Condition is true Render my block, if its false render nothing.
                    <>
                      <li>
                        <a
                          onClick={hideDropdown}
                          //   href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Edit
                        </a>
                      </li>
                      <li>
                        <a
                          //   href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Remove
                        </a>
                      </li>
                    </>
                  )}
                  <li>
                    <a
                      //   href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Report
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </footer>
      <p class="text-gray-500 dark:text-gray-400">
        {props.viewComment.comment}
      </p>
      <div class="flex items-center mt-4 space-x-4">
        <button
          type="button"
          class="flex items-center text-sm text-gray-500 hover:underline dark:text-gray-400"
        >
          <svg
            aria-hidden="true"
            class="mr-1 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
          Reply
        </button>
      </div>
    </article>
  );
};

export default Comments;
