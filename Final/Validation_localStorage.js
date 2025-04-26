document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("login-form");
    const errorUser = document.getElementById("username-error");
    const errorPass = document.getElementById("pass-error");

    if (loginForm) {
        loginForm.addEventListener("submit", function (e) {
            e.preventDefault();



            // Reset previous errors
            errorUser.textContent = "";
            errorPass.textContent = "";
            document.getElementById("User").classList.remove("error-border");
            document.getElementById("pass").classList.remove("error-border");

            const username = document.getElementById("User").value.trim().toLowerCase();
            const password = document.getElementById("pass").value;

            if (username === "admin" && password === "admin") {
                window.location.href = "Abdo_page_admin.html";
                return;
            }

            const usersArr = JSON.parse(localStorage.getItem("users")) || [];
            const foundUser = usersArr.find(u => u.email === username && u.password === password);

            if (!foundUser){
                errorUser.textContent = "The user name you entered isn't connected to an account.";
                document.getElementById("User").classList.add("error-border");
                errorPass.textContent = "Wrong password !";
                document.getElementById("pass").classList.add("error-border");
                return;
            }

            localStorage.setItem("currentUser", JSON.stringify(foundUser));
            window.location.href = "Abdo_page.html";
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const signupForm = document.getElementById("signup-form");

    if (signupForm) {
        signupForm.addEventListener("submit", function (e) {
            e.preventDefault();

            // Clear previous errors
            document.querySelectorAll('[id$="-error"]').forEach(el => el.textContent = '');
            document.getElementById("fname").classList.remove("error-border");
            document.getElementById("lname").classList.remove("error-border");
            document.getElementById("email").classList.remove("error-border");
            document.getElementById("pass1").classList.remove("error-border");
            document.getElementById("pass2").classList.remove("error-border");

            const fname = document.getElementById("fname").value.trim();
            const lname = document.getElementById("lname").value.trim();
            const email = document.getElementById("email").value.trim();
            const pass1 = document.getElementById("pass1").value;
            const pass2 = document.getElementById("pass2").value;
            const roleSelected = document.querySelector('input[name="status"]:checked');

            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            const passPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;
            const normalizedEmail = email.toLowerCase();

            let hasError = false;

            if (fname.length < 3) {
                document.getElementById("fname-error").textContent = "First name must be at least 3 characters.";
                document.getElementById("fname").classList.add("error-border");
                hasError = true;
            }

            if (lname.length < 3) {
                document.getElementById("lname-error").textContent = "Last name must be at least 3 characters.";
                document.getElementById("lname").classList.add("error-border");
                hasError = true;
            }

            if (!emailPattern.test(normalizedEmail)) {
                document.getElementById("email-error").textContent = "Invalid email format.";
                document.getElementById("email").classList.add("error-border");
                hasError = true;
            }

            if (!passPattern.test(pass1)) {
                document.getElementById("pass1-error").textContent = "Password must be 8+ characters with uppercase, lowercase, and a number.";
                document.getElementById("pass1").classList.add("error-border");
                hasError = true;
            }

            if (pass1 !== pass2) {
                document.getElementById("pass2-error").textContent = "Passwords do not match.";
                document.getElementById("pass2").classList.add("error-border");
                hasError = true;
            }

            if (!roleSelected) {
                document.getElementById("role-error").textContent = "Please select a role: Admin or User.";
                hasError = true;
            }

            const usersArr = JSON.parse(localStorage.getItem("users")) || [];
            const userFound = usersArr.some(u => u.email === normalizedEmail);

            if (userFound) {
                document.getElementById("email-error").textContent = "Email is already registered.";
                document.getElementById("email").classList.add("error-border");
                hasError = true;
            }

            if (!hasError) {
                const newUser = {
                    fname,
                    lname,
                    email: normalizedEmail,
                    password: pass1,
                    role: roleSelected.value
                };

                usersArr.push(newUser);
                localStorage.setItem("users", JSON.stringify(usersArr));

                alert("Signup Successful!");
                window.location.href = "login.html";
            }
        });
    }
});

document.addEventListener("DOMContentLoaded", function () {
    const currentUser = JSON.parse(localStorage.getItem("currentUser"));
    const adminIcon = document.getElementById("adminIcon");

    if (currentUser && currentUser.role === "admin") {
      adminIcon.style.display = "block";
    }
});

