import { useState } from "react";
import {
	AppBar,
	Button,
	Drawer,
	IconButton,
	Toolbar,
	Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import MenuIcon from "@mui/icons-material/Menu";
import { NavListDrawer } from "./navbar-list-drawer.component";

const navLinks = [{ title: "Cart", path: "#cart" }];

const drawerLinks = [
	{ title: "All", filter: "all" },
	{ title: "Hot Drinks", filter: "hot_drinks" },
	{ title: "Pastries", filter: "pastries" },
];

interface NavBarProps {
	applyFilter: (category: string) => void;
}

export const Navbar: React.FC<NavBarProps> = (props) => {
	const { applyFilter } = props;
	const [open, setOpen] = useState(false);

	return (
		<>
			<AppBar position="static" color="default">
				<Toolbar>
					<IconButton
						color="inherit"
						size="large"
						edge="start"
						aria-label="menu"
						onClick={() => setOpen(true)}
					>
						<MenuIcon />
					</IconButton>
					<Typography variant="h6" sx={{ flexGrow: 1 }}>
						Products
					</Typography>
					<Box>
						{navLinks.map((link) => (
							<Button key={link.title} sx={{ color: "#fff" }} href={link.path}>
								{link.title}
							</Button>
						))}
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
