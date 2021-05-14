import { Button } from "./button-schema";

export async function createButton(id) {
	// Return existing object if one exists with same id
	if (await Button.exists({ _id: id })) {
		return Button.findById(id);
	}
	const dbButton = new Button({ _id: id });
	const result = await dbButton.save();
	return dbButton;
}

export async function deleteButton(id) {
	return await Button.findByIdAndDelete(id);
}

export async function retrieveButton(id) {
	return await Button.findById(id);
}

export async function toggleButtonState(id) {
	const button = await Button.findById(id);
	const result = await Button.findByIdAndUpdate(id, {
		isPressed: !button.isPressed,
	});
	return result ? true : false;
}
