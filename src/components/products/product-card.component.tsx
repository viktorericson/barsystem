import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import { Product } from "./products.model";
import classes from "./css/products-card.module.css";
import { useSnackbar } from "notistack";
import { SelectVariant } from "./modal-select-variant.component";
import React from "react";
import { cartContext } from "../../cartContext";
import { searchProductById } from "./products.motor";

interface ProductCardProps {
	product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = (props) => {
	const { name, price, variants } = props.product;
	const { enqueueSnackbar } = useSnackbar();

	const { productsInCart, setProductsInCart } = React.useContext(cartContext);
	const addToCart = (id: number) => {
		const productFinded = searchProductById(id);
		setProductsInCart([...productsInCart, productFinded]);
	};

	const createButton = () => {
		if (variants) {
			return <SelectVariant product={props.product} />;
		} else {
			return (
				<Button
					className={classes["card-actions-button"]}
					size="small"
					color="success"
					variant="outlined"
					onClick={() => {
						addToCart(props.product.id);
						openSnackBar();
					}}
				>
					Add
				</Button>
			);
		}
	};

	const openSnackBar = () => {
		enqueueSnackbar(`${name} added! (${price.toFixed(2)}€)`, {
			variant: "success",
			style: { opacity: "90%" },
		});
	};
	return (
		<Card>
			<CardMedia
				component="img"
				alt={name}
				image="https://via.placeholder.com/100x100"
			/>
			<CardContent className={classes["card-content"]}>
				<Typography gutterBottom variant="body2" component="h3">
					{name}
				</Typography>
			</CardContent>
			<CardActions className={classes["card-actions"]}>
				<Typography gutterBottom variant="body2" component="h3">
					{price.toFixed(2)}€
				</Typography>
				{createButton()}
			</CardActions>
		</Card>
	);
};
