const bcrypt = require("bcrypt");
const User = require("../../models/user");
const { UserInputError } = require("apollo-server");
const jwt = require("jsonwebtoken");
const {
  validateRegisterInputs,
  validLoginInputs,
} = require("../../utils/validators");
require("dotenv").config();

function generateToken(user) {
  return jwt.sign(
    {
      id: user.id,
      email: user.email,
      userName: user.userName,
    },
    process.env.SECRET_KEY,
    { expiresIn: "1h" }
  );
}

module.exports = {
  Mutation: {
    async login(_, { userName, password }) {
      const { valid, errors } = validLoginInputs(userName, password);
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const user = await User.findOne({ userName });
      if (!user) {
        errors.general = "User not Found";
        throw new UserInputError("User not found", { errors });
      }

      const matchedPassword = await bcrypt.compare(password, user.password);
      if (!matchedPassword) {
        errors.general = "Invalid Credentials";
        throw new UserInputError("invalid credentials", { errors });
      }

      const token = generateToken(user);
      return {
        ...user._doc,
        id: user.id,
        token,
      };
    },

    async register(
      _,
      { registerInput: { userName, email, password, confirmPassword } }
    ) {
      const { errors, valid } = validateRegisterInputs(
        userName,
        email,
        password,
        confirmPassword
      );
      if (!valid) {
        throw new UserInputError("Errors", { errors });
      }

      const userFound = await User.findOne({ userName });
      if (userFound) {
        throw new Error("username already taken", {
          errors: {
            userName: "this username is taken",
          },
        });
      }
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        userName,
        email,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();
      const token = generateToken(res);
      return {
        ...res._doc,
        id: res.id,
        token,
      };
    },
  },
};
