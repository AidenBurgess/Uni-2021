import styles from "./AddCustomerButton.module.css";
import { Link } from "react-router-dom";

export default function AddCustomerButton() {
	return (
		<div className={styles.container}>
			<Link to="/customers/add">
				<button>Add Customer</button>
			</Link>
		</div>
	);
}
