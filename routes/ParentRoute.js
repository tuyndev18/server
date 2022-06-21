import express from "express";
const Router = express.Router();

import uploadRoute from "./UploadRoute.js";
import ProductRoute from "./ProductRoute.js";
import CategoryRoute from "./CategoryRoute.js";
import BannerRoute from "./BannerRoute.js";
import AuthRoute from "./AuthRoute.js";

export default function ParentRoute(app) {
  Router.use("/auth", AuthRoute);
  Router.use("/categories", CategoryRoute);
  Router.use("/banners", BannerRoute);
  Router.use("/products", ProductRoute);
  Router.use("/uploads", uploadRoute);
  app.use("/api/v1", Router);
}
