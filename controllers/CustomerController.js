import CustomerModel from "../models/CustomerModel.js";
import { QueryMethod } from "../Utils/QueryMethod.js";
const CustomerController = {
  addCustomer: async (req, res, next) => {
    try {
      const { fullName, email, phone } = req.body;
      if (!/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
        return res.json({ message: "" });
      }
      const findEmail = await CustomerModel.findOne({ email });
      if (findEmail) {
        return res.json({ message: "" });
      }
      await CustomerModel.create({
        fullName,
        email,
        phone,
      });
      res.json({ message: "add new customers" });
    } catch (error) {
      next(error);
    }
  },

  getCustomer: async (req, res, next) => {
    try {
      const query = new QueryMethod(
        req.query,
        CustomerModel.find({ active: req.query.active })
      )
        .pagination()
        .sort();
      const page = await CustomerModel.find({ active: req.query.active });
      const data = await query.method;
      const pageCount = Math.ceil(page.length / req.query.limit);
      res.json({ data: { data, pageCount } });
    } catch (error) {
      next(error);
    }
  },
  editCustomer: async (req, res, next) => {
    try {
      await CustomerModel.updateOne({ _id: req.params.id }, req.body);
      res.json({ message: "edit customers" });
    } catch (error) {
      next(error);
    }
  },
  deleteCustomer: async (req, res, next) => {
    try {
      await CustomerModel.findOneAndDelete({ _id: req.params.id });
      res.json({ message: "delete customers" });
    } catch (error) {
      next(error);
    }
  },
};

export default CustomerController;
