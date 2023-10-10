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

const GET_USER = gql`
  query getUser($userName: ID!) {
    getUser(userName: $userName) {
      id
      userName
      email
      savedPosts {
        _id
      }
    }
  }
`;

const GET_POST = gql`
  query ($postID: ID!) {
    getPost(postID: $postID) {
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
export { GET_POSTS, GET_USER, GET_POST };
