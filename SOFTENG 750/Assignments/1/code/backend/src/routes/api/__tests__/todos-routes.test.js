import routes from "../todos-routes";
import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import express from "express";
import axios from "axios";
import connectToDatabase from "../../../db/db-connect";
import { Todo } from "../../../db/todos-schema";
import dayjs from "dayjs";
import { getToken } from "../fixtures";
import checkJwt from "./../../../auth/jwt";
import { auth0 } from "../../../../config";
const request = require("request-promise-native");
const nock = require("nock");

let mongod, app, server;

const nockReply = {
	keys: [
		{
			alg: "RS256",
			kty: "RSA",
			use: "sig",
			n: "x8ezF9UB_OgRSnRy-NRYbCw6r7gwsE9U4jyn85QqbJkS-t964HDcAlCJIDmunodIVGHqVGK3YV8JGSXyBHGXeicAT_OO0Yz05neCvlvvGlRNYVeKKNjkZM2McELWCXaPTFhfqkW_xitWlJSx6wSt26_fH7LBYYX-ywq9fSCXTvdIhbIbPLMfPmXvxNprNfz4VzXeNpr9oYdshsY_oELl1d13rE2TuHtTvjlgMyqPkqkigaifWd1qR5CdFpDp6FoxGa7IaDkCIQEnVplf3rnyBkfwis0lN25S1GFEZbKF3eRix7DiXj7HTBkaCUc8BSZOK118u5tc0cQdIOBzANQyBQ", //eslint-disable-line max-len
			e: "AQAB",
			kid: "0",
		},
	],
};

nock(auth0.issuer)
	.persist()
	.get("/.well-known/jwks.json")
	.reply(200, nockReply);

// Some dummy data to test with
const anotherUserTodo = {
	_id: new mongoose.mongo.ObjectId("000000000000000000000002"),
	user: "another@gmail.com",
	title: "OverdueTitle",
	description: "OverdueDesc",
	isComplete: false,
	dueDate: dayjs().subtract(1, "day").format(),
};

const upcomingTodo = {
	_id: new mongoose.mongo.ObjectId("000000000000000000000003"),
	user: "someone@gmail.com",
	title: "UpcomingTitle",
	description: "UpcomingDesc",
	isComplete: false,
	dueDate: dayjs().add(1, "day").format(),
};

const completeTodo = {
	_id: new mongoose.mongo.ObjectId("000000000000000000000004"),
	user: "someone@gmail.com",
	title: "CompleteTitle",
	description: "CompleteDesc",
	isComplete: true,
	dueDate: dayjs().format(),
};

const dummyTodos = [anotherUserTodo, upcomingTodo, completeTodo];

const endpoint = "http://localhost:3000/api/todos/";

// Start database and server before any tests run
beforeAll(async (done) => {
	mongod = new MongoMemoryServer();

	await mongod.getUri().then((cs) => connectToDatabase(cs));

	app = express();
	app.use(express.json());
	app.use("/api/todos", routes);

	server = app.listen(3000, done);
});

// Populate database with dummy data before each test
beforeEach(async () => {
	// await Todo.insert
	await Todo.insertMany(dummyTodos);
});

// Clear database after each test
afterEach(async () => {
	await Todo.deleteMany({});
});

// Stop db and server before we finish
afterAll((done) => {
	server.close(async () => {
		await mongoose.disconnect();
		await mongod.stop();
		done();
	});
});

const getHeader = () => {
	const token = getToken();
	const header = {
		headers: {
			authorization: `Bearer ${token}`,
		},
	};
	return header;
};

const validateTodo = (expectedTodo, actualTodo, checkId = true) => {
	if (checkId) {
		expect(expectedTodo._id.toString()).toEqual(actualTodo._id.toString());
	}
	expect(expectedTodo.user).toEqual(actualTodo.user);
	expect(expectedTodo.title).toEqual(actualTodo.title);
	expect(expectedTodo.description).toEqual(actualTodo.description);
	expect(expectedTodo.isComplete).toEqual(actualTodo.isComplete);
	expect(dayjs(expectedTodo.dueDate)).toEqual(dayjs(actualTodo.dueDate));
};

it("retrieves all todos successfully", async () => {
	const response = await axios.get(`${endpoint}`, getHeader());

	expect(response.status).toBe(200);
	const responseTodos = response.data;
	// Two of the todos are our own
	expect(responseTodos.length).toBe(2);

	// First todo is not our own so exclude that from being checked
	for (let i = 1; i < responseTodos.length; i++) {
		const responseTodo = responseTodos[i - 1];
		const expectedTodo = dummyTodos[i];
		validateTodo(expectedTodo, responseTodo);
	}
});

it("retrieves a single todo successfully", async () => {
	const response = await axios.get(
		`${endpoint}/000000000000000000000003`,
		getHeader()
	);
	expect(response.status).toBe(200);

	const responseTodo = response.data;
	validateTodo(upcomingTodo, responseTodo);
});

