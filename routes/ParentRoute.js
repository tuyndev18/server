import express from "express";
const Router = express.Router();

import uploadRoute from "./UploadRoute.js";
import ProductRoute from "./ProductRoute.js";
import CategoryRoute from "./CategoryRoute.js";
import FeedBackRoute from "./FeedBackRoute.js";
import BannerRoute from "./BannerRoute.js";
import DiscountRoute from "./DiscountRoute.js";
import AuthRoute from "./AuthRoute.js";
import SupportRoute from "./SupportRoute.js";
import PaletteRoute from "./PaletteRoute.js";
import CustomerRoute from "./CustomerRoute.js";
import AboutRoute from "./AboutRoute.js";
import InfoRoute from "./InfoRoute.js";

export default function ParentRoute(app) {
  Router.use("/auth", AuthRoute);
  Router.use("/categories", CategoryRoute);
  Router.use("/supports", SupportRoute);
  Router.use("/info", InfoRoute);
  Router.use("/abouts", AboutRoute);
  Router.use("/palette", PaletteRoute);
  Router.use("/discounts", DiscountRoute);
  Router.use("/customers", CustomerRoute);
  Router.use("/feedbacks", FeedBackRoute);
  Router.use("/banners", BannerRoute);
  Router.use("/products", ProductRoute);
  Router.use("/uploads", uploadRoute);
  app.use("/api/v1", Router);
}
