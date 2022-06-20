import fs from "fs";

const UploadController = {
  single: async (req, res, next) => {
    try {
    } catch (error) {
      next(error);
    }
  },
  multiple: async (req, res, next) => {
    try {
      const data = req.files.map((image) => image.path.replaceAll("\\", "/"));
      res.json({ data });
    } catch (error) {
      next(error);
    }
  },
  delete: async (req, res, next) => {
    try {
        req.body.path.forEach(path => {
            fs.unlinkSync(path)
        } )
        res.json({ message: "delete path" });
    } catch (error) {
      next(error);
    }
  },
};
export default UploadController;
