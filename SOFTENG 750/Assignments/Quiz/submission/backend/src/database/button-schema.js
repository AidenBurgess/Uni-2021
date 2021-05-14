import mongoose from "mongoose";

const Schema = mongoose.Schema;

const buttonSchema = new Schema(
	{
		_id: { type: String, required: true },
		isPressed: { type: Boolean, required: true, default: false },
	},
	{
		timestamps: {},
	}
);

const Button = mongoose.model("Button", buttonSchema);

export { Button };
