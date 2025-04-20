// Wait until the entire page content is loaded
document.addEventListener("DOMContentLoaded", function () {

    // Get references to key elements
    const form = document.getElementById("addBookForm");
    const submitBtn = form.querySelector("button");
    const messageDiv = document.getElementById("message");
    let rowBeingEdited = null;  // Holds the table row currently being edited

    // Function to show a temporary success or error message
    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.classList.remove("success", "error");  // Clear previous message styles
        messageDiv.classList.add(type);                   // Apply the new message type
        messageDiv.style.display = 'block';

        setTimeout(() => { 
            messageDiv.style.display = 'none';           // Hide the message after 2 seconds
        }, 2000);
    }

    // Handle form submission for adding or updating a book
    form.addEventListener("submit", function (event) {
        event.preventDefault();  // Prevent page refresh

        // Collect input values from the form
        const id = document.getElementById("bookID").value.trim();
        const title = document.getElementById("title").value.trim();
        const author = document.getElementById("author").value.trim();
        const category = document.getElementById("category").value.trim();
        const description = document.getElementById("description").value.trim();

        const table = document.querySelector("table tbody");

        // Validate: Make sure the ID is a positive integer
        if (isNaN(id) || Number(id) <= 0 || !Number.isInteger(Number(id))) {
            showMessage("ID must be a positive integer number.", "error");
            return;
        }

        // If adding a new book, check for duplicate ID
        if (!rowBeingEdited) {
            const duplicate = Array.from(table.rows).some(row => row.cells[0].textContent === id);
            if (duplicate) {
                showMessage("ID already exists. Please enter a unique ID.", "error");
                return;
            }
        }

        // If editing an existing book
        if (rowBeingEdited) {
            rowBeingEdited.cells[0].textContent = id;
            rowBeingEdited.cells[1].textContent = title;
            rowBeingEdited.cells[2].textContent = author;
            rowBeingEdited.cells[3].textContent = category;
            rowBeingEdited.setAttribute("data-description", description); // Save description as a custom attribute

            showMessage("Book updated successfully!", "success");

            rowBeingEdited = null;               // Reset editing state
            submitBtn.textContent = "Add Book";  // Restore button text
        } else {
            // If adding a new book
            const newRow = document.createElement("tr");
            newRow.setAttribute("data-description", description);  // Store the description outside the table cells

            // Build the new table row with book data and action buttons
            newRow.innerHTML = `
                <td>${id}</td>
                <td>${title}</td>
                <td>${author}</td>
                <td>${category}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            table.appendChild(newRow);  // Add the row to the table

            showMessage("Book added successfully!", "success");
        }

        form.reset();  // Clear form fields after submission
    });

    // Handle click events for Edit and Delete buttons inside the table
    document.querySelector("table tbody").addEventListener("click", function (e) {

        // If Delete button is clicked
        if (e.target.classList.contains("delete-btn")) {
            if (confirm("Are you sure you want to delete this book?")) {
                e.target.closest("tr").remove();  // Remove the table row
                showMessage("Book deleted successfully.", "success");
            }
        }

        // If Edit button is clicked
        if (e.target.classList.contains("edit-btn")) {
            const row = e.target.closest("tr");
            rowBeingEdited = row;  // Save the row for updating

            // Populate the form with existing values for editing
            document.getElementById("bookID").value = row.cells[0].textContent;
            document.getElementById("title").value = row.cells[1].textContent;
            document.getElementById("author").value = row.cells[2].textContent;
            document.getElementById("category").value = row.cells[3].textContent;
            document.getElementById("description").value = row.getAttribute("data-description") || "";

            submitBtn.textContent = "Update Book";  // Change button text for edit mode
        }
    });
});
