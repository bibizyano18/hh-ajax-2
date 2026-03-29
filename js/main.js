'use strict';
let iconCount = 1;
let isDragSuccessful = false;
let clickX = 0;
let clickY = 0;
const element = document.querySelector('.element');
const body = document.querySelector('body');
const div_grid = document.querySelector('.grid');
const div_free = document.querySelector('.free');

const colors = ['red', 'green', 'yellow'];

function createNewIcon() {
	const newIcon = document.createElement('div');
	const randomNumber = Math.floor(Math.random() * 3); // рандомное число от 0 до 2
	newIcon.className = 'icon';
	newIcon.id = `icon-${iconCount}`;
	newIcon.setAttribute('draggable', 'true');
	newIcon.style.backgroundColor = colors[randomNumber];
	return newIcon;
}
function addEvents(icon) {
	icon.addEventListener('dragstart', (event) => {
		event.dataTransfer.dropEffect = 'move';
		event.target.classList.add('active');
		clickX = event.clientX - icon.getBoundingClientRect().left;
		clickY = event.clientY - icon.getBoundingClientRect().top;
		// console.log('drag');
	});
	icon.addEventListener('dragend', (event) => {
		event.target.classList.remove('active');
		if (!isDragSuccessful)
			event.target.remove();
		// console.log('drop by user');
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
		draggedElement.style.left = `${x - clickX}px`;
		draggedElement.style.top = `${y - clickY}px`;

		if (element.children.length === 0) {
			isDragSuccessful = true;
			iconCount++;
			const newIcon = createNewIcon();
			element.appendChild(newIcon);
			addEvents(newIcon);
		}
	}
	//console.log('dropped on free');
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
			isDragSuccessful = true;
			iconCount++;
			const newIcon = createNewIcon();
			element.appendChild(newIcon);
			addEvents(newIcon);
		}
	}
	//console.log('dropped on grid');
});

div_grid.addEventListener('dragover', (event) => {
	event.preventDefault();
	event.dataTransfer.dropEffect = "move";
});

body.addEventListener('drop', (event) => {
	if (!div_free.contains(event.target) && !div_grid.contains(event.target)) {
		event.preventDefault();
		isDragSuccessful = false;
	}
})
body.addEventListener('dragover', (event) => {
	event.preventDefault();
})