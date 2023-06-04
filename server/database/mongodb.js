import mongoose from "mongoose";

async function connect() {
  await mongoose.connect(
    "mongodb+srv://isnjb27:nayan1382@expensor.rmw9cqj.mongodb.net/?retryWrites=true&w=majority"
  );
  console.log("MongoDB connected");
}

export default connect;