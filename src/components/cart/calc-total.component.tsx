import { Button, Paper, Typography } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { calcTotal, ccyFormat, groupProducts, isCartEmpty } from "./cart.motor";
import classes from "./css/calc-total.module.css";
import { NavLink } from "react-router-dom";
import React from "react";
import { cartContext } from "../../cartContext";

export const CalcTotal: React.FC = () => {
	const { productsInCart } = React.useContext(cartContext);
	const productsGrouped = groupProducts(productsInCart);
	const total = calcTotal(productsGrouped);

	const enableCartButton = () => {
		let cartButton;
		if (!isCartEmpty(productsInCart)) {
			cartButton = (
				<Button
					component={NavLink}
					to={"/cart"}
					variant="contained"
					color="success"
				>
					<ShoppingBasketIcon sx={{ mr: 2 }} />
					Place Order
				</Button>
			);
		} else {
			cartButton = (
				<Button
					component={NavLink}
					to={"/cart"}
					variant="contained"
					color="success"
					disabled
				>
					<ShoppingBasketIcon sx={{ mr: 2 }} />
					Place Order
				</Button>
			);
		}
		return cartButton;
	};

	return (
		<Paper className={classes["container-total"]} elevation={3} square>
			<Typography variant="body1" component="h2" className={classes["total-font"]}>
				Total: {ccyFormat(total)}€
			</Typography>
			{enableCartButton()}
		</Paper>
	);
};
