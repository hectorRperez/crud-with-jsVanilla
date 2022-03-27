let baseUrl = 'http://localhost:5502/api/products/';

export async function getAllTask() {
	const response = await fetch(baseUrl);
	console.log(response);
	return response.json();
}

export async function deleteTask(taskId) {
	const requestOption = {
		method: 'DELETE',
		headers: { 'Content-Type': 'application/json' },
	};

	const response = await fetch(`${baseUrl}/${taskId}`, requestOption);
	console.log(response);
	return response.json();
}

export async function createProduct(newProduct) {
	const requestOption = {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(newProduct),
	};
	const data = await fetch(baseUrl, requestOption);
	return data.json();
}

export async function updateProduct(productId, product) {
	const requestOption = {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(product),
	};

	const response = await fetch(`${baseUrl}/${productId}`, requestOption);
	return response.json();
}
