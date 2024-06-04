import { Button } from "@mui/material";
import { useSnackbar } from "notistack";

export const AlertMessage: React.FC = () => {
	const {enqueueSnackbar} = useSnackbar();

	const handleClick = () => {
		enqueueSnackbar("Product Added!", {variant: "success"});
	}
	return (
		<>
			<h1>Login</h1>
			<Button variant="contained" onClick={handleClick}>Open</Button>
		</>
	);
}