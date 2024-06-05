import React from "react";
import "./App.css";
import { Home } from "./pages/home";
import { Navbar } from "./components/navbar/navbar.component";
import { CATEGORIES, Product } from "./components/products/products.model";
import { Route, Routes } from "react-router-dom";
import { CartPage } from "./pages/cart";
import { cartContext } from "./cartContext";

function App() {
	const [filter, setFilter] = React.useState<string>(CATEGORIES.ALL);
	const [productsInCart, setProductsInCart] = React.useState<Product[]>([]);

	const applyFilter = (category: string) => {
		setFilter(category);
	};

	return (
		<>
			<cartContext.Provider value={{ productsInCart, setProductsInCart }}>
				<Navbar applyFilter={applyFilter} />
				<Routes>
					<Route path="/" element={<Home filter={filter} />} />
					<Route
						path="/cart"
						element={<CartPage />}
					/>
				</Routes>
			</cartContext.Provider>
		</>
	);
}

export default App;
