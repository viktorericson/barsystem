import { Product } from "../products/products.model";

export interface Order {
	id: string;
	products: Product[];
	total: number;
	date: string;
	isCompleted: boolean;
}


export const DEFAULT_ORDERS: Order[] = [
	{
	id: "#001",
		products: [
			{
				name: "Hot chocolate",
				price: 4.0,
				category: "hot_drinks",
				id: 3,
			},
			{
				name: "Hot chocolate",
				price: 4.0,
				category: "hot_drinks",
				id: 3,
			},
			{
				name: "Donut",
				price: 2.50,
				category: "pastries",
				id: 10,
			},
		],
		total: 10.50,
		date: "2024-06-19",
		isCompleted: false
	},
	{
	id: "#002",
		products: [
			{
				name: "Coffee with milk",
				price: 3.50,
				category: "hot_drinks",
				id: 1,
				variantName: "M",
			},
			{
				name: "Tea",
				price: 2.50,
				category: "hot_drinks",
				id: 2,
			},
			{
				name: "Tea",
				price: 2.50,
				category: "hot_drinks",
				id: 2,
			},
		],
		total: 8.50,
		date: "2024-06-20",
		isCompleted: true
	}
]