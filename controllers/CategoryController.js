const CategoryController = {
	addComment: async (req, res, next) => {
		try {

			res.status(201).json(data);
		} catch (error) {
			next(error);
		}
	},
};

export default CategoryController;
