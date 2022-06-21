import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/Uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    cb(null, `image-${Date.now() * Math.ceil(Math.random() * 1000)}.${ext}`);
  },
});

export const upload = multer({ storage: storage });
