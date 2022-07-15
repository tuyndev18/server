import mongoose from "mongoose";

const CustomerModel = new mongoose.Schema(
  {
    fullName: {
      type: String,
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    active: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Customers = mongoose.model("Customers", CustomerModel);
export default Customers;
