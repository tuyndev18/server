import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    userName: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    roles: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Users = mongoose.model("Users", userSchema);
export default Users;
