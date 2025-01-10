import {
  Box,
  Chip,
  IconButton,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { ProductsInCart } from "./cart.model";
import {
  ccyFormat,
  formattedDescription,
  priceRow,
  searchProductByIdInCart,
} from "./cart.motor";
import DeleteIcon from "@mui/icons-material/Delete";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import React from "react";
import { appContext } from "../../appContext";
import { EditPriceModal } from "./edit-price-modal.component";
import classes from "./css/cart-item.module.css";
import { openSnackBarDeleteProduct } from "../snackbar/snackbar.motor";

interface CartItemProps {
  productInfo: ProductsInCart;
}

export const CartItem: React.FC<CartItemProps> = (props) => {
  const { desc, qty, unit, id, category, variantName } = props.productInfo;
  const { productsInCart, setProductsInCart } =
    React.useContext(appContext).cartCTX;

  const addQtyToCart = (id: number) => {
    const productFinded = searchProductByIdInCart(id, productsInCart);
    setProductsInCart([...productsInCart, productFinded]);
  };

  const subtractQtyFromCart = (id: number) => {
    const newProductsInCart = [...productsInCart];
    for (let i = newProductsInCart.length - 1; i >= 0; i--) {
      if (newProductsInCart[i].id === id) {
        newProductsInCart.splice(i, 1);
        break;
      }
    }
    setProductsInCart(newProductsInCart);
  };

  const deleteFromCart = (id: number) => {
    const newProductsInCart = productsInCart.filter((p) => p.id !== id);
    setProductsInCart(newProductsInCart);
  };

  return (
    <TableRow>
      <TableCell sx={{ p: 0, pl: 1, fontWeight: "bold", fontSize: 16 }}>
        {formattedDescription(desc)}
        <Box
          sx={{ display: "flex", alignItems: "center", justifyContent: "left" }}
        >
          {variantName && (
            <Typography
              component="p"
              variant="body2"
              className={classes["variant-label"]}
            >
              <Chip
                color="default"
                variant="filled"
                label={variantName}
                sx={{ height: "auto", m: 0.5 }}
              />
            </Typography>
          )}
          {(category === "custom" || id > 1000) && (
            <Typography
              component="p"
              variant="body2"
              className={classes["custom-label"]}
            >
              {" "}
              <Chip
                color="info"
                variant="outlined"
                label="Custom"
                sx={{ height: "auto", m: 0.5 }}
              />
            </Typography>
          )}
        </Box>
      </TableCell>
      <TableCell>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconButton onClick={() => subtractQtyFromCart(id)}>
            <RemoveCircleOutlineIcon className={classes.icon} />
          </IconButton>
          <Typography
            component="p"
            variant="body2"
            sx={{ fontWeight: "bold", fontSize: 16 }}
          >
            {qty}
          </Typography>
          <IconButton onClick={() => addQtyToCart(id)}>
            <AddCircleOutlineIcon className={classes.icon} />
          </IconButton>
        </Box>
      </TableCell>
      {/* <TableCell align="right" sx={{ fontSize: 16 }}>
        {ccyFormat(unit)}
      </TableCell> */}
      <TableCell align="right" sx={{ fontWeight: "bold", fontSize: 16 }}>
        {ccyFormat(priceRow(qty, unit))}
      </TableCell>
      <TableCell align="right" sx={{ p: 0, pr: 1 }}>
        <IconButton
          onClick={() => {
            deleteFromCart(id);
            openSnackBarDeleteProduct(desc);
          }}
        >
          <DeleteIcon className={classes["delete-icon"]} />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
