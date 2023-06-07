import express from "express";
import connect from "./database/mongodb.js";
import cors from "cors";
import bodyParser from "body-parser";
import TransactionRouters from "./routes/TransactionsApi.js";
import AuthApi from "./routes/AuthApi.js";

const PORT = 4000;
const app = express();

app.use(cors());
app.use(bodyParser.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/transaction", TransactionRouters);
app.use("/auth", AuthApi);

await connect();

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});
