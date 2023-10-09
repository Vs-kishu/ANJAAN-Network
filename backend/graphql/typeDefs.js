const { gql } = require("apollo-server");
module.exports = gql`
  type Post {
    id: ID!
    userName: String!
    body: String!
    comments: [Comment]!
    likes: [Like]!
    createdAt: String
    likeCount: Int!
    commentCount: Int!
  }
  type Comment {
    id: ID!
    createdAt: String!
    userName: String!
    body: String!
  }
  type Like {
    id: ID!
    createdAt: String!
    userName: String!
  }
  type savedPost {
    _id: ID!
  }
  type User {
    id: ID!
    userName: String!
    email: String!
    token: String!
    savedPosts: [savedPost]!
    createdAt: String!
  }
  input RegisterInput {
    userName: String!
    email: String!
    password: String!
    confirmPassword: String!
  }
  type Query {
    getPosts: [Post]!
    getPost(postID: ID!): Post!
    getUser(userName: ID!): User!
    getUserPosts(userName: String!): [Post]!
    getUserSavedPosts(userName: String!): User!
  }
  type Mutation {
    register(registerInput: RegisterInput): User!
    login(userName: String!, password: String!): User!
    createPost(body: String!): Post!
    deletePost(postID: ID!): String!
    createComment(postID: ID!, body: String!): Post!
    deleteComment(postID: ID!, commentID: ID!): String!
    likePost(postID: ID!): Post!
    savePost(postID: ID!): Post!
  }
`;
