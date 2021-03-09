import styles from "./CustomersPage.module.css";
import CustomerTable from "./CustomerTable";
import { useContext, useState } from "react";
import AddCustomerButton from "./AddCustomerButton";
import { Switch, Route } from "react-router";
import AddCustomerPage from "./AddCustomerPage";
import dayjs from "dayjs";
import { AppContext } from "./AppContextProvider";

export default function CustomersPage() {
	const { customers, addCustomers } = useContext(AppContext);

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
							addCustomer={(newCustomer) =>
								addCustomers(newCustomer)
							}
						/>
					</Route>
					<AddCustomerButton />
				</Switch>
			</main>
		</>
	);
}
