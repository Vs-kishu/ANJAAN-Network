const Postresolvers = require("./posts");
const UserResolvers = require("./users");
const postFeatures = require("./postFeatures");

module.exports = {
  Post: {
    likeCount: (parent) => parent.likes.length,
    commentCount: (parent) => parent.comments.length,
  },
  Query: { ...Postresolvers.Query },
  Mutation: {
    ...UserResolvers.Mutation,
    ...Postresolvers.Mutation,
    ...postFeatures.Mutation,
  },
};
