import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Modal,
  Typography,
  TextField,
  Switch,
  FormControlLabel,
  Paper,
} from "@mui/material";
import { Product } from "./products.model";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";

interface EditProductsModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (updatedProducts: Product[]) => void;
  products: Product[];
}

export const EditProductsModal: React.FC<EditProductsModalProps> = ({
  open,
  onClose,
  onSave,
  products: initialProducts,
}) => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [keyboardInput, setKeyboardInput] = useState("");
  const [freeBar, setFreeBar] = useState(false);

  // Handle input change
  const handleChange = (
    id: number,
    field: keyof Product,
    value: string | number | boolean
  ) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id
          ? {
              ...product,
              [field]: value,
            }
          : product
      )
    );
  };

  // Save changes and close modal
  const handleSave = () => {
    onSave(products);
    onClose();
  };

  // Handle password verification
  const verifyPassword = () => {
    fetch("http://127.0.0.1:8004/sendTek0", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then(() => {
        if (password === "1234") {
          setIsUnlocked(true);
          setPassword("");
          setError("");
        } else {
          setError("Incorrect password. Try again.");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
  };

  const handleClose = () => {
    fetch("http://127.0.0.1:8004/sendTek", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .catch((err) => {
        console.error("Error:", err);
      });
    freeBar ? setFreeBar(false) : setFreeBar(false);
    onClose();
  };

  const handleKeyboardInput = (input: string) => {
    setKeyboardInput(input);
    setPassword(input);
  };

  const turnOnFreeBar = () => {
    if (freeBar) {
      handleClose();
      return;
    }
    fetch("http://127.0.0.1:8004/sendTek2", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        {
          setFreeBar(true);
        }
      })
      .catch((err) => {
        console.error("Error:", err);
      });
    onClose();
  };

  useEffect(() => {
    // Reset local state when the modal opens with new products
    setProducts(initialProducts);
    setIsUnlocked(false);
    setPassword("");
    setError("");
  }, [initialProducts, open]);

  return (
    <>
      <Modal
        open={open}
        onClose={onClose}
        aria-labelledby="edit-products-modal"
      >
        <Box
          sx={{
            position: "absolute",
            top: "30%", // Adjust modal height to account for keyboard space
            left: "50%",
            transform: "translate(-50%, -30%)",
            width: "80%",
            maxHeight: "50%",
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            overflowY: "auto",
          }}
        >
          {isUnlocked ? (
            <>
              <Typography id="edit-products-modal" variant="h6" component="h2">
                Edit Products
              </Typography>
              <Box sx={{ mt: 2 }}>
                {products.map((product) => (
                  <Box
                    key={product.id}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      mb: 2,
                    }}
                  >
                    <TextField
                      label="Name"
                      value={product.name}
                      onChange={(e) =>
                        handleChange(product.id, "name", e.target.value)
                      }
                      sx={{ width: "30%" }}
                    />
                    <TextField
                      label="Price"
                      type="number"
                      value={product.price}
                      onChange={(e) =>
                        handleChange(
                          product.id,
                          "price",
                          parseFloat(e.target.value)
                        )
                      }
                      sx={{ width: "20%" }}
                    />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={product.enabled || false}
                          onChange={(e) =>
                            handleChange(
                              product.id,
                              "enabled",
                              e.target.checked
                            )
                          }
                        />
                      }
                      label="Enabled"
                      labelPlacement="end"
                    />
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  gap: 2,
                  mt: 4,
                }}
              >
                {freeBar ? (
                  <Button
                    variant="contained"
                    onClick={turnOnFreeBar}
                    color="error"
                  >
                    Press to turn off free bar
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    onClick={turnOnFreeBar}
                    color="success"
                  >
                    Press to turn on free bar
                  </Button>
                )}

                <Box sx={{ display: "flex", gap: 2 }}>
                  <Button
                    variant="outlined"
                    onClick={handleClose}
                    color="error"
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    onClick={handleSave}
                    color="success"
                  >
                    Save Changes
                  </Button>
                </Box>
              </Box>
            </>
          ) : (
            <Box>
              <Typography id="password-modal-title" variant="h6" component="h2">
                Enter Password to Unlock
              </Typography>
              <TextField
                fullWidth
                type="password"
                label="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                sx={{ mt: 2 }}
              />
              {error && (
                <Typography color="error" sx={{ mt: 1 }}>
                  {error}
                </Typography>
              )}
              <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={verifyPassword}
                  color="success"
                >
                  Unlock
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Modal>
      {open && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            backgroundColor: "#fff",
            boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
            zIndex: 99999,
            paddingTop: "1rem",
            paddingBottom: "1rem",
          }}
        >
          <Keyboard onChange={handleKeyboardInput} input={keyboardInput} />
        </Box>
      )}
    </>
  );
};
