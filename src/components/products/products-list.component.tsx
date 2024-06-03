import { Grid, Paper, Typography } from "@mui/material";
import { filterProducts, returnCategoryName } from "./products.motor";
import { PRODUCTS } from "./products.model";
import { ProductCard } from "./product-card.component";

interface ProductsListProps {
	filter: string;
	addToCart: (id: number) => void;
}

export const ProductsList: React.FC<ProductsListProps> = (props) => {
	const { filter, addToCart } = props;
	const productsFiltered = filterProducts(PRODUCTS, filter);
	const categoryName = returnCategoryName(filter);
	return (
		<Paper sx={{p:2, overflow:"auto", height:"80vh"}} elevation={3} square>
			<Typography variant="h6" component="h2">
				Category: {categoryName}
			</Typography>
			<Grid container spacing={2}>
				{productsFiltered.map((product, index) => (
					<Grid key={index} item lg={2} md={3} sm={3} xs={6}>
						<ProductCard product={product} addToCart={addToCart}/>
					</Grid>
				))}
			</Grid>
		</Paper>
	);
};
