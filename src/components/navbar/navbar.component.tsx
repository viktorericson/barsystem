import { useState } from "react";
import {
	AppBar,
	Badge,
	Button,
	Drawer,
	Toolbar,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import { NavListDrawer } from "./navbar-list-drawer.component";
import HomeIcon from "@mui/icons-material/Home";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { Product } from "../products/products.model";
import { NavLink, useLocation } from "react-router-dom";

const drawerLinks = [
	{ title: "All", filter: "all" },
	{ title: "Hot Drinks", filter: "hot_drinks" },
	{ title: "Pastries", filter: "pastries" },
];

interface NavBarProps {
	applyFilter: (category: string) => void;
	productsInCart: Product[];
}

export const Navbar: React.FC<NavBarProps> = (props) => {
	const { applyFilter, productsInCart } = props;
	const [open, setOpen] = useState(false);
	const location = useLocation();

	const enableCartButton = () => {
		let cartButton;
		if (productsInCart.length > 0) {
			cartButton = (
				<Button component={NavLink} to={"/cart"}>
					<ShoppingBasketIcon color="success" />
					<Badge badgeContent={productsInCart.length} color="warning"></Badge>
				</Button>
			);
		} else {
			cartButton = (
				<Button component={NavLink} to={"/cart"} disabled>
					<ShoppingBasketIcon color="disabled" />
				</Button>
			);
		}
		return cartButton;
	};

	return (
		<>
		<Box sx={{ display: "flex" }}></Box>
			<AppBar position="sticky" color="default">
				<Toolbar sx={{justifyContent: location.pathname === "/" ? "space-between" : "flex-end"}} >
					<Button sx={{display: location.pathname === "/" ? "flex" : "none"}}
						color="inherit"
						aria-label="menu"
						onClick={() => setOpen(true)}
					>
						<MenuIcon />

						<Typography variant="h6" sx={{ ml: 1, textTransform:"none" }} >
							Products
						</Typography>
					</Button>

					<Box>
						<Button component={NavLink} to={"/"}>
							<HomeIcon color="action" />
						</Button>
						{enableCartButton()}
					</Box>
				</Toolbar>
			</AppBar>

			<Drawer anchor="left" open={open} onClose={() => setOpen(false)}>
				<NavListDrawer
					onClick={() => setOpen(false)}
					navLinks={drawerLinks}
					applyFilter={applyFilter}
				/>
			</Drawer>
		</>
	);
};
