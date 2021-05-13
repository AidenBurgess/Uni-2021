import { useState, useEffect } from "react";
import ToggleButton from "@material-ui/lab/ToggleButton";
import axios from "axios";
import { emojisplosion } from "emojisplosion";
import ReactAudioPlayer from "react-audio-player";
import song from "./../omae.mp3";

function PressedButton(props) {
	const [pressed, setPressed] = useState(false);
	const endpoint = `http://localhost:3001/api/button/${props.buttonId}`;
	const emojis = ["🔥", "😂", "🤣", "😩", "😫", "👌", "🥺", "👏", "💀", "👄"];

	useEffect(() => {
		async function getPressed() {
			try {
				const response = await axios.get(endpoint);
				setPressed(response.data);
			} catch (err) {
				if (err.status === 404) {
					await axios.post(endpoint);
				}
			}
		}
		getPressed();
	}, []);

	async function togglePressed() {
		emojisplosion({ emojis });
		setPressed(!pressed);
		await axios.put(endpoint);
	}

	return (
		<div
			className={pressed ? "pressed" : "unpressed"}
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "center",
				width: "100vw",
				height: "100vh",
			}}
		>
			<ToggleButton
				value="check"
				selected={pressed}
				onChange={togglePressed}
			>
				{pressed ? <p>Pressed</p> : <p>Unpressed</p>}
			</ToggleButton>
			{pressed && <ReactAudioPlayer src={song} autoPlay />}
		</div>
	);
}

export default PressedButton;
