function searchBooksList() {
    const input = document.getElementById('searchInput').value.toLowerCase();
    const bookItems = document.querySelectorAll('.book');

    bookItems.forEach(book => {
        const title = book.querySelector('h3').textContent.toLowerCase();
        const author = book.querySelector('p:nth-of-type(1)').textContent.toLowerCase();
        const genre = book.querySelector('p:nth-of-type(2)').textContent.toLowerCase();
        const description = book.querySelector('.description').textContent.toLowerCase();

        if (
            title.includes(input) ||
            author.includes(input) ||
            genre.includes(input) ||
            description.includes(input)
        ) {
            book.style.display = 'block';
        } else {
            book.style.display = 'none';
        }
    });
}


document.addEventListener("DOMContentLoaded", function () {
    const tableBody = document.querySelector(".book-container");
    const searchInput = document.getElementById("searchInput");

    // Function to load all books from localStorage
    function loadBooks() {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        tableBody.innerHTML = ''; // Clear previous content

        books.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');
            bookElement.innerHTML = `
                <a href="Mariem.html">
                    <img src="${book.image || 'default-book.jpg'}" alt="Book Cover">
                    <h3>${book.title}</h3>
                </a>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Genre:</strong> ${book.category}</p>
                <p class="description">${book.description}</p>
            `;
            tableBody.appendChild(bookElement);
        });
    }

    // Function to search books based on the input
    function searchBooksList() {
        const query = searchInput.value.toLowerCase();
        const books = JSON.parse(localStorage.getItem('books')) || [];
        const filteredBooks = books.filter(book => {
            return book.title.toLowerCase().includes(query) ||
                   book.author.toLowerCase().includes(query) ||
                   book.category.toLowerCase().includes(query);
        });

        // Clear the displayed books and show filtered ones
        tableBody.innerHTML = '';
        filteredBooks.forEach(book => {
            const bookElement = document.createElement('div');
            bookElement.classList.add('book');
            bookElement.innerHTML = `
                <a href="Mariem.html">
                    <img src="${book.image || 'default-book.jpg'}" alt="Book Cover">
                    <h3>${book.title}</h3>
                </a>
                <p><strong>Author:</strong> ${book.author}</p>
                <p><strong>Genre:</strong> ${book.category}</p>
                <p class="description">${book.description}</p>
            `;
            tableBody.appendChild(bookElement);
        });
    }

    // Event listener for search input
    searchInput.addEventListener('keyup', searchBooksList);

    // Initial load of books when the page loads
    loadBooks();
});

