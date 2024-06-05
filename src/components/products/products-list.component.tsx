import { Box, Grid, Paper, Typography } from "@mui/material";
import {
	filterProducts,
	returnCategoryName,
	searchProductById,
} from "./products.motor";
import { PRODUCTS } from "./products.model";
import { ProductCard } from "./product-card.component";
import classes from "./css/products-list.module.css";
import { BasicModal } from "./modal-add-product.component";
import React from "react";
import { cartContext } from "../../cartContext";

interface ProductsListProps {
	filter: string;
}

export const ProductsList: React.FC<ProductsListProps> = (props) => {
	const { filter } = props;
	const productsFiltered = filterProducts(PRODUCTS, filter);
	const categoryName = returnCategoryName(filter);

	const buildTitle = (categoryName: string) => {
		return <strong>{categoryName}</strong>;
	};

	const { productsInCart, setProductsInCart } = React.useContext(cartContext);

	const addToCart = (id: number) => {
		const productFinded = searchProductById(id);
		setProductsInCart([...productsInCart, productFinded]);
	};

	return (
		<Paper className={classes["products-container"]} elevation={3} square>
			<Box className={classes["title-container"]}>
				<Typography
					className={classes["products-title"]}
					variant="h6"
					component="h2"
				>
					Listing: {buildTitle(categoryName)}
				</Typography>
				<BasicModal />
			</Box>
			<Grid container spacing={2}>
				{productsFiltered.map((product, index) => (
					<Grid key={index} item xl={2} lg={3} md={4} sm={3} xs={6}>
						<ProductCard product={product} addToCart={addToCart} />
					</Grid>
				))}
			</Grid>
		</Paper>
	);
};
