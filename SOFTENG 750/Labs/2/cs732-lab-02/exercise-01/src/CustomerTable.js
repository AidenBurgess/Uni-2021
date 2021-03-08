import styles from "./CustomerTable.module.css";
import dayjs from "dayjs";
import SortButton from "./SortButton";
import { useState } from "react";
import { sortCustomers, isActive } from "./data-sort-utils";
import createPersistedState from "use-persisted-state";
const useSortPropState = createPersistedState("sortProp");
const useSortDirState = createPersistedState("sortDir");

function makeSortButton(prop, sortProperty, sortDirection, onClick) {
	return (
		<SortButton
			prop={prop}
			mode={sortProperty === prop ? sortDirection : "none"}
			onClick={onClick}
		/>
	);
}

export default function CustomerTable({ customers }) {
	const [sortProperty, setSortProperty] = useSortPropState();
	const [sortDirection, setSortDirection] = useSortDirState();

	const handleSortButtonClick = (prop, newSortDirection) => {
		setSortProperty(newSortDirection === "none" ? "none" : prop);
		setSortDirection(newSortDirection);
	};

	const sortedCustomers = sortCustomers(
		customers,
		sortProperty,
		sortDirection
	);

	return (
		<table className={styles.table}>
			<thead>
				<tr>
					<th colSpan={4} className={styles.borderRight}>
						Personal details
					</th>
					<th colSpan={3}>Membership details</th>
				</tr>
				<tr>
					<th>
						ID{" "}
						{makeSortButton(
							"id",
							sortProperty,
							sortDirection,
							handleSortButtonClick
						)}
					</th>
					<th>
						First name{" "}
						{makeSortButton(
							"firstName",
							sortProperty,
							sortDirection,
							handleSortButtonClick
						)}
					</th>
					<th>
						Last name{" "}
						{makeSortButton(
							"lastName",
							sortProperty,
							sortDirection,
							handleSortButtonClick
						)}
					</th>
					<th className={styles.borderRight}>
						Date of birth{" "}
						{makeSortButton(
							"dob",
							sortProperty,
							sortDirection,
							handleSortButtonClick
						)}
					</th>
					<th>
						Active?{" "}
						{makeSortButton(
							"isActive",
							sortProperty,
							sortDirection,
							handleSortButtonClick
						)}
					</th>
					<th>
						Tier{" "}
						{makeSortButton(
							"membershipTier",
							sortProperty,
							sortDirection,
							handleSortButtonClick
						)}
					</th>
					<th>
						Expiry date{" "}
						{makeSortButton(
							"membershipExpires",
							sortProperty,
							sortDirection,
							handleSortButtonClick
						)}
					</th>
				</tr>
			</thead>
			<tbody>
				{sortedCustomers.map((customer) => (
					<tr
						key={customer.id}
						className={
							isActive(customer) ? styles.active : styles.inactive
						}
					>
						<td>{customer.id}</td>
						<td>{customer.firstName}</td>
						<td>{customer.lastName}</td>
						<td className={styles.borderRight}>
							{dayjs(customer.dob).format("ll")}
						</td>
						<td>{isActive(customer) ? "Yes" : "No"}</td>
						<td>{customer.membershipTier}</td>
						<td>{dayjs(customer.membershipExpires).calendar()}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
