import jwt from "jsonwebtoken";
import { client } from "../Config/ConnectRedis.js";

const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization");
    const current_token = await client.get("current_token");
    if (!token) {
      return res.status(401).json({ message: "Invalid Authentication" });
    }
    if (!current_token || current_token !== token) {
      return res.status(401).json({ message: "Authorization not valid" });
    }
    next();
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export default auth;
