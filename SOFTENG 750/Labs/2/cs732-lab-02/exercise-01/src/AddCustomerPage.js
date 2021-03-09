import Modal from "./Modal";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import dayjs from "dayjs";

export default function AddCustomerPage({ addCustomer, customerId }) {
	const history = useHistory();
	const [fname, setFName] = useState("");
	const [lname, setLName] = useState("");
	const [dob, setDob] = useState("");
	const [tier, setTier] = useState("Bronze");
	const [expiryDate, setExpiryDate] = useState("");

	return (
		<div>
			<Modal
				dismissOnClickOutside={true}
				onCancel={() => history.push("/customers")}
			>
				<h2>Personal Details</h2>
				<label for="fname">First name: </label>
				<input
					type="text"
					id="fname"
					name="fname"
					value={fname}
					onInput={(e) => setFName(e.target.value)}
				/>
				<br />
				<br />
				<label for="lname">Last name: </label>
				<input
					type="text"
					id="lname"
					name="lname"
					value={lname}
					onInput={(e) => setLName(e.target.value)}
				/>
				<br />
				<br />
				<label for="dob">Date of birth: </label>
				<input
					type="date"
					value={dob}
					onInput={(e) => setDob(e.target.value)}
				/>
				<h2>Membership Details</h2>
				<label for="tier">Tier: </label>
				<select
					name="tier"
					id="tier"
					value={tier}
					onInput={(e) => setTier(e.target.value)}
				>
					<option value="Bronze">Bronze</option>
					<option value="Silver">Silver</option>
					<option value="Gold">Gold</option>
					<option value="Platinum">Platinum</option>
				</select>
				<br />
				<br />
				<label for="expiryDate">Expiry date: </label>
				<input
					type="date"
					value={expiryDate}
					onInput={(e) => setExpiryDate(e.target.value)}
				/>
				<br />
				<br />
				<button
					onClick={() => {
						addCustomer({
							id: customerId,
							firstName: fname,
							lastName: lname,
							dob: dayjs(dob),
							membershipExpires: dayjs(expiryDate),
							membershipTier: tier,
						});
						history.push("/customers");
					}}
				>
					Submit
				</button>
				<br />
				<br />
			</Modal>
		</div>
	);
}
