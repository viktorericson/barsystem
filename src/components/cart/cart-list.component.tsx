import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { groupProducts, isCartEmpty } from "./cart.motor";
import { CartItem } from "./cart-item.component";
import { Box } from "@mui/material";
import classes from "./css/cart-list.module.css";
import { CalcTotal } from "./calc-total.component";
import { appContext } from "../../appContext";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";

export const CartList: React.FC = () => {
  const { productsInCart } = React.useContext(appContext).cartCTX;
  const productsGrouped = groupProducts(productsInCart);
  const location = useLocation();

  const isUserInHome = () => {
    return location.pathname === "/";
  };

  const { t } = useTranslation("common");

  return (
    <Box sx={{ flexGrow: 1 }}>
      <TableContainer
        component={Paper}
        className={classes["cart-container"]}
        elevation={5}
        square
      >
        <Table
          aria-label="spanning table"
          className={
            isCartEmpty(productsInCart) && isUserInHome()
              ? classes["table-body"]
              : ""
          }
        >
          <TableHead>
            <TableRow className={classes["table-header"]}>
              <TableCell sx={{ fontSize: 16 }}>{t("cart.product")}</TableCell>
              <TableCell sx={{ fontSize: 16 }} align="center">
                {t("cart.qty")}
              </TableCell>
              <TableCell sx={{ fontSize: 16 }} align="right">
                Sum
              </TableCell>
              <TableCell sx={{ fontSize: 16 }} align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {productsGrouped.map((row) => (
              <CartItem key={row.id} productInfo={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <CalcTotal />
    </Box>
  );
};
