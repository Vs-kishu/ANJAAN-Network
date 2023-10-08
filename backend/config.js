const { default: mongoose } = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("🛍️  DataBase is Here");
  } catch (error) {
    console.log(error);
    console.log("error while connecting to database");
  }
};

module.exports = { connectDb };
