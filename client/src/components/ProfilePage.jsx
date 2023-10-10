import { gql, useLazyQuery } from "@apollo/client";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { GET_POSTS, GET_USER } from "../graphql/queries";
import PostCard from "./PostCard";

const ProfilePage = () => {
  const { userName } = useParams();
  const [savedPost, setSavedPost] = useState([]);
  const [isposts, setIsPosts] = useState(false);
  const [isSavedPosts, setIsSavedPosts] = useState(false);

  const [getUser, { data: user, loading: userLoading, error }] =
    useLazyQuery(GET_USER);

  const [getUserPosts, { data: userPosts, loading: userPostsLoading }] =
    useLazyQuery(GET_USER_POSTS, {
      variables: { userName },
      fetchPolicy: "no-cache",
      refetchQueries: [GET_POSTS, "getPosts"],
    });
  const [allPosts, { data: allPostsData, loading: allPostsLoading }] =
    useLazyQuery(GET_POSTS);

  useEffect(() => {
    getUser({ variables: { userName } });
    allPosts();
  }, [getUser, userName, allPosts]);

  const handleUserPost = () => {
    setIsSavedPosts(false);
    setIsPosts(true);
    getUserPosts();
  };

  if (userLoading || allPostsLoading || !user) {
    return (
      <h1 className="text-8xl">
        {error ? error?.graphQLErrors[0].message : "laoding..."}
      </h1>
    );
  }
  const { email, savedPosts } = user?.getUser || {};

  function filterSavedPosts() {
    setIsPosts(false);
    setIsSavedPosts(true);

    const savedPostIds = savedPosts?.map((post) => post._id);
    const savedPostArr = allPostsData?.getPosts.filter((post) =>
      savedPostIds?.includes(post.id)
    );
    setSavedPost(savedPostArr);
  }

  return (
    <div className="flex flex-col gap-8 items-center mt-8">
      <div className="w-52 h-52 rounded-full">
        <img
          className="w-full h-full rounded-full"
          src="https://img.freepik.com/free-vector/businessman-character-avatar-isolated_24877-60111.jpg?w=740&t=st=1696833121~exp=1696833721~hmac=30443a9147169fe8aa259d43df3a2e840c6536ea7465ee284012db9b98795afd"
          alt="profile"
        />
      </div>
      <div className="border-2 border-pink-950 rounded-lg w-full md:w-[600px] flex flex-col gap-8 p-5  ">
        <span>
          USERNAME:{" "}
          <span className="font-bold text-pink-950">
            {userName.toUpperCase()}
          </span>
        </span>
        <span>
          EMAIL:<span className="font-bold text-pink-950"> {email}</span>
        </span>

        <p>
          Description:
          <span className="text-xs font-medium">
            {" "}
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
            culpa qui officia deserunt mollit anim id est laborum.
          </span>
        </p>
      </div>
      <section className="w-full md:w-[600px] flex items-center justify-evenly">
        <span
          className={`${
            userPostsLoading && "animate-pulse"
          } text-bold cursor-pointer hover:scale-105 font-bold text-pink-950 bg-pink-300 w-full text-center p-4 rounded-xl border-2 border-pink-950 m-4 `}
          onClick={handleUserPost}
        >
          POSTS
        </span>
        <span
          onClick={filterSavedPosts}
          className={` text-bold cursor-pointer hover:scale-105 font-bold text-pink-950 bg-pink-300 w-full text-center p-4 rounded-xl border-2 border-pink-950 m-4 `}
        >
          SAVED
        </span>
      </section>
      {isposts ? (
        <div className="space-y-4">
          {userPosts?.getUserPosts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <h1></h1>
      )}
      {isSavedPosts ? (
        <div className="space-y-4">
          {savedPost &&
            savedPost?.map((post) => <PostCard key={post.id} post={post} />)}
        </div>
      ) : (
        <h1></h1>
      )}
    </div>
  );
};

export default ProfilePage;

const GET_USER_POSTS = gql`
  query ($userName: String!) {
    getUserPosts(userName: $userName) {
      id
      body
      userName
      likeCount
      commentCount
      comments {
        id
        body
        userName
        createdAt
      }
      likes {
        id
        userName
        createdAt
      }
      createdAt
    }
  }
`;
