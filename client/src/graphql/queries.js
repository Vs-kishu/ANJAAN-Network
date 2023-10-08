import { gql } from "@apollo/client";

const GET_POSTS = gql`
  query {
    getPosts {
      id
      body
      userName
      createdAt
      likeCount
      commentCount
      likes {
        id
        userName
        createdAt
      }
      comments {
        id
        body
        userName
        createdAt
      }
    }
  }
`;
export { GET_POSTS };
