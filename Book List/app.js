// Book Constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}


// UI Constructor
function UI(){}

// Add Book To List
UI.prototype.addBookToList = function(book){
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
UI.prototype.clearfields = function(){
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}

// Show alert
UI.prototype.showAlert = function(message, className){
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
UI.prototype.deleteBook = function(target) {
    if(target.className === 'delete') {
        target.parentElement.parentElement.remove();
    }
}
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

    // Show message
    ui.showAlert('Book Removed!', 'success');

    e.preventDefault();
 });












/*
If we have something on page that show up more than once with same class,
or something that is not there when page loads but its deynamically added -
for all this purpose we use Event Delegation.

So to target them elements, we target parents then simplify it down to dymanically
added Element.

*/