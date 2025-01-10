import { Box, Grid, Paper, Typography } from "@mui/material";
import { filterProducts, returnCategoryName } from "./products.motor";
import { PRODUCTS, Product } from "./products.model";
import { ProductCard } from "./product-card.component";
import classes from "./css/products-list.module.css";
// import { BasicModal } from "./modal-add-product.component";
import React from "react";

interface ProductsListProps {
  filter: string;
  products: Product[]; // Pass filtered products as a prop
}

export const ProductsList: React.FC<ProductsListProps> = ({
  filter,
  products,
}) => {
  const productsFiltered = filterProducts(products, filter);
  return (
    <Paper className={classes["products-container"]} elevation={5} square>
      <Grid container spacing={2}>
        {productsFiltered
          .filter((product) => product.enabled)
          .map((product, index) => (
            <Grid key={index} item xl={4} lg={4} md={4} sm={8} xs={12}>
              <ProductCard product={product} />
            </Grid>
          ))}
      </Grid>
    </Paper>
  );
};
