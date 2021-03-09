import styles from "./NavBar.module.css";
import { NavLink } from "react-router-dom";
import { AppContext } from "./AppContextProvider";
import { useContext } from "react";

function countTier(customers, tier) {
	return customers.filter((customer) => customer.membershipTier === tier)
		.length;
}

export default function NavBar() {
	const { customers } = useContext(AppContext);
	const numBronze = countTier(customers, "Bronze");
	const numSilver = countTier(customers, "Silver");
	const numGold = countTier(customers, "Gold");
	const numPlatinum = countTier(customers, "Platinum");

	return (
		<div className={styles.navBar}>
			<NavLink to="/customers" activeClassName={styles.activeLink}>
				Customers
			</NavLink>
			<p>
				Customer details: Bronze: {numBronze}, Silver: {numSilver},
				Gold: {numGold}, Platinum: {numPlatinum}.{" "}
				<strong>Total: </strong>
				{customers.length}
			</p>
		</div>
	);
}
