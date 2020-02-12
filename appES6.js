class Book {
	constructor(title, author, isbn){
		this.title = title;
		this.author = author;
		this.isbn = isbn;
	}
}

class UI {
	// addBookToList is a method
	addBookToList(book){
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

	showAlert(message, className){

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

	deleteBook(target){
		if (target.className === 'delete') {
			target.parentElement.parentElement.remove();
		}
	}

	clearField(){
		document.getElementById('title').value = '';
		document.getElementById('author').value = '';
		document.getElementById('isbn').value = '';
	}
}


//##############################################
//##########    local storage class     ########
//##############################################

class Store {

	static getBooks(){
		let books;
		if (localStorage.getItem('books') === null) {
			books = [];
		} else {
			books = JSON.parse(localStorage.getItem('books'));
		}
		return books;
	}

	static displayBooks(){
		const books = Store.getBooks();

		books.forEach(function(book){
			const ui = new UI;

			// Add book to UI
			ui.addBookToList(book);
		});
	}

	static addBook(book){
		const books = Store.getBooks();

		books.push(book);

		localStorage.setItem('books', JSON.stringify(books));
	}

	static removeBook(isbn){
		const books = Store.getBooks();

		books.forEach(function(book, index){
			if(book.isbn === isbn){
				books.splice(index, 1);
			}
		});

		localStorage.setItem('books', JSON.stringify(books));
	}
}



// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);



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

		// Error alert
		ui.showAlert('Please fill in all fiellds.', 'error');

	} else {

		// Add book to list
		ui.addBookToList(book);

		// Add to LS
		Store.addBook(book);

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

	// Remove from LS
	Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

	// Show message
	ui.showAlert('Book Removed!', 'success');

	e.preventDefault();
});