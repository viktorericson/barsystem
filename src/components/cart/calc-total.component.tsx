import { Button, Paper, Typography } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { calcTotal, ccyFormat, groupProducts } from "./cart.motor";
import { Product } from "../products/products.model";
import classes from "./css/calc-total.module.css";
import { NavLink } from "react-router-dom";

interface calcTotalProps {
	productsInCart: Product[];
}

export const CalcTotal: React.FC<calcTotalProps> = (props) => {
	const { productsInCart } = props;
	const productsGrouped = groupProducts(productsInCart);
	const total = calcTotal(productsGrouped);

	const enableCartButton = () => {
		let cartButton;
		if (productsInCart.length > 0) {
			cartButton = (
				<Button component={NavLink} to={"/cart"} variant="contained" color="success">
					<ShoppingBasketIcon sx={{ mr: 2 }} />
					Place Order
				</Button>
			);
		} else {
			cartButton = (
				<Button component={NavLink} to={"/cart"} variant="contained" color="success" disabled>
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
