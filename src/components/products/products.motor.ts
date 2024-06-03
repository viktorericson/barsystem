import { CATEGORIES, Product } from "./products.model";

export const filterProducts = (productList:Product[], category: string): Product[] => {
	if(category === CATEGORIES.ALL) {
		return productList;
	}
	
	const productsFiltered = productList.filter((product: Product) => {
		if (product.category === category) {
			return product;
		}
	});
	return productsFiltered;
};

export const returnCategoryName = (filter: string): string => {
	switch(filter) {
		case "all":
			return "All Products";
		case "hot_drinks":
			return "Hot Drinks";
		case "pastries":
			return "Pastries";
		default:
			return "All Products";
	}
}