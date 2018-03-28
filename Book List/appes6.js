// Book Constructor
class Book{
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    } 
}


// UI Constructor
class UI{
// Add Book To List
addBookToList(book){
    const list = document.getElementById('book-list');

    // Create tr element
    const row =document.createElement('tr');

    // Insert Cols
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="delete">X</a></td>
    `;

    list.appendChild(row);
}

// Clear fields
clearfields(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}


// Show alert
showAlert(message, className){
    // Create a div
    const div = document.createElement('div');
    //Add classes
    div.className = `alert ${className}`;
    //Add text
    div.appendChild(document.createTextNode(message));
    //Get parent
    const container = document.querySelector('.container');

    const form = document.querySelector('#book-form');
    
    // Insert alert
    container.insertBefore(div,form);
    
    // Timout after 3 sec
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);

}

// Delete Book
deleteBook(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}
}


// Local Storage Class
class Store {
    static getBooks() {
      let books;
      // check local storage

      if(localStorage.getItem('books') === null) {
          books = [];
      } else {
          books = JSON.parse(localStorage.getItem('books'));
      }

      return books;
    }

    static  displayBooks() {
      const books = Store.getBooks();

      books.forEach(function(book){
          const ui = new UI();

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
           if(book.isbn === isbn) {
               books.splice(index,1)
           }
        });

        localStorage.setItem('books', JSON.stringify(books));
        
    }
}

// DOM Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listener
document.getElementById('book-form').addEventListener('submit', function(e){
    // Get form values
    const title = document.getElementById('title').value,
          author = document.getElementById('author').value,
          isbn = document.getElementById('isbn').value;

    // Intantiate Book constructor
    const book = new Book(title, author, isbn);
    
    // Intantiate UI constructor
    const ui = new UI();

    // Validate
    if(title === '' || author === '' || isbn === ''){
        // Error alert
        ui.showAlert('Please fill in all fields', 'error');

    } else {
        // Add book to list
        ui.addBookToList(book);
        
        // Add to Local storage
        Store.addBook(book);

        // Show Success
        ui.showAlert('Book Added', 'success');

        // Clear fields
        ui.clearfields();
    }

    
    e.preventDefault();
});


// Event Listener for Delete
 document.getElementById('book-list').addEventListener('click', function(e){
    // Instantiate UI
    const ui = new UI();
    
    // Delete book
    ui.deleteBook(e.target);
    
    // Remove from LS - using isbn number
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    // Show message
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();
 });