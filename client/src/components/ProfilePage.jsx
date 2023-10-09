import { useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { GET_USER } from "../graphql/queries";

const ProfilePage = () => {
  const { userName } = useParams();

  const [getUser, { data, loading, error }] = useLazyQuery(GET_USER);

  useEffect(() => {
    getUser({ variables: { userName } });
  }, [getUser, userName]);

  if (loading || !data) {
    return (
      <h1 className="text-8xl">
        {error ? error?.graphQLErrors[0].message : "laoding..."}
      </h1>
    );
  }
  console.log(data);

  const { email } = data.getUser;
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
    </div>
  );
};

export default ProfilePage;
