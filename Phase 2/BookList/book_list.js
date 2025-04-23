// Add event listeners to all book links
document.querySelectorAll(".book a").forEach((bookLink) => {
    bookLink.addEventListener("click", (event) => {
        event.preventDefault(); // Prevent default navigation

        // Get book details from the clicked book
        const bookElement = bookLink.closest(".book");
        const bookDetails = {
            title: bookElement.querySelector("h3").textContent,
            author: bookElement.querySelector("p:nth-of-type(1)").textContent.replace("Author: ", ""),
            genre: bookElement.querySelector("p:nth-of-type(2)").textContent.replace("Genre: ", ""),
            description: bookElement.querySelector(".description").textContent,
            image: bookElement.querySelector("img").src,
        };

        // Save book details to localStorage
        localStorage.setItem("selectedBook", JSON.stringify(bookDetails));

        // Redirect to book_details.html
        window.location.href = "book_details.html";
    });
});