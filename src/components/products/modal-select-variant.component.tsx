import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { cartContext } from "../../cartContext";
import { PRODUCT_VARIANTS, Product } from "./products.model";
import { searchVariantById } from "./products.motor";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import { enqueueSnackbar } from "notistack";

const modalStyle = {
	display: "flex",
	flexDirection: "column",
	textAlign: "center",
	position: "absolute",
	alignItems: "stretch",
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

interface SelectVariantProps {
	product: Product;
}

export const SelectVariant: React.FC<SelectVariantProps> = (props) => {
	const { product } = props;
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => {
		setOpen(false);
		setAlignment("");
		setErrorMesage(<></>);
	};
	const { productsInCart, setProductsInCart } = React.useContext(cartContext);
	const [alignment, setAlignment] = React.useState("");
	const [errorMesage, setErrorMesage] = React.useState(<></>);

	const openSnackBar = (name: string, price: number) => {
		enqueueSnackbar(`${name} added! (${price.toFixed(2)}€)`, {
			variant: "success",
			style: { opacity: "90%" },
		});
	};

	const handleChangeToggle = (
		_event: React.MouseEvent<HTMLElement>,
		newAlignment: string
	) => {
		setAlignment(newAlignment);
	};

	const addCustomProduct = (e: React.FormEvent) => {
		e.preventDefault();
		if (alignment === "") {
			setErrorMesage(
				<Typography variant="body2" sx={{ color: "#D32F2F" }}>
					Please select a variant
				</Typography>
			);
		} else {
			const productFinded = searchVariantById(Number(alignment));
			setProductsInCart([...productsInCart, productFinded]);
			setAlignment("");
			setErrorMesage(<></>);
			openSnackBar(productFinded.name, productFinded.price);
			setOpen(false);
		}
	};

	return (
		<div>
			<Button
				sx={{ fontWeight: "bold", padding: 0 }}
				size="small"
				color="success"
				variant="outlined"
				onClick={handleOpen}
			>
				Select
			</Button>
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<form onSubmit={addCustomProduct}>
					<Box sx={modalStyle}>
						<Typography id="modal-modal-title" variant="h6" component="h2">
							<strong>{product.name}</strong>
						</Typography>
						<Typography
							id="modal-modal-title"
							variant="body2"
							component="h2"
							sx={{ mt: 2 }}
						>
							<strong>Select your variant:</strong>
						</Typography>

						<ToggleButtonGroup
							sx={{ justifyContent: "center" }}
							color="primary"
							value={alignment}
							exclusive
							onChange={handleChangeToggle}
							aria-label="Product Variant"
						>
							{PRODUCT_VARIANTS.map((variant) =>
								product.id === variant.originalId ? (
									<ToggleButton key={variant.id} value={variant.id}>
										{variant.variantName} <br></br> {variant.price.toFixed(2)}€
									</ToggleButton>
								) : null
							)}
						</ToggleButtonGroup>
						{errorMesage}
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
