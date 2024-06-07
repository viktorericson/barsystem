import { IconButton, TableCell, TableRow, Typography } from "@mui/material";
import { ProductsInCart } from "./cart.model";
import { ccyFormat, priceRow, searchProductByIdInCart } from "./cart.motor";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React from "react";
import { cartContext } from "../../cartContext";
import { EditPriceModal } from "./edit-price-modal.component";
import classes from "./css/cart-item.module.css"

interface CartItemProps {
	productInfo: ProductsInCart;
}

export const CartItem: React.FC<CartItemProps> = (props) => {
	const { desc, qty, unit, id, category, variantName } = props.productInfo;
	const { productsInCart, setProductsInCart } = React.useContext(cartContext);

	const formattedDescription = () => {
		const trimmedDesc = desc.length > 15 ? `${desc.substring(0, 15)}…` : desc;
		return trimmedDesc;
	};

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
			<TableCell>
				<EditPriceModal productInfo={props.productInfo} />
				{formattedDescription()}
				<br></br>
				{(category === "custom" || id > 1000) && (
					<Typography
						component="p"
						variant="body2"
						className={classes["custom-label"]}
					>
						{" "}
						*Custom
					</Typography>
				)}
				{(variantName) && (
					<Typography
						component="p"
						variant="body2"
						className={classes["variant-label"]}
					>
						{"➜ "}
						{variantName}
					</Typography>
				)}
			</TableCell>
			<TableCell align="center">
				<IconButton onClick={() => subtractQtyFromCart(id)}>
					<RemoveCircleOutlineIcon className={classes.icon} />
				</IconButton>
				{qty}
				<IconButton onClick={() => addQtyToCart(id)}>
					<AddCircleOutlineIcon className={classes.icon} />
				</IconButton>
			</TableCell>
			<TableCell align="right">{ccyFormat(unit)}</TableCell>
			<TableCell align="right">{ccyFormat(priceRow(qty, unit))}</TableCell>
			<TableCell align="right">
				<IconButton onClick={() => deleteFromCart(id)}>
					<DeleteIcon className={classes["delete-icon"]} />
				</IconButton>
			</TableCell>
		</TableRow>
	);
};
