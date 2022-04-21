exports.Category = {
	products: (parent, { filter }, { db }) => {
		let filteredProducts = db.products;
		filteredProducts = filteredProducts.filter(
			(product) => product.categoryId === parent.id
		);
		if (filter) {
			if (filter.onSale === true) {
				filteredProducts = filteredProducts.filter(
					(product) => product.onSale
				);
			}
		}
		return filteredProducts;
	},
};
