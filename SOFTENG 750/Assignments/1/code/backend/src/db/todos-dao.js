/**
 * This file contains functions which interact with MongoDB, via mongoose, to perform Todo-related
 * CRUD operations.
 */

import { Todo } from "./todos-schema";

// TODO Exercise Three: Implement the five functions below.

export async function createTodo(todo) {
	const dbTodo = new Todo(todo);
	await dbTodo.save();
	return dbTodo;
}

export async function retrieveAllTodos(user) {
	return await Todo.find({ user });
}

export async function retrieveTodo(id) {
	return await Todo.findOne({ _id: id });
}

export async function updateTodo(todo, user) {
	const result = await Todo.findOneAndUpdate(
		{ _id: todo._id, user: user },
		todo,
		{
			new: true,
			useFindAndModify: false,
		}
	);
	return result ? true : false;
}

export async function deleteTodo(id) {
	await Todo.deleteOne({ _id: id });
}
