import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { Product } from "./products.model";
import classes from "./css/products-card.module.css";
import { SelectVariant } from "./modal-select-variant.component";
import React from "react";
import { appContext } from "../../appContext";
import { searchProductById } from "./products.motor";
import { openSnackBarProductAdded } from "../snackbar/snackbar.motor";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = (props) => {
  const { name, price, variants, img } = props.product;
  const { productsInCart, setProductsInCart } =
    React.useContext(appContext).cartCTX;

  const addToCart = (id: number) => {
    const productFinded = searchProductById(id);
    setProductsInCart([...productsInCart, productFinded]);
  };

  const createButton = () => {
    if (variants) {
      return <SelectVariant product={props.product} />;
    } else {
      return (
        <Button
          className={classes["card-actions-button"]}
          size="large"
          color="success"
          variant="contained"
          onClick={() => {
            addToCart(props.product.id);
            openSnackBarProductAdded(name, price);
          }}
        >
          <Typography
            component="p"
            variant="body2"
            sx={{ fontWeight: "bold", fontSize: 20, margin: 0.5 }}
          >
            {price + " "}Kr
          </Typography>
        </Button>
      );
    }
  };

  return (
    <Card className={classes["card"]}>
      <CardMedia
        component="img"
        alt={name}
        image={`imgs/products/${img}`}
        className={classes["card-media"]}
      />
      <CardContent className={classes["card-content"]}>
        <Typography
          gutterBottom
          variant="body2"
          component="h3"
          sx={{ fontWeight: "bold", textAlign: "center", fontSize: 20 }}
        >
          {name}
        </Typography>
      </CardContent>
      <CardActions className={classes["card-actions"]}>
        {/* <Typography
          gutterBottom
          variant="body2"
          component="p"
          sx={{ fontWeight: "bold" }}
        >
          {price + " "}Kr
        </Typography> */}
        {createButton()}
      </CardActions>
    </Card>
  );
};
