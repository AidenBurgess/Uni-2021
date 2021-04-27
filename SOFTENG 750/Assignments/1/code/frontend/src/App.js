import {
	Container,
	Typography,
	AppBar,
	Toolbar,
	makeStyles,
	CircularProgress,
} from "@material-ui/core";
import LoginButton from "./components/login-button";
import LogoutButton from "./components/logout-button";
import TodoList from "./components/TodoList";
import { useAuth0 } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({
	main: {
		display: "flex",
		flexDirection: "column",
		justifyContent: "flex-start",
		alignItems: "stretch",
	},
	title: {
		flexGrow: 1,
	},
}));

function App() {
	const classes = useStyles();
	const { isLoading, isAuthenticated, loginWithRedirect } = useAuth0();

	return (
		<>
			<AppBar position="fixed">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						My Todos
					</Typography>
					{isAuthenticated ? <LogoutButton /> : <LoginButton />}
				</Toolbar>
			</AppBar>
			<Container fixed>
				<Toolbar />
				<main className={classes.main}>
					{isLoading ? (
						<CircularProgress />
					) : isAuthenticated ? (
						<TodoList />
					) : (
						loginWithRedirect()
					)}
				</main>
			</Container>
		</>
	);
}

export default App;
