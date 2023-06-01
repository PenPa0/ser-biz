import { useState, useContext, useEffect, useRef } from "react";
import { AuthContext } from "../contexts/AuthContext";
import axios from "axios";
import moment from "moment";

const Comments = (props) => {
  const [isHidden, setIsHidden] = useState(true);
  const [isEditing, setIsEditing] = useState(false);

  const [updateComment, setUpdateComment] = useState({
    comment: props.viewComment.comment,
    user_id: props.viewComment.user_id,
    comment_id: props.viewComment.comment_id,
  });
  const config = {
    headers: { Authorization: `Bearer ${localStorage.getItem("jwt_token")}` },
  };
  const auth = useContext(AuthContext);
  let menuRef = useRef();
  const handleDropdown = () => {
    setIsHidden(false);
  };
  const hideDropdown = () => {
    setIsHidden(true);
  };

  const editComment = async (e) => {
    e.preventDefault();
    console.log(e, "IM E FROM EDIT COMMENT FRONT END");
    const response = await axios.patch("/edit-comment", updateComment, config);
    console.log(response, "IM ReSPONSE FROM EDIT COMMENT FRONTEND");
  };

  useEffect(() => {
    let handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setIsHidden(true);
        setIsEditing(false);
        console.log(menuRef.current);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });
  const formatDate = props.viewComment.created_at;
  return (
    <article class="p-6 mb-6 text-base bg-white border-t border-gray-200 dark:border-gray-700 dark:bg-gray-900">
      {console.log(props.viewComment, "IM INSIDE VIEW COMMENT PROPS")}
      {console.log(auth.user, "HI IM AUTH USER AT COMMENTS")}
      <footer class="flex justify-between items-center mb-2">
        <div class="flex items-center">
          <p class="inline-flex items-center mr-3 text-sm text-white-50 dark:text-white">
            {/* <img
            class="mr-2 w-6 h-6 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-3.jpg"
            alt="Bonnie Green"
          /> */}

            {props.viewComment.user_email}
          </p>
          <p class="text-sm text-white-50 dark:text-gray-400">
            <time /*pubdate datetime="2022-03-12" title="March 12th, 2022"*/>
              {moment(new Date(formatDate)).format("lll")}
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
                  class="py-1 text-sm text-white-50 dark:text-gray-200"
                  aria-labelledby="dropdownMenuIconHorizontalButton"
                >
                  {auth.user.user_id === props.viewComment.user_id && ( //&& means if Condition is true Render my block, if its false render nothing.
                    <>
                      <li>
                        <p
                          onClick={() => {
                            setIsEditing(true);
                            // hideDropdown();
                          }}
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Edit
                        </p>
                      </li>
                      <li>
                        <p
                          //   href="#"
                          className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                          Remove
                        </p>
                      </li>
                    </>
                  )}
                  <li>
                    <p
                      //   href="#"
                      className="block py-2 px-4 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                      Report
                    </p>
                  </li>
                </ul>
              </div>
            )}
          </div>
        ) : (
          ""
        )}
      </footer>
      <>
        {isEditing === false ? (
          <p class="text-neutral-200 dark:text-gray-400">
            {props.viewComment.comment}
          </p>
        ) : (
          <form ref={menuRef} onSubmit={editComment} class="mb-6">
            <div class="py-2 px-4 mb-4 bg-white rounded-lg rounded-t-lg border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <label for="comment" class="sr-only">
                Your comment
              </label>
              <textarea
                defaultValue={props.viewComment.comment}
                // value={updateComment.comment}
                onChange={(e) => {
                  let value = e.target.value;
                  // console.log(value);

                  setUpdateComment({ ...updateComment, comment: value });
                  // console.log(updateComment, "IM UPDATE COMMENT ONCHANGE");
                }}
                id="comment"
                rows="6"
                class="px-0 w-full text-sm text-gray-900 border-0 focus:ring-0 focus:outline-none dark:text-white dark:placeholder-gray-400 dark:bg-gray-800"
                placeholder="Write a comment..."
                required
              ></textarea>
            </div>
            <button
              type="submit"
              class="text-white-50 bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300  font-medium rounded-lg text-xs px-4 py-2.5 text-center mr-2 mb-2"
            >
              Post comment
            </button>
          </form>
        )}
      </>
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
