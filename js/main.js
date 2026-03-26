'use strict';
let iconCount = 1;
const icon = document.getElementById(`icon-${iconCount}`);
const div_grid = document.querySelector('.grid');
const div_free = document.querySelector('.free');

icon.addEventListener('dragstart', (event) => {
	event.dataTransfer.setData('text/plain', event.target.id);
	event.dataTransfer.dropEffect = 'move';
	event.target.classList.add('active');
	console.log('drag');
});

icon.addEventListener('dragend', (event) => {
	event.target.classList.remove('active');
	console.log('drop by user');
});

div_free.addEventListener('drop', (event) => {
	event.preventDefault();
	const draggedElement = document.querySelector('.active');
	if (draggedElement) {
		// получаем координаты drop относительно div_free
		const rect = div_free.getBoundingClientRect();
		const x = event.clientX - rect.left;
		const y = event.clientY - rect.top;

		div_free.appendChild(draggedElement);

		draggedElement.style.position = 'absolute';
		draggedElement.style.left = `${x - (draggedElement.offsetWidth / 2)}px`;
		draggedElement.style.top = `${y - (draggedElement.offsetHeight / 2)}px`;
	}
	console.log('dropped on free');
});

div_free.addEventListener('dragover', (event) => {
	event.preventDefault();
	event.dataTransfer.dropEffect = "move";
});

div_grid.addEventListener('drop', (event) => {
	event.preventDefault();
	const draggedElement = document.querySelector('.active');
	if (draggedElement) {
		// сбрасываем абсолютное позиционирование
		draggedElement.style.position = '';
		draggedElement.style.left = '';
		draggedElement.style.top = '';

		div_grid.appendChild(draggedElement);
	}
	console.log('dropped on grid');
});

div_grid.addEventListener('dragover', (event) => {
	event.preventDefault();
	event.dataTransfer.dropEffect = "move";
});