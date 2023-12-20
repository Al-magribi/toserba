import mongoose from "mongoose";

const connection = async (req, res) => {
  try {
    const connect = await mongoose.connect(process.env.MONGO_URI);

    console.log(`Connected to ${connect.connection.host}`);
  } catch (error) {
    console.error(`Error ${error.message}`);

    process.exit(1);
  }
};

export default connection;
