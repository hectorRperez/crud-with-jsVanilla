import { getAllTask } from './service.js';
import { deleteTask } from './service.js';
import { createProduct } from './service.js';
import { updateProduct } from './service.js';

const response = await getAllTask();

const tbody = document.querySelector('tbody');
let resultados = '';

var myModal = new bootstrap.Modal(document.getElementById('exampleModal'));
const formProduct = document.querySelector('form');
const btnCrearProduct = document.querySelector('#btnCrearProduct');

//---------------- Inputs ----------------
const inputDescription = document.getElementById('exampleInputDescription');
const inputPrice = document.getElementById('exampleInputPrice');
const inputStock = document.getElementById('exampleInputStock');
const addProduct = document.getElementById('addProduct');

let opcion = '';
let idProduct;

const mostrarData = (params) => {
	params.forEach((items) => {
		resultados += ` <tr id="padre">
		<th scope="ro" id="itemId">${items.id}</th>
		<td>${items.description}</td>
		<td>${items.price}</td>
		<td>${items.stock}</td>
		<td>
		<button class="btn btn-primary btnEditarElement">Editar</button>
		<button class="btn btn-danger btnBorrarElement">Borrar</button>
		</td>
		</tr>`;
	});

	tbody.innerHTML = resultados;
};

mostrarData(response);

let btnEditarElement = document.querySelectorAll('.btnEditarElement');
let btnElements = document.querySelectorAll('.btnBorrarElement');
let padre = document.querySelector('#padre');

btnCrearProduct.addEventListener('click', () => {
	inputDescription.value = '';
	inputPrice.value = ' ';
	inputStock.value = ' ';

	opcion = 'registrar';
	console.log(opcion);
});

//borrar item de la lista
btnElements.forEach((item) => {
	item.addEventListener('click', () => {
		let padreBtn = item.parentElement;
		let id = padreBtn.parentElement.firstElementChild.innerText;

		alertify.confirm(
			'Confirm Title',
			'Confirm Message',
			function () {
				alertify.success('Ok');
				deleteTask(id);
				location.reload();
			},
			function () {
				alertify.error('Cancel');
			}
		);
	});
});

//Registrar nuevo producto
addProduct.addEventListener('click', (e) => {
	if (opcion === 'registrar') {
		const product = {};

		product.description = inputDescription.value;
		product.price = inputPrice.value;
		product.stock = inputStock.value;

		createProduct(product);

		e.preventDefault();
		myModal.hide();
		location.reload();
	} else if (opcion === 'editar') {
		const product = {};

		product.description = inputDescription.value;
		product.price = inputPrice.value;
		product.stock = inputStock.value;

		updateProduct(idProduct, product);
		e.preventDefault();
		myModal.hide();
		location.reload();
	}
});

//Editar producto
btnEditarElement.forEach((item) => {
	item.addEventListener('click', () => {
		let padreBtn = item.parentElement;

		let id = padreBtn.parentElement.children[0].innerText;
		let description = padreBtn.parentElement.children[1].innerText;
		let precio = padreBtn.parentElement.children[2].innerText;
		let stock = padreBtn.parentElement.children[3].innerText;

		myModal.show();

		idProduct = id;
		inputDescription.value = description;
		inputPrice.value = precio;
		inputStock.value = stock;
		opcion = 'editar';
		console.log(opcion);
	});
});
