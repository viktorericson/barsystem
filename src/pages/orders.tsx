import React from "react";
import {
	Box,
	Container,
	Typography,
} from "@mui/material";
import { appContext } from "../appContext";
import { OrderItem } from "../components/orders/order-item.component";
import { ordersNewDateFirst } from "../components/orders/order.motor";
import classes from "./css/orders.module.css";

export const Orders: React.FC = () => {
	const { orders } = React.useContext(appContext).orderCTX;

	const ordersByDate = ordersNewDateFirst(orders);

	return (
		<Container maxWidth="xl" className={classes["main-container"]}>
			<Typography variant="h5" component="h1" className={classes.header} >
				Orders
			</Typography>
			<Box className={classes["orders-container"]}>
				{ordersByDate.map((order) => (
					<OrderItem key={order.id} order={order} />
				))}
			</Box>
		</Container>
	);
};
