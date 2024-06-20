import { Order } from "./order.model";

export const ordersNewDateFirst = (orders: Order[]) => {
	return orders.sort((a, b) => {
		return b.date.getTime() - a.date.getTime();
	});
}

export function priceRow(qty: number, unit: number) {
	return qty * unit;
}

export function ccyFormat(num: number) {
	return `${num.toFixed(2)}`;
}