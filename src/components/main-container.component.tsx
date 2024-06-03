import { Container, Grid } from "@mui/material";
import { ProductsList } from "./products/products-list.component";
import React from "react";
import { CartList } from "./cart/cart-list.component";
import { Product, searchProductById } from "./products/products.model";

interface MainContainerProps {
	filter: string;
}

export const MainContainer: React.FC<MainContainerProps> = (props) => {
	const [productsInCart, setProductsInCart] = React.useState<Product[]>([]);
	const { filter } = props;

	const handleAddToCart = (id: number) => {
		const productFinded = searchProductById(id);
		setProductsInCart([...productsInCart, productFinded]);
	};

	const handleSubtractQtyFromCart = (id: number) => {
		const newProductsInCart = [...productsInCart];
		for (let i = newProductsInCart.length - 1; i >= 0; i--) {
			if (newProductsInCart[i].id === id) {
				newProductsInCart.splice(i, 1);
				break;
			}
		}
		setProductsInCart(newProductsInCart);
	};

	const handleDeleteFromCart = (id: number) => {
		const newProductsInCart = productsInCart.filter((p) => p.id !== id);
		setProductsInCart(newProductsInCart);
	};

	return (
		<Container
			maxWidth="xl"
			sx={{ p: 4, flexGrow: 1, backgroundColor: "lightgray" }}
		>
			<Grid container spacing={1}>
				<Grid item xl={8} lg={7} md={6} sm={12}>
					<ProductsList filter={filter} addToCart={handleAddToCart} />
				</Grid>
				<Grid
					item
					xl={4}
					lg={5}
					md={6}
					sx={{ display: { md: "flex", sm: "none", xs: "none" } }}
				>
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
