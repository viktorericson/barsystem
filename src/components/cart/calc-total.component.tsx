import { Box, Button, Modal, Paper, Typography } from "@mui/material";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { calcTotal, ccyFormat, groupProducts, isCartEmpty } from "./cart.motor";
import classes from "./css/calc-total.module.css";
import React from "react";
import { appContext } from "../../appContext";
import { generateNewOrderId, getLastOrderId } from "../orders/order.motor";
import { useNavigate } from "react-router-dom";
import { useLocation } from 'react-router-dom';
import { openSnackBarOrderRegistered } from "../snackbar/snackbar.motor";


export const CalcTotal: React.FC = () => {
	const { productsInCart, setProductsInCart } = React.useContext(appContext).cartCTX;
	const { orders, setOrders } = React.useContext(appContext).orderCTX;
	const productsGrouped = groupProducts(productsInCart);
	const total = calcTotal(productsGrouped);
	const [open, setOpen] = React.useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
	const navigate = useNavigate();
	const location = useLocation();

	const enableCartButton = () => {
		let cartButton;
		if (!isCartEmpty(productsInCart)) {
			cartButton = (
				<Button variant="contained" color="success" onClick={handleOpen}>
					<ShoppingBasketIcon sx={{ mr: 2 }} />
					Place Order
				</Button>
			);
		} else {
			cartButton = (
				<Button variant="contained" color="success" disabled>
					<ShoppingBasketIcon sx={{ mr: 2 }} />
					Place Order
				</Button>
			);
		}
		return cartButton;
	};

	const addNewOrder = () => {
		const lastOrderId = getLastOrderId(orders);
		const newOrderId = generateNewOrderId(lastOrderId);
		const newOrder = {
			id: newOrderId,
			products: productsInCart,
			total: total,
			date: new Date().toString(),
			isCompleted: true,
		};
		setOrders([...orders, newOrder]);
		setProductsInCart([]);
		handleClose();
		if(location.pathname !== "/"){
			navigate("/");
		}
	};

	const throwSnackBar = () => {
		const lastOrderId = getLastOrderId(orders);
		const newOrderId = generateNewOrderId(lastOrderId);
		openSnackBarOrderRegistered(newOrderId);
	}

	return (
		<Paper className={classes["container-total"]} elevation={5} square>
			<Typography variant="body1" component="h2" className={classes["total-font"]}>
				Total: {ccyFormat(total)}€
			</Typography>
			{enableCartButton()}
			<Modal
				open={open}
				onClose={handleClose}
				aria-labelledby="modal-modal-title"
				aria-describedby="modal-modal-description"
			>
				<Box className={classes["modal-style"]}>
					<Typography id="modal-modal-title" variant="h6" component="h2">
						<strong>Do you want to confirm this order?</strong>
					</Typography>
					<Typography id="modal-modal-title" variant="body1" component="h3">
						The order will be added as a paid order
					</Typography>
					<Box sx={{ display: "flex", gap: 4 }}>
						<Button
							size="small"
							color="error"
							variant="outlined"
							sx={{ mt: 2 }}
							onClick={handleClose}
						>
							Bring me back
						</Button>
						<Button
							size="small"
							color="success"
							variant="outlined"
							sx={{ mt: 2 }}
							onClick={() => {
								addNewOrder();
								throwSnackBar();
							}}
						>
							Confirm order
						</Button>
					</Box>
				</Box>
			</Modal>
		</Paper>
	);
};
