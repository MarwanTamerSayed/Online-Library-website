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

