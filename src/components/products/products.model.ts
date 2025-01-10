export interface Product {
  name: string;
  price: number;
  category: string;
  id: number;
  // Only for filtering
  variants?: boolean;
  // Only available if ProductVariant
  variantName?: string;
  SLV?: number;
  OPT?: number;
  MEG?: number;
  enabled?: boolean;
  img?: string;
}

export interface ProductVariant {
  name: string;
  variantName: String;
  price: number;
  category: string;
  id: number;
  originalId: number;
}

export const CATEGORIES = {
  BEERS: "Beers",
  SPIRITS: "Spirits",
  SODA: "Soda",
  ALL: "All",
};

// productData.ts
import productData from "./products.json"; // Path to your JSON file

// Build the PRODUCTS array from the JSON data
export const PRODUCTS: Product[] = productData.PRODUCTS.map((prod) => {
  return {
    ...prod,
    // Optionally transform or validate prod data here
  };
});

// Build the PRODUCT_VARIANTS array from the JSON data
export const PRODUCT_VARIANTS: ProductVariant[] =
  productData.PRODUCT_VARIANTS.map((variant) => {
    return {
      ...variant,
      // Optionally transform or validate variant data here
    };
  });
