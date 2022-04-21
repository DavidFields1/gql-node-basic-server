exports.Query = {
	products: (parent, { filter }, { db }) => {
		let filteredProducts = db.products;
		if (filter) {
			if (filter.onSale) {
				filteredProducts = filteredProducts.filter(
					(product) => product.onSale
				);
			}
			if (filter.averageRating) {
				filteredProducts = filteredProducts.filter((product) => {
					let sumRating = 0;
					let count = 0;
					db.reviews.forEach((review) => {
						if (review.productId === product.id) {
							sumRating += review.rating;
							count++;
						}
					});

					const averageRating = sumRating / count;
					return averageRating >= filter.averageRating;
				});
			}
		}
		return filteredProducts;
	},
	product: (parent, args, { db }) => {
		return db.products.find((product) => product.id === args.id);
	},
	categories: (parent, args, { db }) => db.categories,
	category: (parent, args, { db }) => {
		return db.categories.find((category) => category.id === args.id);
	},
};
