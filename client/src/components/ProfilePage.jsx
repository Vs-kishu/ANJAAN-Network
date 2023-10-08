import { gql, useLazyQuery } from "@apollo/client";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { userName } = useParams();

  const [getUser, { data, loading, error }] = useLazyQuery(GET_USER);
  console.log();

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

  const { email } = data.getUser;
  return (
    <div>
      {userName}
      {email}
    </div>
  );
};

export default ProfilePage;

const GET_USER = gql`
  query getUser($userName: ID!) {
    getUser(userName: $userName) {
      id
      userName
      email
    }
  }
`;
