import React from "react";
import { Product } from "./components/products/products.model";

interface ContextType {
	productsInCart: Product[];
	setProductsInCart: React.Dispatch<React.SetStateAction<Product[]>>;
}

export const cartContext = React.createContext({} as ContextType);