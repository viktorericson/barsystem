import React from "react";
import "./App.css";
import { MainContainer } from "./components/main-container.component";
import { Navbar } from "./components/navbar/navbar.component";
import { CATEGORIES } from "./components/products/products.model";


function App() {
	const [filter, setFilter] = React.useState<string>(CATEGORIES.ALL);

	const applyFilter = (category: string) => {
		setFilter(category);
	}

	return (
		<>
			<Navbar applyFilter={applyFilter} />
			<MainContainer filter={filter}/>
		</>
	);
}

export default App;
