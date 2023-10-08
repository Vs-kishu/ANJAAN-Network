import { gql, useMutation } from "@apollo/client";
import Avatar from "@mui/material/Avatar";
import { pink } from "@mui/material/colors";
import moment from "moment";
import { BiSolidLike } from "react-icons/bi";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { GET_POSTS } from "../graphql/queries";
import CommentForm from "./CommentForm";
import { useState } from "react";
import LikesCard from "./LikesCard";

const PostCard = ({ post, styles }) => {
  const {
    body,
    createdAt,
    likes,
    likeCount,
    commentCount,
    comments,
    userName,
    id,
  } = post;
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useSelector((store) => store.user);
  const [openLike, setOpenLike] = useState(false);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postID: id },
    refetchQueries: [GET_POSTS, "getPosts"],
  });

  const [deletePost] = useMutation(DELETE_POST, {
    variables: { postID: id },
    refetchQueries: [GET_POSTS, "getPosts"],
  });
  const handleLike = () => {
    likePost();
  };
  const alreadyLiked = likes.find((like) => like.userName === user?.userName);
  console.log(alreadyLiked);
  return (
    <div
      className={`${styles} relative font-kalam w-full  sm:w-96 h-60 p-5 flex flex-col items-center  rounded-lg shadow-sm shadow-black hover:scale-10 border border-gray-400`}
    >
      <Avatar
        sx={{
          bgcolor: pink[900],
          color: "white",
          width: 50,
          height: 50,
          padding: "1rem",
          position: "absolute",
          top: 10,
          left: 10,
        }}
      >
        {userName.toUpperCase().split(" ")[0]?.split("")[0]}
        {userName?.toUpperCase().split(" ")[1]?.split("")[0]}
      </Avatar>
      <p className="mt-14 text-xl text-pink-900 ">{body}</p>
      <p className="absolute top-5 right-5">{moment(createdAt).fromNow()}</p>
      <hr />
      <div className="absolute bottom-0 flex gap-10 bg-gradient-to-r from-slate-50 to-pink-50 w-full justify-center py-2">
        <div className=" flex  items-center gap-4">
          <BiSolidLike
            className={`${
              alreadyLiked && "text-pink-700"
            } text-2xl hover:text-pink-700 cursor-pointer hover:scale-110`}
            onClick={handleLike}
          />{" "}
          <span
            className="cursor-pointer font-bold hover:scale-110"
            onClick={() => setOpenLike(true)}
          >
            {likeCount}
          </span>
          {openLike && <LikesCard props={{ likes, setOpenLike }} />}
        </div>

        <span className="flex items-center  gap-4">
          <TfiCommentsSmiley
            onClick={() => setIsOpen(true)}
            className="text-2xl cursor-pointer hover:scale-110"
          />{" "}
          {commentCount}
        </span>
        <div className="absolute bottom-1 right-4">
          {user?.userName === userName && (
            <MdDelete
              className="text-3xl hover:text-pink-950 cursor-pointer hover:scale-110"
              onClick={() => deletePost()}
            />
          )}
        </div>
      </div>

      {isOpen && <CommentForm props={{ comments, id, setIsOpen }} />}
    </div>
  );
};

export default PostCard;

const LIKE_POST = gql`
  mutation likePost($postID: ID!) {
    likePost(postID: $postID) {
      id
      likeCount
    }
  }
`;

const DELETE_POST = gql`
  mutation deletePost($postID: ID!) {
    deletePost(postID: $postID)
  }
`;
