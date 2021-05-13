import express from "express";
import * as buttonDao from "../../database/button-dao";
import mongoose from "mongoose";

const HTTP_CREATED = 201;
const HTTP_NOT_FOUND = 404;
const HTTP_NO_CONTENT = 204;
const HTTP_BAD_REQUEST = 400;

const router = express.Router();

// Create button
router.post("/:id", async (req, res) => {
	const { id } = req.params;
	if (!id) {
		res.status(HTTP_BAD_REQUEST)
			.contentType("text/plain")
			.send("New buttons must have an id");
		return;
	}
	const newButton = await buttonDao.createButton(id);
	res.status(HTTP_CREATED)
		.header("location", `/api/button/${newButton._id}`)
		.json(newButton);
});

// Retrieve single button
router.get("/:id", async (req, res) => {
	const { id } = req.params;
	const button = await buttonDao.retrieveButton(id);
	if (button) {
		res.json(button.isPressed);
	} else {
		res.sendStatus(HTTP_NOT_FOUND);
	}
});

// Toggle button state
router.put("/:id", async (req, res) => {
	const { id } = req.params;
	const success = await buttonDao.toggleButtonState(id);
	res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
});

router.delete("/:id", async (req, res) => {
	const { id } = req.params;
	const success = await buttonDao.deleteButton(id);
	res.sendStatus(success ? HTTP_NO_CONTENT : HTTP_NOT_FOUND);
});
export default router;
