import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { calcTotal, ccyFormat, groupProducts } from "./cart.motor";
import { CartItem } from "./cart-item.component";
import { Product } from "../products/products.model";
import { Box, Button, Typography } from "@mui/material";
import ShoppingBasketIcon from '@mui/icons-material/ShoppingBasket';

interface CartListProps {
	productsInCart: Product[];
	deleteProduct: (id: number) => void;
	addToCart: (id: number) => void;
	subtractQty: (id: number) => void;
}

export const CartList: React.FC<CartListProps> = (props) => {
	const {
		productsInCart,
		deleteProduct: handleDeleteFromCart,
		addToCart,
		subtractQty,
	} = props;
	const productsGrouped = groupProducts(productsInCart);
	const total = calcTotal(productsGrouped);

	return (
		<Box sx={{ flexGrow: 1 }}>
			<TableContainer
				component={Paper}
				sx={{ p: 0, overflow: "auto", height: "70vh" }}
				elevation={3}
				square
			>
				<Table aria-label="spanning table">
					<TableHead>
						<TableRow></TableRow>
						<TableRow>
							<TableCell>Product</TableCell>
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
								deleteProduct={handleDeleteFromCart}
								addToCart={addToCart}
								subtractQty={subtractQty}
							/>
						))}
					</TableBody>
				</Table>
			</TableContainer>
			<Paper
				sx={{ display:"flex", alignItems:"center", justifyContent:"space-between", width: "100%", p: 2, overflow: "auto", height: "10vh", backgroundColor:"#EDEDED"}}
				elevation={3}
				square
			>
				<Typography variant="body1" component="h2" sx={{fontWeight:"bold"}}>
					Total: {ccyFormat(total)}€
				</Typography>
				<Button variant="contained" color="success">
					<ShoppingBasketIcon sx={{mr:2}}/>
					Place Order
				</Button>
			</Paper>
		</Box>
	);
};
