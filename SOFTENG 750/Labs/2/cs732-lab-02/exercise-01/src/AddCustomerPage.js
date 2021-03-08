import Modal from "./Modal";
import { useHistory } from "react-router-dom";

export default function AddCustomerPage() {
	const history = useHistory();
	return (
		<div>
			<Modal
				dismissOnClickOutside={true}
				onCancel={() => history.push("/customers")}
			>
				<p>xd</p>
			</Modal>
		</div>
	);
}
