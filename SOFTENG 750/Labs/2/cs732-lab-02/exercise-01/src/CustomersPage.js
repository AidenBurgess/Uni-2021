import styles from "./CustomersPage.module.css";
import CustomerTable from "./CustomerTable";
import { useState } from "react";
import { initialCustomers } from "./data";
import AddCustomerButton from "./AddCustomerButton";
import { Switch, Route } from "react-router";
import AddCustomerPage from "./AddCustomerPage";

export default function CustomersPage() {
	const [customers, setCustomers] = useState(initialCustomers);

	return (
		<>
			<main>
				<div className="box">
					<CustomerTable customers={customers} />
				</div>
				<Switch>
					<Route path="/customers/add">
						<AddCustomerPage />
					</Route>
					<AddCustomerButton />
				</Switch>
			</main>
		</>
	);
}
