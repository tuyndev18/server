import mongoose from 'mongoose';

const BannerModel = new mongoose.Schema(
  {
    label: {
      type: String,
    },
    banner: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  },
);

const Banners = mongoose.model('Banners', BannerModel);
export default Banners;
