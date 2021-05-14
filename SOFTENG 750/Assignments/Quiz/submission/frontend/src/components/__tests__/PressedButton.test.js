import { render, fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import PressedButton from "./../PressedButton";

it("Renders a button initally with Unpressed text", () => {
	render(<PressedButton buttonId="test" />);

	expect(screen.queryByText("Unpressed")).not.toBeNull();
});

it("Changes button text to be pressed after click", () => {
	render(<PressedButton buttonId="test" />);

	const button = screen.getByText("Unpressed");
	fireEvent.click(button);

	expect(screen.queryByText("Pressed")).not.toBeNull();
});
