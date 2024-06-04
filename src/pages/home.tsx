import { Container, Grid } from "@mui/material";
import { ProductsList } from "../components/products/products-list.component";
import React from "react";
import { CartList } from "../components/cart/cart-list.component";
import classes from "./css/home.module.css";
import { Product } from "../components/products/products.model";

interface MainContainerProps {
	filter: string;
	productsInCart: Product[];
	handleAddToCart: (id: number) => void;
	handleDeleteFromCart: (id: number) => void;
	handleSubtractQtyFromCart: (id: number) => void;
}

export const Home: React.FC<MainContainerProps> = (props) => {
	const {
		filter,
		productsInCart,
		handleAddToCart,
		handleDeleteFromCart,
		handleSubtractQtyFromCart,
	} = props;

	return (
		<Container maxWidth="xl" className={classes["main-container"]}>
			<Grid container spacing={1}>
				<Grid item xl={8} lg={7} md={6} sm={12}>
					<ProductsList filter={filter} addToCart={handleAddToCart} />
				</Grid>
				<Grid item xl={4} lg={5} md={6} className={classes["grid-items"]}>
					<CartList
						productsInCart={productsInCart}
						deleteProduct={handleDeleteFromCart}
						addToCart={handleAddToCart}
						subtractQty={handleSubtractQtyFromCart}
					/>
				</Grid>
			</Grid>
		</Container>
	);
};
