exports.Review = {
	product: (parent, args, { db }) => {
		return db.reviews.find((product) => reviews.productId === parent.id);
	},
};
