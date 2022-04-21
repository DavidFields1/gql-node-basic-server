const { v4: uuidv4 } = require('uuid');

exports.Mutation = {
	addCategory: (parent, { input }, { db }) => {
		const newCategory = {
			id: uuidv4(),
			...input,
		};
		db.categories.push(newCategory);
		return newCategory;
	},

	addProduct: (parent, { input }, { db }) => {
		const newProduct = {
			id: uuidv4(),
			...input,
		};
		db.products.push(newProduct);
		return newProduct;
	},

	addReview: (parent, { input }, { db }) => {
		const newReview = {
			id: uuidv4(),
			...input,
		};
		db.reviews.push(newReview);
		return newReview;
	},

	deleteCategory: (parent, { id }, { db }) => {
		const categoryIndex = db.categories.findIndex(
			(category) => category.id === id
		);
		if (categoryIndex === -1) {
			return false;
		}
		db.categories = db.categories.filter((category) => category.id !== id);
		db.products = db.products.map((product) => {
			if (product.categoryId === id)
				return { ...product, categoryId: null };
			else return product;
		});
		return true;
	},

	deleteProduct: (parent, { id }, { db }) => {
		const productIndex = db.products.findIndex(
			(product) => product.id === id
		);
		if (productIndex === -1) {
			return false;
		}
		db.products = db.products.filter((product) => product.id !== id);
		db.reviews = db.reviews.filter((review) => review.productId !== id);
		return true;
	},

	deleteReview: (parent, { id }, { db }) => {
		const reviewIndex = db.reviews.findIndex((review) => review.id === id);
		if (reviewIndex === -1) {
			return false;
		}
		db.reviews = db.reviews.filter((review) => review.id !== id);
		return true;
	},

	updateCategory: (parent, { id, input }, { db }) => {
		const categoryIndex = db.categories.findIndex(
			(category) => category.id === id
		);
		if (categoryIndex === -1) {
			return null;
		}
		const updatedCategory = {
			...db.categories[categoryIndex],
			...input,
		};
		db.categories[categoryIndex] = updatedCategory;
		return updatedCategory;
	},

	updateProduct: (parent, { id, input }, { db }) => {
		const productIndex = db.products.findIndex(
			(product) => product.id === id
		);
		if (productIndex === -1) {
			return null;
		}
		const updatedProduct = {
			...db.products[productIndex],
			...input,
		};
		db.products[productIndex] = updatedProduct;
		return updatedProduct;
	},

	updateReview: (parent, { id, input }, { db }) => {
		const reviewIndex = db.reviews.findIndex((review) => review.id === id);
		if (reviewIndex === -1) {
			return null;
		}
		const updatedReview = {
			...db.reviews[reviewIndex],
			...input,
		};
		db.reviews[reviewIndex] = updatedReview;
		return updatedReview;
	},
};
