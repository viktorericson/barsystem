import { Order } from "./order.model";

export const ordersNewDateFirst = (orders: Order[]) => {
	return orders.sort((a, b) => {
		return new Date(b.date).getTime() - new Date(a.date).getTime();
	});
}

export function priceRow(qty: number, unit: number) {
	return qty * unit;
}

export function ccyFormat(num: number) {
	return `${num.toFixed(2)}`;
}

export function getLastOrderId(orders: Order[]) {
	const lastOrder = ordersNewDateFirst(orders)[0];
	return lastOrder.id;
}

export function generateNewOrderId(id: string): string {
	const idNumber = parseInt(id.slice(1));
	return `#${(idNumber + 1).toString().padStart(3, "0")}`
}