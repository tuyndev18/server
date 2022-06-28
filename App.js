import "dotenv/config";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { ErrorHandling } from "./Utils/ErrorHandling.js";
import ParentRoute from "./routes/ParentRoute.js";
import { createServer } from "http";
import ConnectDB from "./Config/ConnectDB.js";
import { client } from "./Config/ConnectRedis.js";
const app = express();
const server = createServer(app);

//CONNECT TO MONGODB
ConnectDB();

app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:3000", "http://localhost:3001"],
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/public", express.static("public"));

//Route configuration
ParentRoute(app);

//ERROR HANDLING
app.use(ErrorHandling);

//404 NOT FOUND
app.use("*", (req, res) => {
  res.status(404).json({ mess: "404 Not Found" });
});

//listen to server
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log("server is running");
});
