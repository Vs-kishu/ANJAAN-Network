import { gql, useMutation } from "@apollo/client";
import Avatar from "@mui/material/Avatar";
import { pink } from "@mui/material/colors";
import moment from "moment";
import { BiSolidLike } from "react-icons/bi";
import { TfiCommentsSmiley } from "react-icons/tfi";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { GET_POSTS, GET_USER } from "../graphql/queries";
import CommentForm from "./CommentForm";
import { useState } from "react";
import LikesCard from "./LikesCard";
import { BsBookmarkStar, BsBookmarkStarFill } from "react-icons/bs";
import { useSaved } from "../utils/hooks/useSaved";

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

  const { data } = useSaved(user?.userName);

  const [likePost, { loading: liking }] = useMutation(LIKE_POST, {
    variables: { postID: id },
    refetchQueries: [GET_POSTS, "getPosts"],
  });

  const [deletePost, { loading: deleting }] = useMutation(DELETE_POST, {
    variables: { postID: id },
    refetchQueries: [GET_POSTS, "getPosts"],
  });

  const [savepost, { loading: saving }] = useMutation(SAVE_POST, {
    variables: { postID: id },
    refetchQueries: [GET_USER, "getUser"],
  });

  const handleLike = () => {
    likePost();
  };
  const alreadyLiked = likes?.find((like) => like.userName === user?.userName);
  const alreadySaved = data?.find((post) => post._id === id);
  return (
    <div
      className={`${styles} relative font-kalam w-full  sm:w-96  p-5 flex flex-col items-center  rounded-lg shadow-sm shadow-black hover:scale-10 border border-gray-400`}
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
        {userName?.toUpperCase().split(" ")[0]?.split("")[0]}
        {userName?.toUpperCase().split(" ")[1]?.split("")[0]}
      </Avatar>
      <p className="mt-14 text-xl text-pink-900 p-4 ">{body}</p>
      <p className="absolute top-5 right-5">{moment(createdAt).fromNow()}</p>
      <hr />
      <div className="relative flex gap-10 bg-gradient-to-r from-pink-200 to-pink-300 rounded-lg w-full justify-center py-2">
        <div className=" flex  items-center gap-4">
          <BiSolidLike
            className={`${
              alreadyLiked && "text-pink-700"
            } text-2xl hover:text-pink-700  cursor-pointer hover:scale-110
            ${liking && "animate-ping"}`}
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
        <div
          className={`text-xl text-pink-700 cursor-pointer ${
            saving && "animate-ping"
          }`}
          onClick={() => savepost()}
        >
          {alreadySaved ? <BsBookmarkStarFill /> : <BsBookmarkStar />}
        </div>

        <div className="absolute bottom-1 right-4">
          {user?.userName === userName && (
            <MdDelete
              className={`text-3xl hover:text-pink-950 cursor-pointer hover:scale-110 ${
                deleting && "animate-ping"
              }`}
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

const SAVE_POST = gql`
  mutation savePost($postID: ID!) {
    savePost(postID: $postID) {
      id
    }
  }
`;
