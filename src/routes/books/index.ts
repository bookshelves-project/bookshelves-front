import { api } from './_api';
import type { RequestHandler } from '@sveltejs/kit';
import type { ApiPaginateResponse, Book } from '$types';

export const get: RequestHandler = async () => {
	// locals.userid comes from src/hooks.js
	const response = await api('get', `books`);

	if (response.status === 404) {
		// user hasn't created a todo list.
		// start with an empty array
		return {
			body: {
				books: []
			}
		};
	}

	if (response.status === 200) {
		const api: ApiPaginateResponse<Book[]> = await response.json();

		return {
			body: {
				books: api.data
			}
		};
	}

	return {
		status: response.status
	};
};
