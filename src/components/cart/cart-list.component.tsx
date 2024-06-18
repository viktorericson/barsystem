import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { groupProducts } from "./cart.motor";
import { CartItem } from "./cart-item.component";
import { Box } from "@mui/material";
import classes from "./css/cart-list.module.css";
import { CalcTotal } from "./calc-total.component";
import { cartContext } from "../../cartContext";

export const CartList: React.FC = () => {
	const { productsInCart } = React.useContext(cartContext);
	const productsGrouped = groupProducts(productsInCart);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<TableContainer
				component={Paper}
				className={classes["cart-container"]}
				elevation={3}
				square
			>
				<Table aria-label="spanning table" className={(productsGrouped.length === 0) ? classes["table-body"] : ""}>
					<TableHead>
						<TableRow className={classes["table-header"]}>
							<TableCell >Product</TableCell>
							<TableCell align="center">Qty.</TableCell>
							<TableCell align="right">Price</TableCell>
							<TableCell align="right">Sum</TableCell>
							<TableCell align="right"></TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{productsGrouped.map((row) => (
							<CartItem
								key={row.id}
								productInfo={row}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<CalcTotal/>
		</Box>
	);
};
