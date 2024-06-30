let list = [];

// Function to get list items from local storage and render them on the webpage
function getList() {
	const storedList = JSON.parse(localStorage.getItem('list'));
	if (storedList) {
		list = storedList;
		renderList(); // Function to display the list items on the webpage
	}
}

// Function to save the list array to local storage
function saveList() {
	localStorage.setItem('list', JSON.stringify(list));
}

// Function to update local storage with current list array
function updateLocalStorage() {
	saveList(); // Calls the saveList() function to save the list array to local storage.
}

// Function to render the list items on the webpage
function renderList() {
	const ul = document.getElementById('myUL');
	ul.innerHTML = '';
	list.forEach(function (item) {
		const li = document.createElement('li');
		const t = document.createTextNode(item);
		li.appendChild(t);
		ul.appendChild(li);

		const span = document.createElement('SPAN');
		const txt = document.createTextNode('\u00D7');
		span.className = 'close';
		span.appendChild(txt);
		li.appendChild(span);

		// Event listener to remove item when close button is clicked
		span.onclick = function () {
			const div = this.parentElement;
			div.style.display = 'none';
			const item = div.firstChild.textContent;
			list.splice(list.indexOf(item), 1); // Remove item from list array
			updateLocalStorage(); // Update local storage
			const audio = new Audio('remove.mp3'); // Play audio effect for removing an item
			audio.play();
		};

		// Event listener to mark item as completed when clicked
		li.onclick = function () {
			this.classList.toggle('checked');
			const audio = new Audio('complete.mp3'); // Play audio effect for completing an item
			audio.play();
			updateLocalStorage(); // Update local storage
		};
	});
}

// Function to add a new item to the list
function newElement() {
	const inputValue = document.getElementById('myInput').value.trim();
	if (!inputValue) {
		alert('You must write something!');
		return;
	}

	const audio = new Audio('add.mp3'); // Play audio effect for adding an item
	const li = document.createElement('li');
	const t = document.createTextNode(inputValue);
	li.appendChild(t);
	document.getElementById('myUL').appendChild(li);

	const span = document.createElement('SPAN');
	const txt = document.createTextNode('\u00D7');
	span.className = 'close';
	span.appendChild(txt);
	li.appendChild(span);

	// Event listener to remove item when close button is clicked
	span.onclick = function () {
		const div = this.parentElement;
		div.style.display = 'none';
		const item = div.firstChild.textContent;
		list.splice(list.indexOf(item), 1); // Remove item from list array
		updateLocalStorage(); // Update local storage
		const audio = new Audio('remove.mp3'); // Play audio effect for removing an item
		audio.play();
	};

	// Event listener to mark item as completed when clicked
	li.onclick = function () {
		this.classList.toggle('checked');
		const audio = new Audio('complete.mp3'); // Play audio effect for completing an item
		audio.play();
		updateLocalStorage(); // Update local storage
	};

	list.push(inputValue); // Add item to list array
	saveList(); // Save list array to local storage
	audio.play(); // Play the sound when the Add button is clicked
	document.getElementById('myInput').value = ''; // The value of the input field is set to an empty string so that it is ready for the user to enter a new value.
}

// Get list items from local storage
getList();

// Get the input field
const input = document.getElementById('myInput');

// Execute a function when the user presses the Enter key
input.addEventListener('keydown', function (event) {
	if (event.key === 'Enter') {
		event.preventDefault(); // Prevent the default behavior of the Enter key
		newElement(); // Call the function to add a new list item
	}
});
