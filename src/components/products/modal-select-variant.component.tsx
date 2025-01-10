import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { appContext } from "../../appContext";
import { PRODUCT_VARIANTS, Product } from "./products.model";
import { searchVariantById } from "./products.motor";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import classes from "./css/modal-select-variant.module.css";
import { openSnackBarProductAdded } from "../snackbar/snackbar.motor";
import { useTranslation } from "react-i18next";

interface SelectVariantProps {
  product: Product;
}

export const SelectVariant: React.FC<SelectVariantProps> = (props) => {
  const { product } = props;
  const { productsInCart, setProductsInCart } =
    React.useContext(appContext).cartCTX;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setAlignment("");
    setErrorMesage(<></>);
  };
  const { t } = useTranslation("common");

  const [alignment, setAlignment] = React.useState("");
  const [errorMesage, setErrorMesage] = React.useState(<></>);
  const handleChangeToggle = (
    _event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
  };

  const addCustomProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (alignment === "") {
      setErrorMesage(
        <Typography variant="body2" className={classes["error-msg"]}>
          Please select a variant
        </Typography>
      );
    } else {
      const productFinded = searchVariantById(Number(alignment));
      setProductsInCart([...productsInCart, productFinded]);
      setAlignment("");
      setErrorMesage(<></>);
      openSnackBarProductAdded(productFinded.name, productFinded.price);
      setOpen(false);
    }
  };

  return (
    <div>
      <Button
        className={classes["select-button"]}
        size="large"
        color="success"
        variant="contained"
        onClick={handleOpen}
      >
        <Typography
          component="p"
          variant="body2"
          sx={{ fontWeight: "bold", fontSize: 20, margin: 0.5 }}
        >
          {t("product.select")}
        </Typography>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <form onSubmit={addCustomProduct}>
          <Box className={classes["modal-style"]}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <strong>{product.name}</strong>
            </Typography>
            <Typography
              id="modal-modal-title"
              variant="body2"
              component="h2"
              className={classes["modal-title"]}
            >
              <strong>{t("product.selectvarHead")}</strong>
            </Typography>

            <ToggleButtonGroup
              className={classes["toggle-button-group"]}
              color="primary"
              value={alignment}
              exclusive
              onChange={handleChangeToggle}
              aria-label="Product Variant"
            >
              {PRODUCT_VARIANTS.map((variant) =>
                product.id === variant.originalId ? (
                  <ToggleButton key={variant.id} value={variant.id}>
                    {t(`product.${variant.variantName}`)}{" "}
                    <>
                      <br />
                    </>{" "}
                    {variant.price.toFixed(2)}Kr
                  </ToggleButton>
                ) : null
              )}
            </ToggleButtonGroup>
            {errorMesage}
            <Button
              size="small"
              color="success"
              variant="outlined"
              type="submit"
              className={classes["add-to-cart-button"]}
            >
              {t("order.confirmbtn")}
            </Button>
          </Box>
        </form>
      </Modal>
    </div>
  );
};
