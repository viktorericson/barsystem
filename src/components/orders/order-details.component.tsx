import { AccordionDetails, Box, Divider, Typography } from "@mui/material";
import { Order } from "./order.model";
import { groupProducts } from "../cart/cart.motor";
import { ccyFormat } from "./order.motor";
import classes from "./css/order-details.module.css";

interface OrderDetailsProps {
	order : Order;
}

export const OrderDetails: React.FC<OrderDetailsProps> = (props) => {
	const { order } = props;

	const productsGrouped = groupProducts(order.products);

	return (
		<AccordionDetails sx={{px:4}}>
							{productsGrouped.map((product) => (
								<Box key={product.id}
								className={classes["accordion-details-container"]}
								>
									<Typography variant="body1" component="p">
										{product.qty} x {product.desc}  <span className={classes.id}>id:{product.id}</span>
									</Typography>
									<Typography variant="body1" component="p">
									({ccyFormat(product.unit)} €/u)
									</Typography>
								</Box>
							))}
							<Divider sx={{m:1}}/>
							<Typography variant="h6" component="p" sx={{textAlign:"right"}}>
								<strong>Total: {ccyFormat(order.total)} €</strong>
							</Typography>
						</AccordionDetails>
	);
}