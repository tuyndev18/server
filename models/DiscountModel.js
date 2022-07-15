import mongoose from 'mongoose';

const DiscountModel = new mongoose.Schema(
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

const Discounts = mongoose.model('Discounts', DiscountModel);
export default Discounts;
