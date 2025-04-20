// Get the borrowed books list from localStorage
const borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

// Populate the borrowed books list dynamically
const borrowedBooksContainer = document.querySelector(".borrowed-books-container");

if (borrowedBooks.length > 0) {
    borrowedBooks.forEach((book) => {
        const bookItem = document.createElement("div");
        bookItem.className = "borrowed-book";
        bookItem.innerHTML = `
            <img src="${book.image}" alt="Book Cover">
            <h3>${book.title}</h3>
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Genre:</strong> ${book.genre}</p>
            <p>${book.description}</p>
        `;
        borrowedBooksContainer.appendChild(bookItem);
    });
} else {
    borrowedBooksContainer.innerHTML = "<p>No borrowed books yet.</p>";
}