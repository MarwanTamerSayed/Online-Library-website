# Online-Library-website    (if you need any clarification tell me <Marwan>) --> For the logo you will need to download the photo
## The Common HTML Code 
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Book List - Online Library</title>
    <link rel="stylesheet" href="styles.css"> 
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css">

</head>
<body>

    <!-- Navigation Bar -->
    <header>
        
        <div class="header-container">
            <img src="LOGO.png" alt="BIBLIONET Logo" class="logo">
            <h1>Online Library</h1>
        </div>
        <nav>
            <ul>
                <li><a href="Abdo_Page.html"><i class="fas fa-home"></i> Home</a></li>
                <li><a href="BookList.html"><i class="fas fa-book"></i> Book List</a></li>
                <li><a href="Marwa_Page.html"><i class="fas fa-book-reader"></i> Borrowed Books</a></li>
                <li><a href="AboutUs.html"><i class="fas fa-info-circle"></i> About Us</a></li>
                <li><a href="Refaat_Page.html"><i class="fas fa-sign-out-alt"></i> Logout</a></li>
            </ul>
            <form class="search-container" method="GET">
                <input type="text" placeholder="Search for a book..." name="search">
                <button type="submit"><i class="fas fa-search"></i> Search</button>
            </form>
        </nav>
    </header>


    <footer>
        <p>&copy; 2025 Online Library.</p>
    </footer>

</body>
</html>

## Common CSS Style
body {
    font-family: Arial, sans-serif;
    margin: 0;
    padding: 0;
    background-color: #FAE3D9; 
}

header {
    color: #FFF5E1; 
    margin: 0;
    padding: 5px 15px;
    background-color: #5D4037;
    display: flex;
    align-items: center;
    justify-content: space-between;
}

.header-container {
    display: flex;
    align-items: center;
}

.logo {
    height: 70px; 
    margin-right: 15px;
}

h1 {
    font-size: 24px;
    font-weight: bold;
    text-transform: uppercase;
}
nav {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    border-radius: 5px;
    background: #5D4037; 
    margin-top: 20px;
}

nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 5px;
}

nav ul li a {
    text-decoration: none;
    font-size: 14px;
    color: #FFF5E1; 
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 18px;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
}


nav ul li a:hover {
    background: #FFB74D; 
    color: white;
    box-shadow: 0px 0px 8px rgba(255, 183, 77, 0.6);
    transform: scale(1.1); 
}
footer {
    position: static;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #FFF5E1; 
    background-color: #5D4037; 
    padding: 10px;
}

footer p {
    margin: 0;
    font-size: 14px;
    color: #FFF5E1;
    text-align: center;
}
