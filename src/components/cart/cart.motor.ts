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
					category: product.category,
					variantName: product?.variantName,
				});

		}
		return acc;
	}, [] as ProductsInCart[]);
	return productsGrouped;
};

export const calcTotal = (products: ProductsInCart[]) => {
	return products.reduce((acc, curr) => acc + curr.qty * curr.unit, 0);
}

export const isCartEmpty = (products: Product[]) => {
	return !(products.length > 0);
}

export const searchProductByIdInCart = (id: number, productsInCart: Product[]): Product => {
	return productsInCart.find((product) => product.id === id)!;
}

export const existsIDInCart = (id: number, productsInCart: Product[]): boolean => {
	return productsInCart.some((product) => product.id === id);
}

export const deleteProductFromCart = (id: number, productsInCart: Product[]): Product[] => {
	return productsInCart.filter((product) => product.id !== id);
}

export const countNumberOfSameProducts = (id: number, productsInCart: Product[]): number => {
	return productsInCart.filter((product) => product.id === id).length;
}

export const formattedDescription = (desc : string) => {
	const trimmedDesc = desc.length > 15 ? `${desc.substring(0, 15)}…` : desc;
	return trimmedDesc;
};