import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { ProductsInCart } from "./cart.model";
import { cartContext } from "../../cartContext";
import { generateCustomID } from "../products/products.motor";
import { countNumberOfSameProducts, deleteProductFromCart } from "./cart.motor";
import { Product } from "../products/products.model";

const modalStyle = {
	display: "flex",
	flexDirection: "column",
	textAlign: "center",
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: "350px",
	bgcolor: "background.paper",
	border: "2px solid #000",
	boxShadow: 24,
	px: 8,
	py: 4,
};

interface EditPriceModalProps {
	productInfo: ProductsInCart;
}

export const EditPriceModal: React.FC<EditPriceModalProps> = (props) => {
	const { desc, unit, id, category } = props.productInfo;
	const { productsInCart, setProductsInCart } = React.useContext(cartContext);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);

	const priceRef = React.useRef<HTMLInputElement>(null);

	const addCustomProduct = (e: React.FormEvent) => {
		e.preventDefault();
		const qtyOfOriginalItem = countNumberOfSameProducts(id, productsInCart);
		const cartWithoutOriginal = deleteProductFromCart(id, productsInCart);
		const newCustomId = generateCustomID(productsInCart);
		const newCustomProducts: Product[] = [];
		for (let i = 0; i < qtyOfOriginalItem; i++) {
			newCustomProducts.push({
				name: desc,
				price: parseFloat(priceRef.current!.value),
				category: category,
				id: newCustomId,
			});
		}
		setProductsInCart([...cartWithoutOriginal, ...newCustomProducts]);
		setOpen(false);
	};

	return (
		<>
			<IconButton onClick={handleOpen}>
				{" "}
				<EditIcon color="info" sx={{ fontSize: 16 }} />
			</IconButton>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<form onSubmit={addCustomProduct}>
					<Box sx={modalStyle}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							<strong>Enter a New Price</strong>
						</Typography>

						<TextField
							required
							id="product-name-required"
							label="Product name"
							variant="standard"
							size="small"
							margin="dense"
							defaultValue={`(M) ${desc}`}
							disabled
						/>
						<TextField
							required
							inputRef={priceRef}
							id="product-price-required"
							label="Price"
							InputProps={{
								endAdornment: <InputAdornment position="end">€</InputAdornment>,
								inputProps: { min: 0, step: "any" },
							}}
							variant="standard"
							size="small"
							margin="dense"
							type="number"
							defaultValue={unit.toFixed(2)}
						/>
						<Button
							size="small"
							color="success"
							variant="outlined"
							type="submit"
							sx={{ mt: 2 }}
						>
							Add to Cart
						</Button>
					</Box>
				</form>
			</Modal>
		</>
	);
};
