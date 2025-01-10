import {
  Accordion,
  AccordionSummary,
  Box,
  Chip,
  Container,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { Order } from "./order.model";
import { OrderDetails } from "./order-details.component";
import classes from "./css/order-item.module.css";
import { ccyFormat } from "./order.motor";

interface OrderProps {
  order: Order;
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
        <Container className={classes["accordion-container"]}>
          <Box>
            <Typography variant="body1" component="p">
              <strong>{order.id}</strong>
            </Typography>
            <Typography variant="body2" component="p" className={classes.date}>
              {new Date(order.date).toLocaleDateString("es-ES")}
            </Typography>
          </Box>
          <Box className={classes["accordion-badge-container"]}>
            <Typography variant="body2" component="p">
              Total: {ccyFormat(order.total)} Kr
            </Typography>
            {order.isCompleted ? (
              <Chip
                color="success"
                variant="filled"
                label="Completed"
                sx={{ height: "auto" }}
              />
            ) : (
              <Chip
                color="warning"
                variant="filled"
                label="Pending"
                sx={{ height: "auto" }}
              />
            )}
          </Box>
        </Container>
      </AccordionSummary>
      <OrderDetails order={order} />
    </Accordion>
  );
};
