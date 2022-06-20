import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UsersModal from "../models/UserModel.js";
import { client } from "../Config/ConnectRedis.js";
import NotificationsModel from "../models/ProductModel.js";


const authCtrl = {
  register: async (req, res, next) => {
    try {
      const { full_name, email, password } = req.body;
      const user = await UsersModal.findOne({ email: email });
      if (user) {
        return res.status(400).json({ message: "This email already exists" });
      }
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = await UsersModal.create({
        fullName: full_name,
        email: email,
        password: passwordHash,
      });
      const html = `Chúc mừng <span class="name_test">${newUser.fullName}</span>  đã chính thức gia nhập Fullstack.edu.vn. Và từ nay, hãy gọi mình là F8 nhé ❤️`;
      await NotificationsModel.create({
        userId: newUser._id,
        content: html,
      });
      res.json({ message: "Register success" });
    } catch (error) {
      next(error);
    }
  },

  login: async (req, res, next) => {
    try {
      const { email, password } = req.body;
      const user = await UsersModal.findOne({ email: email }).lean();
      if (!user)
        return res.status(400).json({ message: "This email doesn't exists" });

      //check decrypt password with non-decrypt
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Incorrect password" });

      //check all condition success , create ac_token, rf_token and send back to client
      const access_token = authCtrl.generateAccessToken(user._id);
      const refresh_token = authCtrl.generateRefreshToken(user._id);

      client.setEx(`rf_${user._id}`, 60 * 60 * 24 * 7, refresh_token);

      //attach rf_token to cookie.
      res.cookie("refresh_token", refresh_token, {
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 14),
        httpOnly: true,
        secure: false,
        sameSite: "strict",
      });

      const { password: passwordD, ...rest } = user;

      res
        .status(200)
        .json({
          data: { ...rest, access_token },
          message: "login successfully !",
        });
    } catch (error) {
      next(error);
    }
  },
  logOut: async (req, res, next) => {
    try {
      const refresh_token = req.cookies.refresh_token;
      const user = jwt.decode(refresh_token);
      await client.del(`rf_${user.userId}`);
      res.clearCookie("refresh_token");
      res.status(200).json({ message: "Logged out successfully!" });
    } catch (error) {
      next(error);
    }
  },
  requestRefreshToken: async (req, res, next) => {
    try {
      const refresh_token = req.cookies.refresh_token;
      if (!refresh_token)
        return res.status(401).json({ message: "Unauthenticated User" });
      const user = jwt.decode(refresh_token);
      const redis_rftoken = await client.get(`rf_${user.userId}`);
      if (!!redis_rftoken && redis_rftoken === refresh_token) {
        const newToken = authCtrl.generateAccessToken(user.userId);
        return res.json({ data: { access_token: newToken } });
      }
      return res.status(401).json({ message: "Refresh token has expired" });
    } catch (error) {
      next(error);
    }
  },
  generateAccessToken: (userId) => {
    return jwt.sign(
      {
        userId: userId,
      },
      process.env.GENERATE_AC_TOKEN,
      { expiresIn: "1d" }
    );
  },
  generateRefreshToken: (userId) => {
    return jwt.sign(
      {
        userId: userId,
      },
      process.env.GENERATE_RF_TOKEN,
      { expiresIn: "1m" }
    );
  },
};
export default authCtrl;
