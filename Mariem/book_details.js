// Get the book details from localStorage
const bookDetails = JSON.parse(localStorage.getItem("selectedBook"));

if (bookDetails) {
    // Populate the book details dynamically
    document.querySelector(".details-container").innerHTML = `
        <p><strong>Title:</strong> ${bookDetails.title}</p>
        <p><strong>Author:</strong> ${bookDetails.author}</p>
        <p><strong>Genre:</strong> ${bookDetails.genre}</p>
        <p><strong>Description:</strong> ${bookDetails.description}</p>
        <button class="borrow-btn">Borrow Book</button>
    `;
    document.querySelector("img").src = bookDetails.image;

    // Add event listener to the "Borrow Book" button
    document.querySelector(".borrow-btn").addEventListener("click", () => {
        // Get the borrowed books list from localStorage
        let borrowedBooks = JSON.parse(localStorage.getItem("borrowedBooks")) || [];

        // Add the current book to the borrowed books list
        borrowedBooks.push(bookDetails);

        // Save the updated list back to localStorage
        localStorage.setItem("borrowedBooks", JSON.stringify(borrowedBooks));

        // Show confirmation message
        alert(`${bookDetails.title} has been added to your borrowed books.`);
    });
} else {
    // If no book details are found, redirect to the book list page
    window.location.href = "BookList.html";
}