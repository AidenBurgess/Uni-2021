import React from "react";
import { useState } from "react";
import { initialCustomers } from "./data";

// Create the context
const AppContext = React.createContext({
	customers: initialCustomers,
});

function AppContextProvider({ children }) {
	// Stateful value initialization
	const [customers, setCustomers] = useState(initialCustomers);

	function addCustomers(newCustomer) {
		const newState = [...customers, newCustomer];
		setCustomers(newState);

		return newCustomer;
	}

	// The context value that will be supplied to any descendants of this component.
	const context = {
		customers,
		addCustomers,
	};

	// Wraps the given child components in a Provider for the above context.
	return (
		<AppContext.Provider value={context}>{children}</AppContext.Provider>
	);
}

export { AppContext, AppContextProvider };
