import React from "react";
import "./App.css";
import { Home } from "./pages/home";
import { Navbar } from "./components/navbar/navbar.component";
import {
	CATEGORIES,
	Product,
	searchProductById,
} from "./components/products/products.model";
import { Route, Routes } from "react-router-dom";
import { CartPage } from "./pages/cart";

function App() {
	const [filter, setFilter] = React.useState<string>(CATEGORIES.ALL);
	const [productsInCart, setProductsInCart] = React.useState<Product[]>([]);

	const handleAddToCart = (id: number) => {
		const productFinded = searchProductById(id);
		setProductsInCart([...productsInCart, productFinded]);
	};

	const handleSubtractQtyFromCart = (id: number) => {
		const newProductsInCart = [...productsInCart];
		for (let i = newProductsInCart.length - 1; i >= 0; i--) {
			if (newProductsInCart[i].id === id) {
				newProductsInCart.splice(i, 1);
				break;
			}
		}
		setProductsInCart(newProductsInCart);
	};

	const handleDeleteFromCart = (id: number) => {
		const newProductsInCart = productsInCart.filter((p) => p.id !== id);
		setProductsInCart(newProductsInCart);
	};

	const applyFilter = (category: string) => {
		setFilter(category);
	};

	return (
		<>
			<Navbar applyFilter={applyFilter} productsInCart={productsInCart} />
			<Routes>
				<Route
					path="/"
					element={
						<Home
							filter={filter}
							productsInCart={productsInCart}
							handleAddToCart={handleAddToCart}
							handleDeleteFromCart={handleDeleteFromCart}
							handleSubtractQtyFromCart={handleSubtractQtyFromCart}
						/>
					}
				/>
				<Route path="/cart" element={<CartPage productsInCart={productsInCart}/>} />
			</Routes>
		</>
	);
}

export default App;
