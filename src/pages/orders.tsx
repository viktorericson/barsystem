import React from "react";
import { Container, Typography } from "@mui/material";
import classes from "./css/cart.module.css"
import { appContext } from "../appContext";

export const Orders: React.FC = () => {
	const { orders } = React.useContext(appContext).orderCTX;

	return (
		<Container maxWidth="xl" className={classes["main-container"]}>
			<Typography variant="h5" component="h2" sx={{mb:1}}>Orders</Typography>
			{
				orders.map((order, index) => (
					<div key={index} className={classes["order-container"]}>
						<Typography variant="h6" component="h3" sx={{mb:1}}>Order {index + 1}</Typography>
						<Typography variant="body1" component="p" sx={{mb:1}}>Date: {order.date}</Typography>
						<Typography variant="body1" component="p" sx={{mb:1}}>Total: {order.total}€</Typography>
						<Typography variant="body1" component="p" sx={{mb:1}}>Products:</Typography>
						{
							order.products.map((product, index) => (
								<div key={index} className={classes["product-container"]}>
									<Typography variant="body1" component="p" sx={{mb:1}}>{product.name}</Typography>
									<Typography variant="body1" component="p" sx={{mb:1}}>Qty: {product.price}</Typography>
								</div>
							))
						}
					</div>
				))
			}
		</Container>
	);
};
