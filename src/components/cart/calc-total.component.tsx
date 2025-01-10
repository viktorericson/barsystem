import React from "react";
import {
  Box,
  Button,
  Modal,
  Paper,
  Typography,
  TextField,
} from "@mui/material";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import { calcTotal, ccyFormat, groupProducts, isCartEmpty } from "./cart.motor";
import { appContext } from "../../appContext";
import { generateNewOrderId, getLastOrderId } from "../orders/order.motor";
import { useNavigate, useLocation } from "react-router-dom";
import classes from "./css/calc-total.module.css";
import { useTranslation } from "react-i18next";
import { useEffect, useRef } from "react";
import { RotatingLines } from "react-loader-spinner";
import { Checkmark } from "react-checkmark";

export const CalcTotal: React.FC = () => {
  const { productsInCart, setProductsInCart } =
    React.useContext(appContext).cartCTX;
  const { orders, setOrders } = React.useContext(appContext).orderCTX;
  const productsGrouped = groupProducts(productsInCart);
  const total = calcTotal(productsGrouped);

  const [openOrderModal, setOpenOrderModal] = React.useState(false);
  const [openEmailModal, setOpenEmailModal] = React.useState(false);
  const [openLoadingModal, setOpenLoadingModal] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [emailError, setEmailError] = React.useState(false);
  const [keyboardInput, setKeyboardInput] = React.useState("");
  const inactivityTimeout = useRef<NodeJS.Timeout | null>(null);
  const decisionTimeout = useRef<NodeJS.Timeout | null>(null);
  const [openInactivityModal, setOpenInactivityModal] = React.useState(false);
  const [recievedPayment, setRecievedPayment] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const handleOrderModalOpen = () => setOpenOrderModal(true);
  const handleOrderModalClose = () => setOpenOrderModal(false);

  const handleEmailModalClose = () => setOpenEmailModal(false);
  const { t } = useTranslation("common");

  const resetInactivityTimer = () => {
    if (isCartEmpty(productsInCart)) {
      if (inactivityTimeout.current) {
        clearTimeout(inactivityTimeout.current);
        inactivityTimeout.current = null;
      }
      return; // Stop if the cart is empty
    }

    if (inactivityTimeout.current) {
      clearTimeout(inactivityTimeout.current);
    }

    inactivityTimeout.current = setTimeout(() => {
      showInactivityModal();
    }, 10 * 60 * 1000); // 10 minutes
  };

  // Show inactivity modal
  const showInactivityModal = () => {
    setOpenInactivityModal(true);

    // Start decision timer
    decisionTimeout.current = setTimeout(() => {
      clearCart();
    }, 10 * 1000); // 10 seconds
  };

  // Clear cart
  const clearCart = () => {
    setProductsInCart([]);
    setOpenInactivityModal(false);
    resetInactivityTimer(); // Restart inactivity detection
  };

  // User wants to continue
  const continueShopping = () => {
    setOpenInactivityModal(false);

    // Clear decision timer
    if (decisionTimeout.current) {
      clearTimeout(decisionTimeout.current);
    }

    resetInactivityTimer();
  };

  // Effect to track inactivity
  useEffect(() => {
    const handleActivity = () => resetInactivityTimer();

    // Add event listeners for user activity
    window.addEventListener("mousemove", handleActivity);
    window.addEventListener("keypress", handleActivity);

    // Start the inactivity timer if the cart is not empty
    resetInactivityTimer();

    // Cleanup event listeners and timers on unmount
    return () => {
      window.removeEventListener("mousemove", handleActivity);
      window.removeEventListener("keypress", handleActivity);

      if (inactivityTimeout.current) {
        clearTimeout(inactivityTimeout.current);
      }
      if (decisionTimeout.current) {
        clearTimeout(decisionTimeout.current);
      }
    };
  }, [productsInCart]); // Depend on `productsInCart` to react to cart changes

  const enableCartButton = () => {
    if (!isCartEmpty(productsInCart)) {
      return (
        <Button
          variant="contained"
          color="success"
          onClick={handleOrderModalOpen}
        >
          <ShoppingBasketIcon sx={{ mr: 2 }} />
          {t("cartbtn.text")}
        </Button>
      );
    }
    return (
      <Button variant="contained" color="success" disabled>
        <ShoppingBasketIcon sx={{ mr: 2 }} />
        {t("cartbtn.text")}
      </Button>
    );
  };
  const handleRecievePayment = async () => {
    const lastOrderId = getLastOrderId(orders);
    const newOrderId = generateNewOrderId(lastOrderId);
    const newOrder = {
      id: newOrderId,
      products: productsInCart,
      total: total,
      email,
      date: new Date().toString(),
      isCompleted: true,
    };

    // Close the Email Modal and Open the Loading Modal

    setOpenLoadingModal(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error("Failed to process the order");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Update Orders and Clear Cart
      setOrders([...orders, newOrder]);
      setProductsInCart([]);

      // Close the Loading Modal on Success
      setRecievedPayment(true);

      setTimeout(() => {
        setOpenLoadingModal(false);
        setRecievedPayment(false);
        setOpenEmailModal(true);
      }, 2000); // 2 seconds
    } catch (error) {
      console.error("Failed to send order:", error);

      // Close the Loading Modal on Failure
      setRecievedPayment(false);

      // Optionally, show an error notification or modal here
      alert("An error occurred while processing your order. Please try again.");
    }
  };

  const handleEmailSubmit = async () => {
    if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError(true);
      return;
    }

    setEmailError(false);
    const lastOrderId = getLastOrderId(orders);
    const newOrderId = generateNewOrderId(lastOrderId);
    const newOrder = {
      id: newOrderId,
      products: productsInCart,
      total: total,
      email,
      date: new Date().toString(),
      isCompleted: true,
    };

    // Close the Email Modal and Open the Loading Modal
    setOpenEmailModal(false);
    setOpenLoadingModal(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newOrder),
      });

      if (!response.ok) {
        throw new Error("Failed to process the order");
      }

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Update Orders and Clear Cart
      setOrders([...orders, newOrder]);
      setProductsInCart([]);

      // Close the Loading Modal on Success
      setOpenLoadingModal(false);

      // Redirect to Home
      if (location.pathname !== "/") {
        navigate("/");
      }
    } catch (error) {
      console.error("Failed to send order:", error);

      // Close the Loading Modal on Failure
      setOpenLoadingModal(false);

      // Optionally, show an error notification or modal here
      alert("An error occurred while processing your order. Please try again.");
    }
  };

  const handleKeyboardInput = (input: string) => {
    setKeyboardInput(input);
    setEmail(input);
  };

  return (
    <Paper className={classes["container-total"]} elevation={5} square>
      <Typography
        variant="body1"
        component="h2"
        className={classes["total-font"]}
      >
        Total: {ccyFormat(total)}KR
      </Typography>
      {enableCartButton()}
      {/* Order Confirmation Modal */}
      <Modal
        open={openOrderModal}
        onClose={handleOrderModalClose}
        aria-labelledby="order-modal-title"
        aria-describedby="order-modal-description"
      >
        <Box className={classes["modal-style"]}>
          <Typography id="order-modal-title" variant="h6" component="h2">
            <strong>{t("order.confirmtext")}</strong>
          </Typography>
          <br />
          <Box sx={{ display: "flex", gap: 4 }}>
            <Button
              size="small"
              color="error"
              variant="outlined"
              onClick={handleOrderModalClose}
            >
              {t("order.cancelbtn")}
            </Button>
            <Button
              size="small"
              color="success"
              variant="outlined"
              onClick={() => {
                setOpenOrderModal(false);
                setOpenLoadingModal(true);
                handleRecievePayment();
              }}
            >
              {t("order.confirmbtn")}
            </Button>
          </Box>
        </Box>
      </Modal>
      {/* Email Input Modal */}
      <Modal
        open={openEmailModal}
        onClose={handleEmailModalClose}
        aria-labelledby="email-modal-title"
        aria-describedby="email-modal-description"
        disableAutoFocus
      >
        <Box className={classes["modal-style"]}>
          <Typography id="email-modal-title" variant="h6" component="h2">
            <strong>Do you want a reciept?</strong>
          </Typography>
          <TextField
            fullWidth
            variant="outlined"
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={emailError}
            helperText={emailError ? "Please enter a valid email address" : ""}
            sx={{ mt: 2 }}
          />
          <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
            <Button
              size="small"
              color="error"
              variant="outlined"
              onClick={handleEmailModalClose}
            >
              No Thanks
            </Button>
            <Button
              size="small"
              color="success"
              variant="outlined"
              onClick={handleEmailSubmit}
            >
              Send to Email
            </Button>
          </Box>
        </Box>
      </Modal>
      <Modal
        open={openLoadingModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className={classes["modal-style"]}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            {t("order.pendingpayment")}
          </Typography>
          {recievedPayment ? (
            <Checkmark size="100" />
          ) : (
            <RotatingLines
              strokeColor="grey"
              strokeWidth="5"
              animationDuration="0.75"
              width="100"
              visible={true}
            />
          )}
        </Box>
      </Modal>
      {/* Inactivity Modal */}
      <Modal
        open={openInactivityModal}
        aria-labelledby="inactivity-modal-title"
        aria-describedby="inactivity-modal-description"
      >
        <Box className={classes["modal-style"]}>
          <Typography id="inactivity-modal-title" variant="h6" component="h2">
            {t("inactivity.message")}
          </Typography>
          <Typography variant="body2">{t("inactivity.prompt")}</Typography>
          <Box sx={{ display: "flex", gap: 4, mt: 2 }}>
            <Button
              size="small"
              color="error"
              variant="outlined"
              onClick={clearCart}
            >
              {t("inactivity.clearcart")}
            </Button>
            <Button
              size="small"
              color="success"
              variant="outlined"
              onClick={continueShopping}
            >
              {t("inactivity.continue")}
            </Button>
          </Box>
        </Box>
      </Modal>

      {/* Onscreen Keyboard */}
      {openEmailModal && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 1400, // Higher than the modal backdrop (default 1300)
          }}
        >
          <Keyboard onChange={handleKeyboardInput} input={keyboardInput} />
        </Box>
      )}
    </Paper>
  );
};
