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

export const PRODUCTS: Product[] = [
  {
    name: "Classic",
    price: 3.0,
    category: CATEGORIES.BEERS,
    id: 1,
    SLV: 0,
    OPT: 0,
    MEG: 0,
    enabled: true,
    img: "Classic.png",
  },
  {
    name: "Pilsner",
    price: 3.5,
    category: CATEGORIES.BEERS,
    id: 2,
    SLV: 0,
    OPT: 0,
    MEG: 0,
    enabled: true,
    img: "Pilsner.png",
  },
  {
    name: "Rum",
    price: 3.0,
    category: CATEGORIES.SPIRITS,
    id: 3,
    SLV: 0,
    OPT: 0,
    MEG: 0,
    enabled: true,
    variants: true,
    img: "Rum.png",
  },
  {
    name: "Pepsi",
    price: 3.5,
    category: CATEGORIES.SODA,
    id: 4,
    SLV: 0,
    OPT: 0,
    MEG: 0,
    enabled: true,
    img: "Pepsi.svg",
  },
  {
    name: "Sprite",
    price: 3.5,
    category: CATEGORIES.SODA,
    id: 5,
    SLV: 0,
    OPT: 0,
    MEG: 0,
    enabled: true,
    img: "Sprite.png",
  },
];

export const PRODUCT_VARIANTS: ProductVariant[] = [
  {
    name: "Rum",
    variantName: "Pepsi",
    price: 4.0,
    category: CATEGORIES.SPIRITS,
    id: 101,
    originalId: 3,
  },
  {
    name: "Rum",
    variantName: "Sprite",
    price: 4.0,
    category: CATEGORIES.SPIRITS,
    id: 102,
    originalId: 3,
  },
  {
    name: "Rum",
    variantName: "None",
    price: 3.0,
    category: CATEGORIES.SPIRITS,
    id: 103,
    originalId: 3,
  },
  // {
  //   name: "Rum",
  //   variantName: "Faxe Kondi",
  //   price: 3.0,
  //   category: CATEGORIES.SPIRITS,
  //   id: 104,
  //   originalId: 3,
  // },
  // {
  //   name: "Rum",
  //   variantName: "Soda",
  //   price: 3.0,
  //   category: CATEGORIES.SPIRITS,
  //   id: 105,
  //   originalId: 3,
  // },
  // {
  //   name: "Rum",
  //   variantName: "Fanta",
  //   price: 3.0,
  //   category: CATEGORIES.SPIRITS,
  //   id: 106,
  //   originalId: 3,
  // },
];
