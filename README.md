# Online-Library-website    
(if you need any clarification tell me **Marwan**) --> For the logo you will need to download the photo
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
            <div>
                <h1>Biblionet</h1>
                <p>Connecting Minds, One Book at a Time</p>
            </div>
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
    background-color:  #EBD9C5  ;
    background-size: 400% 400%;
    animation: gradientBG 15s ease infinite;
}

@keyframes gradientBG {
    0% {background-position: 0% 50%;}
    50% {background-position: 100% 50%;}
    100% {background-position: 0% 50%;}
}

header {
    color: #FFF5E1;
    margin: 0;
    padding: 10px 20px;
    background-color: #4E342E;
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
    font-size: 26px;
    font-weight: bold;
    text-transform: uppercase;
    letter-spacing: 1px;
    margin: 0;
}

nav {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px 0;
    border-radius: 5px;
    background-color: #4E342E;
    margin-top: 10px;
}

nav ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    gap: 10px;
}

nav ul li a {
    text-decoration: none;
    font-size: 16px;
    color: #FFF5E1;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 12px 18px;
    border-radius: 5px;
    transition: all 0.3s ease-in-out;
}

nav ul li a:hover {
    background-color: #A1887F;
    color: white;
    box-shadow: 0px 0px 8px rgba(161, 136, 127, 0.6);
    transform: scale(1.1);
}

.search-container {
    display: flex;
    gap: 10px;
    margin-left: auto;
    padding: 5px;
}

.search-container input {
    padding: 8px 12px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    outline: none;
}

.search-container input:focus {
    border-color: #A1887F;
}

.search-container button {
    background-color: #A1887F;
    color: white;
    padding: 8px 12px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.search-container button:hover {
    background-color: #8D6E63;
}

form {
    background: rgba(255, 255, 255, 0.4);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.3);
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

form label {
    font-size: 16px;
    margin-bottom: 5px;
    display: block;
}

form input, form textarea {
    width: 100%;
    padding: 10px;
    margin-bottom: 15px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 14px;
    outline: none;
}

form input:focus, form textarea:focus {
    border-color: #A1887F;
}

form button {
    background-color: #4E342E;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
    transition: all 0.3s;
}

form button::before {
    content: "+ ";
}

form button:hover {
    background-color: #8D6E63;
    transform: scale(1.05) rotate(-1deg);
}
footer {
    position: static;
    bottom: 0;
    width: 100%;
    text-align: center;
    color: #FFF5E1;
    background-color: #4E342E;
    padding: 10px;
}

footer p {
    margin: 0;
    font-size: 14px;
}

.fab {
    position: fixed;
    bottom: 30px;
    right: 30px;
    background-color: #8D6E63;
    color: white;
    padding: 18px;
    border-radius: 50%;
    font-size: 24px;
    box-shadow: 0 4px 10px rgba(0,0,0,0.2);
    text-align: center;
    z-index: 1000;
    text-decoration: none;
    transition: background-color 0.3s;
}

.fab:hover {
    background-color: #A1887F;
}
