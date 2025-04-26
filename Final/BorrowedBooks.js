document.addEventListener("DOMContentLoaded", function() {
  
  const borrowBtn = document.querySelector('.borrow-btn');
  const bookContainer = document.querySelector('.book-container');
  const searchInput = document.getElementById('searchInput');
  const searchBtn = document.querySelector('.search-container button');

  loadBorrowedBooks();

  // Search function
  if (searchBtn) {
      searchBtn.addEventListener('click', searchBorrowedBooks);
  }
  if (searchInput) {
      searchInput.addEventListener('keyup', searchBorrowedBooks);
  }

  // // حدث زر الاستعارة (إذا كان موجودًا في الصفحة)
  // if (borrowBtn) {
  //     borrowBtn.addEventListener('click', function() {
  //         const bookId = localStorage.getItem('selectedBookId');
  //         borrowBook(bookId);
  //     });
  // }

  function loadBorrowedBooks() {
      const userId = localStorage.getItem('currentUserId');

      const allBorrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
      const userBorrowedBooks = allBorrowedBooks.filter(book => book.userId === userId);

      if (bookContainer) {
          bookContainer.innerHTML = '';

          if (userBorrowedBooks.length === 0) {
              bookContainer.innerHTML = '<p class="no-books">You have no borrowed books yet.</p>';
              return;
          }

          userBorrowedBooks.forEach(book => {
              const bookDiv = createBookElement(book);
              bookContainer.appendChild(bookDiv);
          });

          // the return button
          document.querySelectorAll('.return-btn').forEach(btn => {
              btn.addEventListener('click', function() {
                  const bookId = this.getAttribute('data-book-id');
                  returnBook(bookId, userId);
              });
          });

          checkOverdueBooks();
      }
  }

  function createBookElement(book) {
    const bookDiv = document.createElement('div');
    bookDiv.className = 'book';
    
    // Format dates nicely
    const borrowDate = new Date(book.borrowDate).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'short', 
        day: 'numeric'
    });
    
    const dueDate = new Date(book.dueDate).toLocaleDateString('en-US', {
        year: 'numeric', 
        month: 'short', 
        day: 'numeric',
        weekday: 'short'
    });

    bookDiv.innerHTML = `
        <img src="${book.image || 'default-book.jpg'}" alt="${book.title}" loading="lazy">
        <h3>${book.title}</h3>
        <div class="info">
            <p><strong>Author:</strong> ${book.author}</p>
            <p><strong>Borrowed:</strong> ${borrowDate}</p>
            <p class="due-date" data-due="${book.originalDueDate}">
                <strong>Due:</strong> ${dueDate}
            </p>
            <p><strong>Status:</strong> ${book.status || 'borrowed'}</p>
            <p class="days-remaining"></p>
        </div>
        <button class="return-btn" data-book-id="${book.id}">
            <i class="fas fa-undo"></i> Return Book
        </button>
    `;
    
    // Calculate and display days remaining
    const daysRemainingEl = bookDiv.querySelector('.days-remaining');
    const today = new Date();
    const due = new Date(book.originalDueDate);
    const diffTime = due - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays > 0) {
        daysRemainingEl.innerHTML = `<strong>Days remaining:</strong> ${diffDays}`;
    } else if (diffDays === 0) {
        daysRemainingEl.innerHTML = '<strong>Due today!</strong>';
    } else {
        daysRemainingEl.innerHTML = `<strong>Overdue by:</strong> ${Math.abs(diffDays)} days`;
    }
    
    return bookDiv;
}

  function borrowBook(bookId) {
      const userId = localStorage.getItem('currentUserId');
      if (!userId) {
          alert('Please login first');
          window.location.href = 'signup.html';
          return;
      }
      

      const books = JSON.parse(localStorage.getItem('books')) || [];
      const book = books.find(b => b.id === bookId);

      if (!book) {
          alert('Book not found!');
          return;
      }

      let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];

      const alreadyBorrowed = borrowedBooks.some(b => b.id === bookId && b.userId === userId);
      if (alreadyBorrowed) {
          alert('You have already borrowed this book!');
          return;
      }

      

      const today = new Date();
      const dueDate = new Date();
      dueDate.setDate(today.getDate() + 30);
      const borrowedBook = {
        ...book,
        userId: userId,
        borrowDate: today.toLocaleDateString(), // Store as readable string
        dueDate: dueDate.toLocaleDateString(), // Store as readable string
        originalDueDate: dueDate.toISOString(), // Store for calculations
        status: 'borrowed'
    };

      borrowedBooks.push(borrowedBook);
      localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));

      alert(`"${book.title}" has been borrowed successfully. Due date: ${dueDate.toISOString().split('T')[0]}`);
      window.location.href = 'Borrowed Books.html';
  }

  // return function for books
  function returnBook(bookId, userId) {
      if (confirm('Are you sure you want to return this book?')) {
          let borrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
          borrowedBooks = borrowedBooks.filter(book => book.id !== bookId);

          localStorage.setItem('borrowedBooks', JSON.stringify(borrowedBooks));
          alert('Book returned successfully!');
          loadBorrowedBooks();
      }
  }

  // to calculate the due time 
  function checkOverdueBooks() {
    const today = new Date();
    document.querySelectorAll('.due-date').forEach(dueDateElement => {
        const dueDateStr = dueDateElement.getAttribute('data-due');
        const dueDate = new Date(dueDateStr);
        const bookDiv = dueDateElement.closest('.book');
        const statusEl = bookDiv.querySelector('.info p:last-child');

        if (today > dueDate) {
            bookDiv.classList.add('book-overdue');
            statusEl.innerHTML = '<strong>Status:</strong> <span style="color:red">Overdue</span>';
        } else {
            bookDiv.classList.remove('book-overdue');
            statusEl.innerHTML = '<strong>Status:</strong> Borrowed';
        }
    });
}

  // Search function
  function searchBorrowedBooks() {
      const searchTerm = searchInput.value.toLowerCase();
      const userId = localStorage.getItem('currentUserId');
      const allBorrowedBooks = JSON.parse(localStorage.getItem('borrowedBooks')) || [];
      const userBorrowedBooks = allBorrowedBooks;

      if (bookContainer) {
          bookContainer.innerHTML = '';

          const filteredBooks = userBorrowedBooks.filter(book =>
              book.title.toLowerCase().includes(searchTerm) ||
              book.author.toLowerCase().includes(searchTerm)
          );

          if (filteredBooks.length === 0) {
              bookContainer.innerHTML = '<p class="no-books">No books match your search.</p>';
              return;
          }

          filteredBooks.forEach(book => {
              const bookDiv = createBookElement(book);
              bookContainer.appendChild(bookDiv);
          });

          checkOverdueBooks();
      }
  }
});