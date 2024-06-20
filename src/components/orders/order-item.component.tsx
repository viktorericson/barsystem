import { Accordion, AccordionSummary, Badge, Box, Container, Typography } from "@mui/material"
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Order } from "./order.model";
import { OrderDetails } from "./order-details.component";
import classes from "./css/order-item.module.css";

interface OrderProps {
	order : Order;
}

export const OrderItem: React.FC<OrderProps> = (props) => {
	const { order } = props;

	return (
		<Accordion key={order.id} className={classes["order-accordion"]}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls={`${order.id}-content`}
							id={`${order.id}-header`}
						>
							<Container
								className={classes["accordion-container"]}
							>
								<Box>
									<Typography variant="body1" component="p">
										<strong>{order.id}</strong>
									</Typography>
									<Typography variant="body2" component="p">
										{order.date.toLocaleDateString("es-ES")}
									</Typography>
								</Box>
								<Box className={classes["accordion-badge-container"]}>
									<Typography variant="body2" component="p">
										Total: {order.total} €
									</Typography>
									{order.isCompleted ? (
										<Badge badgeContent="Completed" color="success"></Badge>
									) : (
										<Badge badgeContent="Pending" color="warning"></Badge>
									)}
								</Box>
							</Container>
						</AccordionSummary>
						<OrderDetails order={order} />
					</Accordion>
	)
}