import React, { useEffect } from "react";
import "./App.css";
import { Home } from "./pages/home";
// import { Navbar } from "./components/navbar/navbar.component";
import { CATEGORIES, Product } from "./components/products/products.model";
import { Route, Routes } from "react-router-dom";
import { CartPage } from "./pages/cart";
import { appContext } from "./appContext";
import { Orders } from "./pages/orders";
import { NotFoundPage } from "./pages/notFoundPage";
import { DEFAULT_ORDERS, Order } from "./components/orders/order.model";
import "@fontsource/calistoga";

function App() {
  const [productsInCart, setProductsInCart] = React.useState<Product[]>(
    window.sessionStorage.getItem("cart")
      ? JSON.parse(window.sessionStorage.getItem("cart")!)
      : []
  );

  const [orders, setOrders] = React.useState<Order[]>(
    window.localStorage.getItem("orders")
      ? JSON.parse(window.localStorage.getItem("orders")!)
      : DEFAULT_ORDERS
  );
  const [filter, setFilter] = React.useState<string>(CATEGORIES.ALL);

  const applyFilter = (category: string) => {
    setFilter(category);
  };

  useEffect(() => {
    window.sessionStorage.setItem("cart", JSON.stringify(productsInCart));
  }, [productsInCart]);

  useEffect(() => {
    window.localStorage.setItem("orders", JSON.stringify(orders));
  }, [orders]);

  return (
    <>
      <appContext.Provider
        value={{
          cartCTX: { productsInCart, setProductsInCart },
          orderCTX: { orders, setOrders },
        }}
      >
        {/* <Navbar applyFilter={applyFilter} /> */}
        <Routes>
          <Route path="/" element={<Home filter={filter} />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </appContext.Provider>
    </>
  );
}

export default App;
