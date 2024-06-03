import { IconButton, TableCell, TableRow } from "@mui/material";
import { ProductsInCart } from "./cart.model";
import { ccyFormat, priceRow } from "./cart.motor";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

interface CartItemProps {
	productInfo: ProductsInCart;
	deleteProduct: (id: number) => void;
	addToCart: (id: number) => void;
	subtractQty: (id: number) => void;
}

export const CartItem: React.FC<CartItemProps> = (props) => {
	const { desc, qty, unit, id } = props.productInfo;
	const { deleteProduct, addToCart, subtractQty } = props;
	return (
		<TableRow>
			<TableCell>{desc}</TableCell>
			<TableCell align="center">
				<IconButton onClick={() => subtractQty(id)}>
					<RemoveCircleOutlineIcon sx={{fontSize:16}}/>
				</IconButton>
				{qty}
				<IconButton onClick={() => addToCart(id)}>
					<AddCircleOutlineIcon sx={{fontSize:16}}/>
				</IconButton>
			</TableCell>
			<TableCell align="right">{ccyFormat(unit)}</TableCell>
			<TableCell align="right">{ccyFormat(priceRow(qty, unit))}</TableCell>
			<TableCell align="right">
				<IconButton onClick={() => deleteProduct(id)}>
					<DeleteIcon sx={{fontSize:16, color:"red"}}/>
				</IconButton>
			</TableCell>
		</TableRow>
	);
};
