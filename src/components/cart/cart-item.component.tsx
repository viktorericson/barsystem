import { IconButton, TableCell, TableRow } from "@mui/material";
import { ProductsInCart } from "./cart.model";
import { ccyFormat, priceRow } from "./cart.motor";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React from "react";
import { cartContext } from "../../cartContext";
import { searchProductByIdInCart } from "../products/products.motor";

interface CartItemProps {
	productInfo: ProductsInCart;
}

export const CartItem: React.FC<CartItemProps> = (props) => {
	const { desc, qty, unit, id } = props.productInfo;
	const { productsInCart, setProductsInCart } = React.useContext(cartContext);
	
	const addQtyToCart = (id: number) => {
		const productFinded = searchProductByIdInCart(id, productsInCart);
		setProductsInCart([...productsInCart, productFinded]);
	};

	const subtractQtyFromCart = (id: number) => {
		const newProductsInCart = [...productsInCart];
		for (let i = newProductsInCart.length - 1; i >= 0; i--) {
			if (newProductsInCart[i].id === id) {
				newProductsInCart.splice(i, 1);
				break;
			}
		}
		setProductsInCart(newProductsInCart);
	};

	const deleteFromCart = (id: number) => {
		const newProductsInCart = productsInCart.filter((p) => p.id !== id);
		setProductsInCart(newProductsInCart);
	};

	return (
		<TableRow>
			<TableCell>{desc}</TableCell>
			<TableCell align="center">
				<IconButton onClick={() => subtractQtyFromCart(id)}>
					<RemoveCircleOutlineIcon sx={{fontSize:16}}/>
				</IconButton>
				{qty}
				<IconButton onClick={() => addQtyToCart(id)}>
					<AddCircleOutlineIcon sx={{fontSize:16}}/>
				</IconButton>
			</TableCell>
			<TableCell align="right">{ccyFormat(unit)}</TableCell>
			<TableCell align="right">{ccyFormat(priceRow(qty, unit))}</TableCell>
			<TableCell align="right">
				<IconButton onClick={() => deleteFromCart(id)}>
					<DeleteIcon sx={{fontSize:16, color:"#D32F2F"}}/>
				</IconButton>
			</TableCell>
		</TableRow>
	);
};
