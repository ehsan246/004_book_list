// BOOK CONSTRUCTOR
function Book(title, author, isbn){
	this.title = title;
	this.author = author;
	this.isbn = isbn;
}

// UI CONSTRUCTOR
function UI(){
}

// Add Book To List
UI.prototype.addBookToList = function(book){
	// this will grab the TABLE BODY
	const list = document.getElementById('book-list');
	// Create tr element
	const row = document.createElement('tr');
	// Insert cols
	row.innerHTML = `
	<td>${book.title}</td>
	<td>${book.author}</td>
	<td>${book.isbn}</td>
	<td><a href="#" class="delete">X</a>	</td>
	`;
	// this will insert the row into table body
	list.appendChild(row);
}

// Show Alert
UI.prototype.showAlert = function(message, className){
	// Create div
	const div = document.createElement('div');
	
	// Add classes
	// this will add a defalt class and another which we passed here
	div.className = `alert ${className}`;

	// Add text
	div.appendChild(document.createTextNode(message));

	// Get parent
	const container = document.querySelector('.container');
	// Get form
	const form = document.querySelector('#book-form');

	// Insert alert
	container.insertBefore(div, form);

	// Timeout after 3 sec
	setTimeout(function(){
		document.querySelector('.alert').remove();
	}, 3000);
}


// Delete book
UI.prototype.deleteBook = function(target){
	if (target.className === 'delete') {
		target.parentElement.parentElement.remove();
	}
}


// Clear Fields
UI.prototype.clearFields = function(){
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('isbn').value = '';
}



// EVENT Listener for add book

document.getElementById('book-form').addEventListener('submit', function(e){
	// get form values
	const title = document.getElementById('title').value,
		  author = document.getElementById('author').value,
		  isbn = document.getElementById('isbn').value;

	// Instatiate book
	const book = new Book(title, author, isbn);

	// Instatiate UI
	const ui = new UI();

	// Validate
	if(title === '' || author === '' || isbn === ''){
		// Error aletr
		ui.showAlert('Please fill in all fiellds.', 'error');

	} else {

		// Add book to list
		ui.addBookToList(book);


		// Show success
		ui.showAlert('Book Added!', 'success');

		// Clear fields
		ui.clearFields();

	}

	e.preventDefault();
});


// Event Listener for delete
document.getElementById('book-list').addEventListener(
	'click', function(e){

	// Instatiate UI
	const ui = new UI();

	// Delete book
	ui.deleteBook(e.target);

	// Show message
	ui.showAlert('Book Removed!', 'error');

	e.preventDefault();
});