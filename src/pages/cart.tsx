import { Product } from "../components/products/products.model";

interface CartPageProps {
	productsInCart: Product[];

}

export const CartPage: React.FC<CartPageProps> = (props) => {
	const { productsInCart } = props;
	console.log(productsInCart);
	return <h1>Cart</h1>;
};