it("returns a 404 when attempting to retrieve a nonexistant todo (valid id)", async () => {
	try {
		await axios.get(`${endpoint}/000000000000000000000001`, getHeader());
		fail("Should have thrown an exception.");
	} catch (err) {
		const { response } = err;
		expect(response).toBeDefined();
		expect(response.status).toBe(404);
	}
});

it("returns a 400 when attempting to retrieve a nonexistant todo (invalid id)", async () => {
	try {
		await axios.get(`${endpoint}/blah`, getHeader());
		fail("Should have thrown an exception.");
	} catch (err) {
		const { response } = err;
		expect(response).toBeDefined();
		expect(response.status).toBe(400);
		expect(response.data).toBe("Invalid ID");
	}
});

it("Creates a new todo", async () => {
	const newTodo = {
		user: "someone@gmail.com",
		title: "NewTodo",
		description: "NewDesc",
		isComplete: false,
		dueDate: dayjs("2100-01-01").format(),
	};

	const response = await axios.post(
		"http://localhost:3000/api/todos",
		newTodo,
		getHeader()
	);

	// Check response is as expected
	expect(response.status).toBe(201);
	expect(response.data).toBeDefined();

	const rTodo = response.data;
	validateTodo(newTodo, rTodo, false);
	expect(rTodo._id).toBeDefined();
	expect(response.headers.location).toBe(`/api/todos/${rTodo._id}`);

	// Check that the todo was actually added to the database
	const dbTodo = await Todo.findById(rTodo._id);
	validateTodo(newTodo, dbTodo, false);
});

it("Gives a 400 when trying to create a todo with no title", async () => {
	try {
		const newTodo = {
			user: "someone@gmail.com",
			description: "NewDesc",
			isComplete: false,
			dueDate: dayjs("2100-01-01").format(),
		};

		await axios.post(
			"http://localhost:3000/api/todos",
			newTodo,
			getHeader()
		);
		fail("Should have thrown an exception.");
	} catch (err) {
		// Ensure response is as expected
		const { response } = err;
		expect(response).toBeDefined();
		expect(response.status).toBe(400);

		// Ensure DB wasn't modified
		expect(await Todo.countDocuments()).toBe(3);
	}
});

it("updates a todo successfully", async () => {
	const toUpdate = {
		_id: new mongoose.mongo.ObjectId("000000000000000000000004"),
		user: "someone@gmail.com",
		title: "UPDCompleteTitle",
		description: "UPDCompleteDesc",
		isComplete: false,
		dueDate: dayjs("2100-01-01").format(),
	};

	const response = await axios.put(
		`${endpoint}/000000000000000000000004`,
		toUpdate,
		getHeader()
	);

	// Check response
	expect(response.status).toBe(204);

	// Ensure DB was updated
	const dbTodo = await Todo.findById("000000000000000000000004");
	validateTodo(toUpdate, dbTodo);
});

it("Uses the path ID instead of the body ID when updating", async () => {
	const toUpdate = {
		_id: new mongoose.mongo.ObjectId("000000000000000000000003"),
		title: "UPDCompleteTitle",
		description: "UPDCompleteDesc",
		isComplete: false,
		dueDate: dayjs("2100-01-01").format(),
	};

	const response = await axios.put(
		`${endpoint}/000000000000000000000004`,
		toUpdate,
		getHeader()
	);

	// Check response
	expect(response.status).toBe(204);

	// Ensure correct DB entry was updated
	let dbTodo = await Todo.findById("000000000000000000000004");
	expect(dbTodo.title).toBe("UPDCompleteTitle");
	expect(dbTodo.description).toBe("UPDCompleteDesc");
	expect(dbTodo.isComplete).toBe(false);
	expect(dayjs(dbTodo.dueDate)).toEqual(dayjs("2100-01-01"));

	// Ensure incorrect DB entry was not updated
	dbTodo = await Todo.findById("000000000000000000000003");
	expect(dbTodo.title).toBe("UpcomingTitle");
	expect(dbTodo.description).toBe("UpcomingDesc");
	expect(dbTodo.isComplete).toBe(false);
	expect(dayjs(dbTodo.dueDate)).toEqual(dayjs(upcomingTodo.dueDate));
});

it("Gives a 404 when updating a nonexistant todo", async () => {
	try {
		const toUpdate = {
			_id: new mongoose.mongo.ObjectId("000000000000000000000010"),
			title: "UPDCompleteTitle",
			description: "UPDCompleteDesc",
			isComplete: false,
			dueDate: dayjs("2100-01-01").format(),
		};

		await axios.put(
			`${endpoint}/000000000000000000000010`,
			toUpdate,
			getHeader()
		);
		fail("Should have returned a 404");
	} catch (err) {
		const { response } = err;
		expect(response).toBeDefined();
		expect(response.status).toBe(404);

		// Make sure something wasn't added to the db
		expect(await Todo.countDocuments()).toBe(3);
	}
});

