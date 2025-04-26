document.querySelectorAll(".book a").forEach((bookLink) => {
    bookLink.addEventListener("click", (event) => {
        event.preventDefault();

        const bookElement = bookLink.closest(".book");
        const bookId = bookLink.getAttribute("data-book-id");

        const bookDetails = {
            id: bookId || null,
            title: bookElement.querySelector("h3").textContent,
            author: bookElement.querySelector("p:nth-of-type(1)").textContent.replace("Author: ", ""),
            category: bookElement.querySelector("p:nth-of-type(2)").textContent.replace("Genre: ", ""),
            description: bookElement.querySelector(".description").textContent,
            image: bookElement.querySelector("img").src,
        };

        localStorage.setItem("selectedBook", JSON.stringify(bookDetails));

        // store bookId if available (it won’t be for hardcoded books)
        if (bookId) {
            localStorage.setItem("selectedBookId", bookId);
        } else {
            localStorage.removeItem("selectedBookId");
        }

        window.location.href = "book_details.html";
    });
});
window.addEventListener("DOMContentLoaded", () => {
    const bookDetails = JSON.parse(localStorage.getItem("selectedBook"));

    if (bookDetails) {
        document.getElementById("bookImage").src = bookDetails.image || "default-book.jpg";
        document.getElementById("bookTitle").textContent = bookDetails.title;
        document.getElementById("bookAuthor").textContent = bookDetails.author;
        document.getElementById("bookGenre").textContent = bookDetails.category;
        document.getElementById("bookDescription").textContent = bookDetails.description;
    } else {
        alert("Book details not found.");
    }

    document.querySelector(".back-btn").addEventListener("click", () => {
        window.location.href = "BookList.html";
    });
});


// document.addEventListener("DOMContentLoaded", function () {
//     const bookContainer = document.getElementById("bookContainer");

//     // Sample books - you can also load them from a JSON file or fetch API later
//     const books = [
//         {
//             id: "1",
//             title: "Attack On Titan",
//             author: "Hajime Isayama",
//             category: "Action, Mystery",
//             description: "In a world overrun by terrifying man-eating Titans...",
//             image: "AOT.jpg"
//         },
//         {
//             id: "2",
//             title: "One Piece",
//             author: "Eiichiro Oda",
//             category: "Adventure, Fantasy, Comedy, Science fiction",
//             description: "Follow Monkey D. Luffy and his crew as they sail...",
//             image: "one_piece.jpg"
//         },
//         {
//             id: "3",
//             title: "Naruto",
//             author: "Masashi Kishimoto",
//             category: "Action, Drama",
//             description: "Naruto Uzumaki, a young ninja with dreams of becoming Hokage...",
//             image: "Naruto.jpg"
//         },
//         {
//             id: "4",
//             title: "Harry Potter",
//             author: "J.K. Rowling",
//             category: "Fantasy, Adventure",
//             description: "A young boy named Harry discovers he's a wizard...",
//             image: "Harry.jpg"
//         },
//         {
//             id: "5",
//             title: "Death Note",
//             author: "Tsugumi Ohba",
//             category: "Psychological, Mystery",
//             description: "When high school student Light Yagami finds a mysterious notebook...",
//             image: "Death_Note.webp"
//         },
//         {
//             id: "6",
//             title: "The Hobbit",
//             author: "J.R.R. Tolkien",
//             category: "Fantasy, Adventure",
//             description: "Bilbo Baggins, a simple hobbit, is unexpectedly pulled into an epic adventure...",
//             image: "Hobbitjpeg.jpeg"
//         },
//         {
//             id: "7",
//             title: "A Brief History of Time",
//             author: "Stephen Hawking",
//             category: "Science, Cosmology",
//             description: "Stephen Hawking explores black holes, the Big Bang, and the nature of time...",
//             image: "OIP.jpg"
//         },
//         {
//             id: "8",
//             title: "The Selfish Gene",
//             author: "Richard Dawkins",
//             category: "Biology, Evolution",
//             description: "Dawkins explains evolution from the gene's perspective...",
//             image: "gene_.jpg"
//         }
//     ];

//     // Store them once (optional)
//     localStorage.setItem("books", JSON.stringify(books));

//     books.forEach(book => {
//         const bookElement = document.createElement("div");
//         bookElement.className = "book";
//         bookElement.innerHTML = `
//             <a href="book_details.html" data-book-id="${book.id}">
//                 <img src="${book.image}" alt="${book.title}" onerror="this.src='default-book.jpg'">
//                 <h3>${book.title}</h3>
//             </a>
//             <p><strong>Author:</strong> ${book.author}</p>
//             <p><strong>Genre:</strong> ${book.category}</p>
//             <p class="description">${book.description}</p>
//         `;
//         bookContainer.appendChild(bookElement);
//     });

//     // Click logic
//     document.querySelectorAll('.book a').forEach(link => {
//         link.addEventListener('click', function (e) {
//             e.preventDefault();
//             const bookId = this.getAttribute('data-book-id');
//             const bookData = books.find(book => book.id === bookId);
//             if (bookData) {
//                 localStorage.setItem('selectedBook', JSON.stringify(bookData));
//                 localStorage.setItem('selectedBookId', bookId);
//             }
//             window.location.href = 'book_details.html';
//         });
//     });
// });


// document.addEventListener("DOMContentLoaded", function() {
//     const bookContainer = document.getElementById("bookContainer");

