import { Container, Grid, IconButton } from "@mui/material";
import { ProductsList } from "../components/products/products-list.component";
import React from "react";
import { CartList } from "../components/cart/cart-list.component";
import classes from "./css/home.module.css";
import { NavListDrawer } from "../components/navbar/navbar-list-drawer.component";
import { CATEGORIES } from "../components/products/products.model";
import { useTranslation } from "react-i18next";
import dkFlag from "../../public/imgs/flags/dk.svg";
import deFlag from "../../public/imgs/flags/de.svg";
import gbFlag from "../../public/imgs/flags/gb.svg";
import gear from "../../public/imgs/flags/Gear icon.svg";
import { Modal, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { EditProductsModal } from "../components/products/editProductsModal";
import { Product, PRODUCTS } from "../components/products/products.model";

interface MainContainerProps {
  filter: string;
}

export const Home: React.FC<MainContainerProps> = (props) => {
  const [filter, setFilter] = React.useState<string>(CATEGORIES.ALL);
  const [language, setLanguage] = React.useState("dk");
  const [loading, setLoading] = React.useState(true);
  const [editProductsModal, setEditProductsModal] = React.useState(false);
  const [products, setProducts] = React.useState<Product[]>(PRODUCTS);

  useEffect(() => {
    fetch("http://127.0.0.1:8004/startup", {
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
        // Convert object to array if necessary
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  }, []);

  const drawerLinks = [
    { title: "Beers", filter: "Beers" },
    { title: "Spirits", filter: "Spirits" },
    { title: "Soda", filter: "Soda" },
    { title: "All", filter: "All" },
  ];

  const handleSave = (updatedProducts: Product[]) => {
    setProducts(updatedProducts);
    console.log("Updated Products:", updatedProducts);
  };

  const [t, i18n] = useTranslation("common");

  const handleChangeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setLanguage(lang);
  };

  const applyFilter = (category: string) => {
    setFilter(category);
  };

  return (
    <Container maxWidth="xl" className={classes["main-container"]}>
      {loading && (
        <Modal
          open={loading}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box className={classes["modal-style"]}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              {t("loading.title")}
            </Typography>
            <img
              src="https://media.tenor.com/UnFx-k_lSckAAAAM/amalie-steiness.gif"
              alt=""
            />
          </Box>
        </Modal>
      )}
      <Grid container spacing={1} alignItems="center">
        {/* Navigation Drawer */}
        <Grid item xl={8} lg={7} md={6} sm={6}>
          <NavListDrawer navLinks={drawerLinks} applyFilter={applyFilter} />
        </Grid>

        {/* Language Selector */}
        <Grid
          item
          xl={4}
          lg={5}
          md={6}
          sm={6}
          container
          justifyContent="flex-end"
          alignItems="center"
        >
          {/* DK Flag Button */}
          <IconButton
            size="medium"
            onClick={() => handleChangeLanguage("dk")}
            sx={{
              padding: 0,
              margin: "0 8px",
              "& img": { width: "32px", height: "24px" }, // Ensure consistent flag size
            }}
          >
            <img src={dkFlag} alt="Danish Flag" />
          </IconButton>

          {/* EN Flag Button */}
          <IconButton
            size="medium"
            onClick={() => handleChangeLanguage("en")}
            sx={{
              padding: 0,
              margin: "0 8px",
              "& img": { width: "32px", height: "24px" },
            }}
          >
            <img src={gbFlag} alt="English Flag" />
          </IconButton>

          {/* DE Flag Button */}
          <IconButton
            size="medium"
            onClick={() => handleChangeLanguage("de")}
            sx={{
              padding: 0,
              margin: "0 8px",
              "& img": { width: "32px", height: "24px" },
            }}
          >
            <img src={deFlag} alt="German Flag" />
          </IconButton>
          <IconButton
            size="medium"
            onClick={() => setEditProductsModal(true)}
            sx={{
              padding: 0,
              margin: "0 8px",
              "& img": { width: "32px", height: "24px" },
            }}
          >
            <img src={gear} alt="German Flag" />
          </IconButton>
        </Grid>
        <EditProductsModal
          open={editProductsModal}
          onClose={() => setEditProductsModal(false)}
          onSave={handleSave}
          products={products} // Pass the updated products
        />

        {/* Products List */}
        <Grid item xl={7.6} lg={7.6} md={7.6} sm={12}>
          <ProductsList filter={filter} products={products} />
        </Grid>

        {/* Cart List */}
        <Grid item xl={4.3} lg={4.3} md={4.4} className={classes["grid-items"]}>
          <CartList />
        </Grid>
      </Grid>
    </Container>
  );
};
