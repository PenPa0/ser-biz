import { useEffect, useState } from "react";
import axios from "axios";

const PendingComment = () => {
  const [commentList, setCommentList] = useState([]);

  const getComments = async () => {
    const response = await axios.get("/get-all-comments");
    // console.log(response.data.rows, "RESPONSE DATA.ROWS AKO PARE SA COMMENTS");
    // console.log(response.data, "RESSPONSE DATA ONLY AKO PARE SA COMMENTS");
    // console.log(response.data.rows[0], "RESPONSE AKO PARE SA COMMENTS");
    setCommentList(response.data.rows);
    // commentList.map(comments);
  };

  const superviseComment = async (e, status) => {
    // console.log(e, "LEMON LEMON USE LEMON LEMME JUST");
    const statusOBJ = { status: status };
    const response = await axios.patch(`/update-comment/${e}`, statusOBJ, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    });
    getComments();
  };

  useEffect(() => {
    getComments();
  }, []);
  return (
    <div className="flex flex-wrap">
      {commentList.map((comment) => {
        return (
          <div class="block m-auto h-[250px] border-2 max-w-sm rounded-lg bg-white bg-cover p-6 shadow-lg dark:bg-neutral-700">
            {/* <p className="border-2 border-yellow-500"></p>; */}
            {/* {console.log(comment, "TEST IM COMMETNS INSIDE DIV DIV")} */}
            {/* // console.log(
              //   comment.comment,
              //   "OMMENTERCOMMENTERCOMMENTERCOMMENTERCOMMENTERCOMMENTER"
              // ); */}
            <h5 class="mb-2 text-xl font-medium leading-tight text-neutral-800 text-white dark:text-neutral-50">
              User {comment.user_id} reviews Business {comment.business_id}
            </h5>
            <p class="mb-4 text-base text-neutral-600 text-white  dark:text-neutral-200 h-[125px] overflow-y-auto">
              {comment.comment}
            </p>
            <button
              onClick={() => {
                superviseComment(comment.comment_id, "approved");
              }}
              type="button"
              class="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-black  transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-green-500 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              data-te-ripple-init
            >
              Accept
            </button>
            <button
              onClick={() => {
                superviseComment(comment.comment_id, "rejected");
              }}
              type="button"
              class="inline-block rounded border-2 border-neutral-50 px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-black transition duration-150 ease-in-out hover:border-neutral-100 hover:bg-red-700 hover:text-neutral-100 focus:border-neutral-100 focus:text-neutral-100 focus:outline-none focus:ring-0 active:border-neutral-200 active:text-neutral-200 dark:hover:bg-neutral-100 dark:hover:bg-opacity-10"
              data-te-ripple-init
            >
              Reject
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PendingComment;
