import { Box, Grid, Paper, Typography } from "@mui/material";
import {
	filterProducts,
	returnCategoryName,
} from "./products.motor";
import { PRODUCTS } from "./products.model";
import { ProductCard } from "./product-card.component";
import classes from "./css/products-list.module.css";
import { BasicModal } from "./modal-add-product.component";
import React from "react";

interface ProductsListProps {
	filter: string;
}

export const ProductsList: React.FC<ProductsListProps> = (props) => {
	const { filter } = props;
	const productsFiltered = filterProducts(PRODUCTS, filter);
	const categoryName = <strong>{returnCategoryName(filter)}</strong>;

	return (
		<Paper className={classes["products-container"]} elevation={3} square>
			<Box className={classes["title-container"]}>
				<Typography
					className={classes["products-title"]}
					variant="h6"
					component="h2"
				>
					Listing: {categoryName}
				</Typography>
				<BasicModal />
			</Box>
			<Grid container spacing={2}>
				{productsFiltered.map((product, index) => (
					<Grid key={index} item xl={2} lg={3} md={4} sm={3} xs={6}>
						<ProductCard product={product}/>
					</Grid>
				))}
			</Grid>
		</Paper>
	);
};
