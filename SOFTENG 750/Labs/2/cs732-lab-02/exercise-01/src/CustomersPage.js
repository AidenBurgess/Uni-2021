import styles from "./CustomersPage.module.css";
import CustomerTable from "./CustomerTable";
import { useState } from "react";
import { initialCustomers } from "./data";
import AddCustomerButton from "./AddCustomerButton";
import { Switch, Route } from "react-router";
import AddCustomerPage from "./AddCustomerPage";
import dayjs from "dayjs";

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
						<AddCustomerPage
							customerId={customers.length + 1}
							addCustomer={(newCustomer) => {
								console.log(newCustomer);
								console.log(customers[0]);
								const newState = [...customers, newCustomer];
								setCustomers(newState);
							}}
						/>
					</Route>
					<AddCustomerButton />
				</Switch>
			</main>
		</>
	);
}
