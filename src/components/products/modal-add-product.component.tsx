import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import AddIcon from "@mui/icons-material/Add";
import { InputAdornment, TextField } from "@mui/material";
import { appContext } from "../../appContext";
import { Product } from "./products.model";
import { generateCustomID } from "./products.motor";
import classes from "./css/modal-add-product.module.css";

export const BasicModal: React.FC = () => {
  const { productsInCart, setProductsInCart } =
    React.useContext(appContext).cartCTX;

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const nameRef = React.useRef<HTMLInputElement>(null);
  const priceRef = React.useRef<HTMLInputElement>(null);

  const addCustomProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const newCustomId = generateCustomID(productsInCart);
    const newCustomProduct: Product = {
      name: nameRef.current!.value,
      price: parseFloat(priceRef.current!.value),
      category: "custom",
      id: newCustomId,
      enabled: true,
      SLV: 0,
      OPT: 0,
      MEG: 0,
      img: "custom.png",
    };
    setProductsInCart([...productsInCart, newCustomProduct]);
    setOpen(false);
  };

  return (
    <div>
      <Button size="small" color="info" variant="outlined" onClick={handleOpen}>
        {" "}
        <AddIcon />
        Custom Product
      </Button>
      <Modal open={open} onClose={handleClose}>
        <form onSubmit={addCustomProduct}>
          <Box className={classes["modal-style"]}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              <strong>Add a new product</strong>
            </Typography>

            <TextField
              required
              inputRef={nameRef}
              id="product-name-required"
              label="Product name"
              variant="standard"
              size="small"
              margin="dense"
            />
            <TextField
              required
              inputRef={priceRef}
              id="product-price-required"
              label="Price"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">Kr</InputAdornment>
                ),
                inputProps: { min: 0, step: "any" },
              }}
              variant="standard"
              size="small"
              margin="dense"
              type="number"
            />
            <Button
              size="small"
              color="success"
              variant="outlined"
              type="submit"
              sx={{ mt: 2 }}
            >
              Add to Cart
            </Button>
          </Box>
        </form>
      </Modal>
    </div>
  );
};
