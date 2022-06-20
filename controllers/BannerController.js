const BannerController = {
    
  addComment: async (req, res, next) => {
    try {
      res.status(201).json(data);
    } catch (error) {
      next(error);
    }
  },
};

export default BannerController;