it("Deletes a todo", async () => {
	const response = await axios.delete(
		`${endpoint}/000000000000000000000003`,
		getHeader()
	);
	expect(response.status).toBe(204);

	// Check db item was deleted
	expect(await Todo.findById("000000000000000000000003")).toBeNull();
});

it("Doesn't delete anything when it shouldn't", async () => {
	const response = await axios.delete(
		`${endpoint}/000000000000000000000010`,
		getHeader()
	);
	expect(response.status).toBe(204);

	// Make sure something wasn't deleted from the db
	expect(await Todo.countDocuments()).toBe(3);
});

const ensureNoChangeInDB = async () => {
	// Make sure there are the same number of todos
	expect(await Todo.countDocuments()).toBe(3);

	// Ensure no todos were modified
	const responseTodos = await Todo.find({});
	for (let i = 0; i < responseTodos.length; i++) {
		const responseTodo = responseTodos[i];
		const expectedTodo = dummyTodos[i];
		validateTodo(expectedTodo, responseTodo);
	}
};

it("Gives a 401 when trying to get all todos when unauthenticated", async () => {
	try {
		await axios.get(`${endpoint}`);
		fail("Should have returned a 401");
	} catch (err) {
		const { response } = err;
		expect(response).toBeDefined();
		expect(response.status).toBe(401);

		await ensureNoChangeInDB();
	}
});

it("Gives a 401 when trying to get a single todo when unauthenticated", async () => {
	try {
		await axios.get(`${endpoint}000000000000000000000001`);
		fail("Should have returned a 401");
	} catch (err) {
		const { response } = err;
		expect(response).toBeDefined();
		expect(response.status).toBe(401);

		await ensureNoChangeInDB();
	}
});

it("Gives a 401 when trying to create a todo when unauthenticated", async () => {
	try {
		const newTodo = {
			user: "someone@gmail.com",
			title: "NewTodo",
			description: "NewDesc",
			isComplete: false,
			dueDate: dayjs("2100-01-01").format(),
		};

		const response = await axios.post(
			"http://localhost:3000/api/todos",
			newTodo
		);
		fail("Should have returned a 401");
	} catch (err) {
		const { response } = err;
		expect(response).toBeDefined();
		expect(response.status).toBe(401);

		await ensureNoChangeInDB();
	}
});

it("Gives a 401 when trying to update a todo when unauthenticated", async () => {
	try {
		const toUpdate = {
			_id: new mongoose.mongo.ObjectId("000000000000000000000004"),
			user: "someone@gmail.com",
			title: "UPDCompleteTitle",
			description: "UPDCompleteDesc",
			isComplete: false,
			dueDate: dayjs("2100-01-01").format(),
		};

		const response = await axios.put(
			`${endpoint}000000000000000000000004`,
			toUpdate
		);
		fail("Should have returned a 401");
	} catch (err) {
		const { response } = err;
		expect(response).toBeDefined();
		expect(response.status).toBe(401);

		await ensureNoChangeInDB();
	}
});

it("Gives a 401 when trying to delete a todo when unauthenticated", async () => {
	try {
		const response = await axios.delete(
			`${endpoint}000000000000000000000003`
		);
		fail("Should have returned a 401");
	} catch (err) {
		const { response } = err;
		expect(response).toBeDefined();
		expect(response.status).toBe(401);

		await ensureNoChangeInDB();
	}
});

it("Gives a 401 when trying to get todo that does not belong to the user", async () => {
	try {
		await axios.get(`${endpoint}000000000000000000000002`, getHeader());
		fail("Should have returned a 401");
	} catch (err) {
		const { response } = err;
		expect(response).toBeDefined();
		expect(response.status).toBe(401);
	}
});

it("Gives a 401 when trying to update todo that does not belong to the user", async () => {
	try {
		const toUpdate = {
			title: "Different title",
			description: "Different Desc",
			isComplete: false,
			dueDate: dayjs("2100-01-01").format(),
		};

		await axios.put(
			`${endpoint}000000000000000000000002`,
			toUpdate,
			getHeader()
		);
		fail("Should have returned a 401");
	} catch (err) {
		const { response } = err;
		expect(response).toBeDefined();
		expect(response.status).toBe(401);

		await ensureNoChangeInDB();
	}
});

it("Gives a 401 when trying to delete todo that does not belong to the user", async () => {
	try {
		await axios.delete(`${endpoint}000000000000000000000002`, getHeader());
		fail("Should have returned a 401");
	} catch (err) {
		const { response } = err;
		expect(response).toBeDefined();
		expect(response.status).toBe(401);

		await ensureNoChangeInDB();
	}
});
