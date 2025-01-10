import { enqueueSnackbar } from "notistack";

export const openSnackBarProductAdded = (name: string, price: number) => {
  enqueueSnackbar(`${name} added! (${price.toFixed(2)}Kr)`, {
    variant: "success",
    style: { opacity: "90%" },
  });
};

export const openSnackBarOrderRegistered = (id: string) => {
  enqueueSnackbar(`Order ${id} successfully registered!`, {
    variant: "success",
    style: { opacity: "90%" },
  });
};

export const openSnackBarDeleteProduct = (name: string) => {
  enqueueSnackbar(`${name} deleted!`, {
    variant: "error",
    style: { opacity: "90%" },
  });
};
