import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { InputAdornment, TextField } from "@mui/material";
import { cartContext } from "../../cartContext";
import { Product } from "./products.model";
import { generateCustomID } from "./products.motor";

const style = {
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

export const BasicModal: React.FC = () => {
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const { productsInCart, setProductsInCart } = React.useContext(cartContext);

	const nameRef = React.useRef<HTMLInputElement>(null);
	const priceRef = React.useRef<HTMLInputElement>(null);

	const addCustomProduct = (e: React.FormEvent) => {
		e.preventDefault();

		const newCustomId = generateCustomID(productsInCart);
		const newCustomProduct: Product = {
			name: `(C) ${nameRef.current!.value}`,
			price: parseFloat(priceRef.current!.value),
			category: "custom",
			id: newCustomId,
		};
		setProductsInCart([...productsInCart, newCustomProduct]);
		setOpen(false);
	};

	return (
		<div>
			<Button size="small" color="info" variant="outlined" onClick={handleOpen}>
				{" "}
				<AddIcon />
				Custom Product
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<form onSubmit={addCustomProduct}>
					<Box sx={style}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							<strong>Add a new product</strong>
						</Typography>

						<TextField
							required
							inputRef={nameRef}
							id="product-name-required"
							label="Product name"
							variant="standard"
							size="small"
							margin="dense"
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
		</div>
	);
};
