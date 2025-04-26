document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("addBookForm");
    const submitBtn = form.querySelector("button");
    const messageDiv = document.getElementById("message");
    const tableBody = document.getElementById("booksTableBody");
    let rowBeingEdited = null;

    loadBooks();

    document.getElementById('bookImage').addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file && file.size > 2 * 1024 * 1024) {
            showMessage("Image size should be less than 2MB", "error");
            e.target.value = '';
            return;
        }
        previewImage(e);
    });

    function previewImage(event) {
        const preview = document.getElementById('imagePreview');
        preview.innerHTML = '';

        if (event.target.files.length > 0) {
            const file = event.target.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.style.maxWidth = '200px';
                img.style.maxHeight = '200px';
                preview.appendChild(img);
            }

            reader.readAsDataURL(file);
        }
    }

    function showMessage(message, type) {
        messageDiv.textContent = message;
        messageDiv.className = "message " + type;
        messageDiv.style.display = 'block';

        setTimeout(() => {
            messageDiv.style.display = 'none';
        }, 2000);
    }

    function loadBooks() {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        tableBody.innerHTML = '';

        books.forEach(book => {
            const row = document.createElement("tr");
            row.setAttribute("data-description", book.description);
            row.setAttribute("data-image", book.image || "default-book.jpg");
            row.innerHTML = `
                <td>${book.id}</td>
                <td>${book.title}</td>
                <td>${book.author}</td>
                <td>${book.category}</td>
                <td>
                    <button class="edit-btn">Edit</button>
                    <button class="delete-btn">Delete</button>
                </td>
            `;
            tableBody.appendChild(row);
        });
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const id = document.getElementById("bookID").value.trim();
        const title = document.getElementById("title").value.trim();
        const author = document.getElementById("author").value.trim();
        const category = document.getElementById("category").value.trim();
        const description = document.getElementById("description").value.trim();
        const imageInput = document.getElementById("bookImage");

        let books = JSON.parse(localStorage.getItem('books')) || [];
        let imageData = null;

        if (imageInput.files.length > 0) {
            const file = imageInput.files[0];
            const reader = new FileReader();

            reader.onload = function(e) {
                imageData = e.target.result;
                saveBook();
            }
            reader.readAsDataURL(file);
        } else {
            saveBook();
        }

        function saveBook() {
            if (isNaN(id) || Number(id) <= 0 || !Number.isInteger(Number(id))) {
                showMessage("ID must be a positive integer number.", "error");
                return;
            }

            if (!rowBeingEdited) {
                const duplicate = books.some(book => book.id === id);
                if (duplicate) {
                    showMessage("ID already exists. Please enter a unique ID.", "error");
                    return;
                }
            }

            if (rowBeingEdited) {
                const bookId = rowBeingEdited.cells[0].textContent;
                const index = books.findIndex(book => book.id === bookId);

                if (index !== -1) {
                    books[index] = {
                        id: id,
                        title: title,
                        author: author,
                        category: category,
                        description: description,
                        image: imageData || books[index].image
                    };
                    showMessage("Book updated successfully!", "success");
                }
            } else {
                books.push({
                    id: id,
                    title: title,
                    author: author,
                    category: category,
                    description: description,
                    image: imageData || "default-book.jpg"
                });
                showMessage("Book added successfully!", "success");
            }

            localStorage.setItem('books', JSON.stringify(books));
            loadBooks();
            form.reset();
            document.getElementById('imagePreview').innerHTML = '';
            rowBeingEdited = null;
            submitBtn.textContent = "Add Book";
        }
    });

    tableBody.addEventListener("click", function (e) {
        if (e.target.classList.contains("delete-btn")) {
            if (confirm("Are you sure you want to delete this book?")) {
                const row = e.target.closest("tr");
                const bookId = row.cells[0].textContent;

                let books = JSON.parse(localStorage.getItem('books')) || [];
                books = books.filter(book => book.id !== bookId);
                localStorage.setItem('books', JSON.stringify(books));

                row.remove();
                showMessage("Book deleted successfully.", "success");
            }
        }

        if (e.target.classList.contains("edit-btn")) {
            const row = e.target.closest("tr");
            rowBeingEdited = row;

            document.getElementById("bookID").value = row.cells[0].textContent;
            document.getElementById("title").value = row.cells[1].textContent;
            document.getElementById("author").value = row.cells[2].textContent;
            document.getElementById("category").value = row.cells[3].textContent;
            document.getElementById("description").value = row.getAttribute("data-description") || "";

            const preview = document.getElementById('imagePreview');
            preview.innerHTML = '';
            const img = document.createElement('img');
            img.src = row.getAttribute("data-image");
            img.style.maxWidth = '200px';
            img.style.maxHeight = '200px';
            preview.appendChild(img);

            submitBtn.textContent = "Update Book";
        }
    });
});
