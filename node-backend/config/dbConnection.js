import mongoose from "mongoose";

const dbConnection = async () => {
  try {
    const connected = await mongoose.connect(process.env.MONGO_DOCKER_URI);
    console.log(`MongoDB connected ${connected.connection.host}`);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default dbConnection;
