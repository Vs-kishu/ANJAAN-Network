import { useQuery } from "@apollo/client";
import PostCard from "./PostCard";
import Shimmer from "./Shimmer";
import { MdOutlineAddCircle } from "react-icons/md";
import { IconButton, Tooltip } from "@mui/material";
import PostForm from "./PostForm";
import { useState } from "react";
import { GET_POSTS } from "../graphql/queries";
const Home = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data, loading } = useQuery(GET_POSTS);
  if (data?.getPosts?.length === 0 || loading) {
    return (
      <>
        <Shimmer />{" "}
        <div
          onClick={() => setIsOpen(true)}
          className="fixed bottom-20 cursor-pointer  right-5 smright-20"
        >
          {isOpen && <PostForm props={{ setIsOpen }} />}

          <Tooltip title="Add New Post" placement="top-start">
            <IconButton>
              <MdOutlineAddCircle className="text-6xl shadow-md shadow-black rounded-full sm:text-8xl  text-gray-500  " />
            </IconButton>
          </Tooltip>
        </div>
      </>
    );
  }
  return (
    <main className=" grid grid-flow-row place-items-center bg-pink-300  bg-opacity-25  w-full sm:w-[600px] h-[90vh] pt-5 mx-auto gap-3 overflow-y-scroll ">
      {data?.getPosts?.map((post, index) => (
        <PostCard
          key={post.id}
          post={post}
          styles={index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}
        />
      ))}
      {isOpen && <PostForm props={{ setIsOpen }} />}
      <div
        onClick={() => setIsOpen(true)}
        className="fixed bottom-20 cursor-pointer  right-5 smright-20"
      >
        <Tooltip title="Add New Post" placement="top-start">
          <IconButton>
            <MdOutlineAddCircle className="text-6xl shadow-md shadow-black rounded-full sm:text-8xl bg-pink-950  text-gray-100 hover:scale-110  " />
          </IconButton>
        </Tooltip>
      </div>
    </main>
  );
};

export default Home;
