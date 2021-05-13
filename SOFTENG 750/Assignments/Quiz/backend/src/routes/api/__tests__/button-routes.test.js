import routes from "../button-routes";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import express from "express";
import axios from "axios";
import { Button } from "../../../database/button-schema";
import dayjs from "dayjs";

let mongod, app, server;

const endpoint = "http://localhost:3000/api/button";
const dummyId = "dummy";

// Start database and server before any tests run
beforeAll(async (done) => {
	mongod = new MongoMemoryServer();

	await mongod.getUri().then((cs) =>
		mongoose.connect(cs, {
			useNewUrlParser: true,
		})
	);

	app = express();
	app.use(express.json());
	app.use("/api/button", routes);
	server = app.listen(3000, done);
});

// Populate database with dummy data before each test
beforeEach(async () => {
	await Button.create({ _id: dummyId });
});

// Clear database after each test
afterEach(async () => {
	await Button.deleteMany({});
});

// Stop db and server before we finish
afterAll((done) => {
	server.close(async () => {
		await mongoose.disconnect();
		await mongod.stop();
		done();
	});
});

it("retrieves a button successfully", async () => {
	const response = await axios.get(`${endpoint}/${dummyId}`);
	expect(response.status).toBe(200);

	const isPressed = response.data;
	expect(isPressed).toBeFalsy();
});

it("toggles the button state successfully", async () => {
	const response = await axios.put(`${endpoint}/${dummyId}`);
	expect(response.status).toBe(204);

	const response2 = await axios.get(`${endpoint}/${dummyId}`);

	const isPressed = response2.data;
	expect(isPressed).toBeTruthy();
});

it("creates a button successfully", async () => {
	const newButton = "test";
	const response = await axios.post(`${endpoint}/${newButton}`);
	expect(response.status).toBe(201);

	const response2 = await axios.get(`${endpoint}/${newButton}`);
	const isPressed = response2.data;
	expect(isPressed).toBeFalsy();
});

it("deletes a button successfully", async () => {
	const response2 = await axios.delete(`${endpoint}/${dummyId}`);
	expect(response.status).toBe(201);

	try {
		const response3 = await axios.get(`${endpoint}/${dummyId}`);
		fail("Should have thrown an exception");
	} catch (err) {
		const { response } = err;
		expect(response).toBeDefined();
		expect(response.status).toBe(404);
	}
});
