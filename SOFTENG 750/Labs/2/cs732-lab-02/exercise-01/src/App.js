import { Switch, Route, Redirect, useHistory } from "react-router-dom";
import { useState } from "react";
import initialArticles from "./data";
import NavBar from "./NavBar";
import CustomersPage from "./CustomersPage";
import AddCustomerPage from "./AddCustomerPage";

/**
 * Renders a navbar allowing the user to browse to the articles or gallery pages.
 * If the user tries to browse to any other URL, they are auto-redirected to the articles page.
 */
function App() {
	return (
		<div className="container">
			<nav>
				<NavBar />
			</nav>

			<Switch>
				<Route path="/customers">
					<CustomersPage />
				</Route>

				<Route path="*">
					<Redirect to="/customers" />
				</Route>
			</Switch>
		</div>
	);
}

export default App;
