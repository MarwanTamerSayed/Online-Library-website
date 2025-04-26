
// // const bookDetails = JSON.parse(localStorage.getItem("selectedBook"));

// // if (bookDetails) {
    
// //     document.querySelector(".details-container").innerHTML = `
// //         <p><strong>Title:</strong> ${bookDetails.title}</p>
// //         <p><strong>Author:</strong> ${bookDetails.author}</p>
// //         <p><strong>Genre:</strong> ${bookDetails.genre}</p>
// //         <p><strong>Description:</strong> ${bookDetails.description}</p>
// //         <button class="borrow-btn">Borrow Book</button>
// //     `;
// //     document.querySelector("img").src = bookDetails.image;

    
// //     document.querySelector(".borrow-btn").addEventListener("click", () => {
        
// //         let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

        
// //         borrowedBooks.push(bookDetails);

        
// //         localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));

        
// //         alert(`${bookDetails.title} has been added to your borrowed books.`);
// //     });
// // } else {
    
// //     window.location.href = "BookList.html";
// // }


// window.addEventListener("DOMContentLoaded", () => {
//     const bookDetails = JSON.parse(localStorage.getItem("selectedBook"));

//     if (bookDetails) {
//         document.getElementById("bookImage").src = bookDetails.image || "default-book.jpg";
//         document.getElementById("bookTitle").textContent = bookDetails.title;
//         document.getElementById("bookAuthor").textContent = bookDetails.author;
//         document.getElementById("bookGenre").textContent = bookDetails.category;
//         document.getElementById("bookDescription").textContent = bookDetails.description;
//     } else {
//         alert("Book details not found.");
//     }

//     document.querySelector(".back-btn").addEventListener("click", () => {
//         window.location.href = "BookList.html";
//     });
// });



// document.addEventListener("DOMContentLoaded", function() {
//     // Get the book ID and full book details from localStorage
//     const bookId = localStorage.getItem('selectedBookId');
//     const selectedBook = JSON.parse(localStorage.getItem('selectedBook'));
//     const books = JSON.parse(localStorage.getItem('books')) || [];

//     // Try to find book by ID first
//     let book = bookId ? books.find(b => b.id === bookId) : null;

//     // If not found by ID, use selectedBook directly (for hardcoded books)
//     if (!book && selectedBook) {
//         book = selectedBook;
//     }

//     // Get DOM elements
//     const bookImage = document.getElementById('bookImage');
//     const bookTitle = document.getElementById('bookTitle');
//     const bookAuthor = document.getElementById('bookAuthor');
//     const bookGenre = document.getElementById('bookGenre');
//     const bookDescription = document.getElementById('bookDescription');
//     const borrowBtn = document.querySelector('.borrow-btn');
//     const backBtn = document.querySelector('.back-btn');
//     const adminControls = document.getElementById('adminControls');
//     const editBtn = document.querySelector('.edit-btn');
//     const deleteBtn = document.querySelector('.delete-btn');

//     // Check if user is admin
//     const isAdmin = localStorage.getItem('isAdmin') === 'true';

//     if (book) {
//         // Display book details
//         bookImage.src = book.image || 'default-book.jpg';
//         bookImage.onerror = function() {
//             this.src = 'default-book.jpg';
//         };
//         bookTitle.textContent = book.title;
//         bookAuthor.textContent = book.author;
//         bookGenre.textContent = book.category || book.genre || 'Unknown';
//         bookDescription.textContent = book.description;

//         // Show admin controls only if admin AND book has an ID
//         adminControls.style.display = (isAdmin && book.id) ? 'block' : 'none';

//         // Borrow button logic
//         borrowBtn.addEventListener('click', function() {
//             let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];

//             // Prevent duplicate borrowing if book has an ID
//             if (book.id && borrowedBooks.some(b => b.id === book.id)) {
//                 alert('You have already borrowed this book!');
//                 return;
//             }

//             borrowedBooks.push(book);
//             localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
//             alert(`"${book.title}" has been added to your borrowed books.`);
//         });

//         // Back button
//         backBtn.addEventListener('click', function() {
//             window.location.href = 'BookList.html';
//         });

//         // Edit button (admin only)
//         editBtn.addEventListener('click', function() {
//             if (book.id) {
//                 localStorage.setItem('editBookId', book.id);
//                 window.location.href = 'admin_dashboard.html';
//             }
//         });

//         // Delete button (admin only)
//         deleteBtn.addEventListener('click', function() {
//             if (book.id && confirm(`Are you sure you want to delete "${book.title}"?`)) {
//                 const updatedBooks = books.filter(b => b.id !== book.id);
//                 localStorage.setItem('books', JSON.stringify(updatedBooks));

//                 // Remove from borrowed books
//                 let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
//                 borrowedBooks = borrowedBooks.filter(b => b.id !== book.id);
//                 localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));

//                 alert('Book deleted successfully!');
//                 window.location.href = 'BookList.html';
//             }
//         });
//     } else {
//         // Book not found
//         alert('Book not found!');
//         window.location.href = 'BookList.html';
//     }
// });

document.addEventListener("DOMContentLoaded", () => {
    const book = JSON.parse(localStorage.getItem("selectedBook"));
    const bookId = localStorage.getItem("selectedBookId");

    if (!book) {
        alert("No book details found.");
        window.location.href = "BookList.html";
        return;
    }

    // Populate HTML with book data
    document.getElementById("bookImage").src = book.image || "default-book.jpg";
    document.getElementById("bookTitle").textContent = book.title;
    document.getElementById("bookAuthor").textContent = book.author;
    document.getElementById("bookGenre").textContent = book.category;
    document.getElementById("bookDescription").textContent = book.description;

    const adminControls = document.getElementById("adminControls");
    const isAdminBook = bookId !== null;
    adminControls.style.display = isAdminBook ? "block" : "none";

    // Back button
    document.querySelector(".back-btn").addEventListener("click", () => {
        window.location.href = "BookList.html";
    });

    // Edit button
    document.querySelector(".edit-btn").addEventListener("click", () => {
        // You could use sessionStorage or flags here
        localStorage.setItem("editBookId", bookId); // signal to admin dashboard which book to edit
        window.location.href = "AdminDashboard.html"; // adjust to your admin page filename
    });

    // Delete button
    document.querySelector(".delete-btn").addEventListener("click", () => {
        if (confirm("Are you sure you want to delete this book?")) {
            let books = JSON.parse(localStorage.getItem("books")) || [];
            const updatedBooks = books.filter(b => b.id !== bookId);
            localStorage.setItem("books", JSON.stringify(updatedBooks));

            alert("Book deleted successfully.");
            window.location.href = "BookList.html";
        }
    });
});
