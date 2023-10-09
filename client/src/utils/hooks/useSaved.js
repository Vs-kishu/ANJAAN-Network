import { useQuery } from "@apollo/client";
import { GET_USER } from "../../graphql/queries";

// Define your custom hook
export function useSaved(userName) {
  const { loading, error, data } = useQuery(GET_USER, {
    variables: { userName },
  });

  return {
    loading,
    error,
    data: data ? data.getUser.savedPosts : null,
  };
}
