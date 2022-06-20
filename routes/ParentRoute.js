import express from "express";
const Router = express.Router();

import uploadRoute from "./UploadRoute.js";
import ProductRoute from "./ProductRoute.js";

export default function ParentRoute(app) {
  Router.use("/products", ProductRoute);
  Router.use("/uploads", uploadRoute);
  app.use("/api/v1", Router);
}
