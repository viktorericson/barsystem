import {
	Button,
	Card,
	CardActions,
	CardContent,
	CardMedia,
	Typography,
} from "@mui/material";
import { Product } from "./products.model";

interface ProductCardProps {
	product: Product
	addToCart: (id: number) => void
}

export const ProductCard: React.FC<ProductCardProps> = (props) => {
	const { name, price } = props.product;
	const { addToCart } = props;
	return (
		<Card>
			<CardMedia
				component="img"
				alt="hot drink"
				image="https://via.placeholder.com/100x100"
			/>
			<CardContent sx={{p:1,pb:0}}>
				<Typography gutterBottom variant="body2" component="h3">
					{name}
				</Typography>
			</CardContent>
			<CardActions sx={{alignItems:"baseline", justifyContent:"space-around"}}>
				<Typography gutterBottom variant="body2" component="h3">
					{price.toFixed(2)}€
				</Typography>
				<Button size="small" color="success" variant="contained" onClick={()=>addToCart(props.product.id)}>Add</Button>
			</CardActions>
		</Card>
	);
};
