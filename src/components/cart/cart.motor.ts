import { Product } from "../products/products.model";
import { ProductsInCart } from "./cart.model";

export function ccyFormat(num: number) {
	return `${num.toFixed(2)}`;
}

export function priceRow(qty: number, unit: number) {
	return qty * unit;
}

export const groupProducts = (products: Product[]): ProductsInCart[] => {
	const productsGrouped = products.reduce((acc, product) => {
		const found = acc.find((item) => item.id === product.id);
		if (found) {
			found.qty += 1;
		} else {
			acc.push({
				desc: product.name,
				qty: 1,
				unit: product.price,
				id: product.id,
			});
		}
		return acc;
	}, [] as ProductsInCart[]);
	return productsGrouped;
};

export const calcTotal = (products: ProductsInCart[]) => {
	return products.reduce((acc, curr) => acc + curr.qty * curr.unit, 0);
}