import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { client } from "../Config/ConnectRedis.js";
import UsersModal from "../models/UserModel.js";

const authCtrl = {
  login: async (req, res, next) => {
    try {
      const { userName, password } = req.body;
      //check decrypt password with non-decrypt
      const user = await UsersModal.findOne({ userName: userName }).lean();
      if (!user)
        return res
          .status(400)
          .json({ message: "Tên tài khoản không tồn tại !" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(400).json({ message: "Mật khẩu không đúng !" });

      const access_token = authCtrl.generateAccessToken(user._id);
      client.setEx("current_token", 60 * 60 * 24 * 5, access_token);
      res.status(200).json({
        data: { access_token },
        message: "login successfully !",
      });
    } catch (error) {
      next(error);
    }
  },
  logOut: async (req, res, next) => {
    try {
      await client.del("current_token");
      res.status(200).json({ message: "Logged out successfully!" });
    } catch (error) {
      next(error);
    }
  },
  changePassword: async (req, res, next) => {
    try {
      const { currentPass, newPass } = req.body;
      const user = await UsersModal.findOne({});
      const isMatch = await bcrypt.compare(currentPass, user.password);
      if (!isMatch) {
        return res.status(400).json({ message: "Mật khẩu cũ không đúng !" });
      }
      const hashPass = await bcrypt.hash(newPass, 10);
      await UsersModal.updateOne({ _id: user._id }, { password: hashPass });
      res.status(200).json({ message: "Đổi mật khẩu thành công!" });
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
      { expiresIn: "5d" }
    );
  },
};
export default authCtrl;
