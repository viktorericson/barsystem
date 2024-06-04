import { Grid, Paper, Typography } from "@mui/material";
import { filterProducts, returnCategoryName } from "./products.motor";
import { PRODUCTS } from "./products.model";
import { ProductCard } from "./product-card.component";
import classes from "./css/products-list.module.css";

interface ProductsListProps {
	filter: string;
	addToCart: (id: number) => void;
}

const buildTitle = (categoryName: string) => {
	return <strong>{categoryName}</strong>;
};

export const ProductsList: React.FC<ProductsListProps> = (props) => {
	const { filter, addToCart } = props;
	const productsFiltered = filterProducts(PRODUCTS, filter);
	const categoryName = returnCategoryName(filter);

	return (
		<Paper className={classes["products-container"]}  elevation={3} square>
			<Typography
				className={classes["products-title"]}
				variant="h6"
				component="h2"
			>
				Listing: {buildTitle(categoryName)}
			</Typography>
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
