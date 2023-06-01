import express from "express";
import mongoose from "mongoose";

const PORT = 4000;
const app = express();

await mongoose.connect(
  "mongodb+srv://isnjb27:nayan1382@expensor.rmw9cqj.mongodb.net/?retryWrites=true&w=majority"
);
console.log("MongoDB connected");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