//     // get books from localStorage
//     const books = JSON.parse(localStorage.getItem('books')) || [];

//     // عرض كل كتاب
//     books.forEach(book => {
//         const bookElement = document.createElement("div");
//         bookElement.className = "book";
//         bookElement.innerHTML = `
//             <a href="book_details.html" data-book-id="${book.id}">
//                 <img src="${book.image}" alt="${book.title}" onerror="this.src='default-book.jpg'">
//                 <h3>${book.title}</h3>
//             </a>
//             <p><strong>Author:</strong> ${book.author}</p>
//             <p><strong>Genre:</strong> ${book.category}</p>
//             <p class="description">${book.description.substring(0, 100)}${book.description.length > 100 ? '...' : ''}</p>
//         `;
//         bookContainer.appendChild(bookElement);
//     });

// document.querySelectorAll('.book a').forEach(link => {
//         link.addEventListener('click', function(e) {
//             e.preventDefault();
//             const bookId = this.getAttribute('data-book-id');
//             localStorage.setItem('selectedBookId', bookId);
//             window.location.href = 'book_details.html';
//         });
//     });

// const searchForm = document.querySelector(".search-container");
//     if (searchForm) {
//         searchForm.addEventListener("submit", function(e) {
//             e.preventDefault();
//             const searchTerm = this.search.value.toLowerCase();
//             const books = document.querySelectorAll(".book");

//             books.forEach(book => {
//                 const title = book.querySelector("h3").textContent.toLowerCase();
//                 const author = book.querySelector("p:nth-of-type(1)").textContent.toLowerCase();
//                 const category = book.querySelector("p:nth-of-type(2)").textContent.toLowerCase();

//                 if (title.includes(searchTerm) || author.includes(searchTerm) || category.includes(searchTerm)) {
//                     book.style.display = "block";
//                 } else {
//                     book.style.display = "none";
//                 }
//             });
//         });
//     }
// });



//  document.addEventListener("DOMContentLoaded", function () {
//     const bookContainer = document.getElementById("bookContainer");

//     // Sample books - you can also load them from a JSON file or fetch API later
//     const books = [
//         {
//             id: "1",
//             title: "Attack On Titan",
//             author: "Hajime Isayama",
//             category: "Action, Mystery",
//             description: "In a world overrun by terrifying man-eating Titans...",
//             image: "AOT.jpg"
//         },
//         {
//             id: "2",
//             title: "One Piece",
//             author: "Eiichiro Oda",
//             category: "Adventure, Fantasy, Comedy, Science fiction",
//             description: "Follow Monkey D. Luffy and his crew as they sail...",
//             image: "one_piece.jpg"
//         },
//         {
//             id: "3",
//             title: "Naruto",
//             author: "Masashi Kishimoto",
//             category: "Action, Drama",
//             description: "Naruto Uzumaki, a young ninja with dreams of becoming Hokage...",
//             image: "Naruto.jpg"
//         },
//         {
//             id: "4",
//             title: "Harry Potter",
//             author: "J.K. Rowling",
//             category: "Fantasy, Adventure",
//             description: "A young boy named Harry discovers he's a wizard...",
//             image: "Harry.jpg"
//         },
//         {
//             id: "5",
//             title: "Death Note",
//             author: "Tsugumi Ohba",
//             category: "Psychological, Mystery",
//             description: "When high school student Light Yagami finds a mysterious notebook...",
//             image: "Death_Note.webp"
//         },
//         {
//             id: "6",
//             title: "The Hobbit",
//             author: "J.R.R. Tolkien",
//             category: "Fantasy, Adventure",
//             description: "Bilbo Baggins, a simple hobbit, is unexpectedly pulled into an epic adventure...",
//             image: "Hobbitjpeg.jpeg"
//         },
//         {
//             id: "7",
//             title: "A Brief History of Time",
//             author: "Stephen Hawking",
//             category: "Science, Cosmology",
//             description: "Stephen Hawking explores black holes, the Big Bang, and the nature of time...",
//             image: "OIP.jpg"
//         },
//         {
//             id: "8",
//             title: "The Selfish Gene",
//             author: "Richard Dawkins",
//             category: "Biology, Evolution",
//             description: "Dawkins explains evolution from the gene's perspective...",
//             image: "gene_.jpg"
//         }
//     ];

//     // Store them once (optional)
//     localStorage.setItem("books", JSON.stringify(books));

//     books.forEach(book => {
//         const bookElement = document.createElement("div");
//         bookElement.className = "book";
//         bookElement.innerHTML = `
//             <a href="book_details.html" data-book-id="${book.id}">
//                 <img src="${book.image}" alt="${book.title}" onerror="this.src='default-book.jpg'">
//                 <h3>${book.title}</h3>
//             </a>
//             <p><strong>Author:</strong> ${book.author}</p>
//             <p><strong>Genre:</strong> ${book.category}</p>
//             <p class="description">${book.description}</p>
//         `;
//         bookContainer.appendChild(bookElement);
//     });

//     // Click logic
//     document.querySelectorAll('.book a').forEach(link => {
//         link.addEventListener('click', function (e) {
//             e.preventDefault();
//             const bookId = this.getAttribute('data-book-id');
//             const bookData = books.find(book => book.id === bookId);
//             if (bookData) {
//                 localStorage.setItem('selectedBook', JSON.stringify(bookData));
//                 localStorage.setItem('selectedBookId', bookId);
//             }
//             window.location.href = 'book_details.html';
//         });
//     });
// }); 
