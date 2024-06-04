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

interface ProductCardProps {
	product: Product;
	addToCart: (id: number) => void;
}

export const ProductCard: React.FC<ProductCardProps> = (props) => {
	const { name, price } = props.product;
	const { addToCart } = props;
	const { enqueueSnackbar } = useSnackbar();
	const openSnackBar = () => {
		enqueueSnackbar("Product Added!", {variant: "success", style: { opacity:"90%"}});
	};
	return (
		<Card>
			<CardMedia
				component="img"
				alt="hot drink"
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
			</CardActions>
		</Card>
	);
};
