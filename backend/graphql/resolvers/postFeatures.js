const Post = require("../../models/post");
const User = require("../../models/user");

const checkAuth = require("../../utils/checkAuth");
const { UserInputError, AuthenticationError } = require("apollo-server");

module.exports = {
  Mutation: {
    async createComment(_, { postID, body }, context) {
      const { userName } = checkAuth(context);

      if (body.trim() === "") {
        throw new UserInputError("Empty content not allowed", {
          errors: {
            body: "Commnet body must not be empty",
          },
        });
      }

      const post = await Post.findById(postID);

      if (post) {
        post.comments.unshift({
          body,
          userName,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError("post not found");
    },
    async deleteComment(_, { postID, commentID }, context) {
      const { userName } = checkAuth(context);

      const post = await Post.findById(postID);
      if (post) {
        const commentIndex = post.comments.findIndex((c) => c.id === commentID);
        if (
          post.userName === userName ||
          post.comments[commentIndex].userName
        ) {
          post.comments.splice(commentIndex, 1);
          await post.save();
          return "Comment deleted";
        } else {
          throw new AuthenticationError("action not allowed");
        }
      } else throw new UserInputError("post not found");
    },
    async likePost(_, { postID }, context) {
      const { userName } = checkAuth(context);

      const post = await Post.findById(postID);
      if (post) {
        const alreadyLiked = post.likes.findIndex(
          (like) => like.userName === userName
        );
        if (alreadyLiked) {
          post.likes.unshift({
            userName,
            createdAt: new Date().toISOString(),
          });
        } else {
          post.likes.splice(alreadyLiked, 1);
        }
        await post.save();
        return post;
      } else throw new UserInputError("post not found");
    },
    async savePost(_, { postID }, context) {
      const { userName } = checkAuth(context);

      try {
        const userData = await User.findOne({ userName });
        const postIndex = userData?.savedPosts.findIndex((savedPost) =>
          savedPost.equals(postID)
        );

        console.log(postIndex);
        if (postIndex) {
          console.log("post");
          userData.savedPosts.push(postID);
        } else {
          console.log("not here");
          userData.savedPosts.splice(postIndex, 1);
        }
        await userData.save();
        return userData;
      } catch (error) {
        console.log("err");
      }
    },
  },
};
