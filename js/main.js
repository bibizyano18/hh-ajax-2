'use strict';
let iconCount = 1;
const element = document.querySelector('.element');
const div_grid = document.querySelector('.grid');
const div_free = document.querySelector('.free');

const roots = ['assets/folder-svgrepo-com.svg', 'assets/plus-svgrepo-com.svg', 'assets/reload-svgrepo-com.svg']

function createNewIcon() {
	const newIcon = document.createElement('img');
	const randomNumber = Math.floor(Math.random() * 3); // рандомное число от 0 до 2
	newIcon.src = roots[randomNumber];
	newIcon.alt = 'logo';
	newIcon.className = 'icon';
	newIcon.id = `icon-${iconCount}`;
	newIcon.setAttribute('draggable', 'true');
	return newIcon;
}
function addEvents(icon) {
	icon.addEventListener('dragstart', (event) => {
		event.dataTransfer.dropEffect = 'move';
		event.target.classList.add('active');
		console.log('drag');
	});

	icon.addEventListener('dragend', (event) => {
		event.target.classList.remove('active');
		console.log('drop by user');
	});
}

let currentIcon = document.getElementById(`icon-${iconCount}`);
if (currentIcon) {
	addEvents(currentIcon);
}

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

		if (element.children.length === 0) {
			iconCount++;
			const newIcon = createNewIcon();
			element.appendChild(newIcon);
			addEvents(newIcon);
		}
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

		if (element.children.length === 0) {
			iconCount++;
			const newIcon = createNewIcon();
			element.appendChild(newIcon);
			addEvents(newIcon);
		}
	}
	console.log('dropped on grid');
});

div_grid.addEventListener('dragover', (event) => {
	event.preventDefault();
	event.dataTransfer.dropEffect = "move";
});