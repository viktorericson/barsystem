import React from "react";
import { cartContext } from "../cartContext";


export const CartPage: React.FC = () => {
	const { productsInCart } = React.useContext(cartContext);
	return <h1>Cart</h1>;
};
