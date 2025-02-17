class User {
    constructor(name, email, password) {
        this.name = name;
        this.email = email;
        this.password = password;
    }
}

/* Our make shift database */
const users = [ new User("name", "TestEmail@testmail.com", "superCoolPas"),
new User("Guest", "GuestEmail@testmail.com", "GuestPassword")];

/* document.cookie = "user=" + encodeURIComponent(user) + ";" + "password=" + encodeURIComponent(password) + ";" + "path=/"; */
let loginFormButton = document.getElementById('login-form-btn')
if (loginFormButton) {
    loginFormButton.addEventListener("click", function() {
        let inputEmail = document.getElementById('login-email-input').value;
        let inputPassword = document.getElementById('login-password-input').value;
        AttemptLogin(inputEmail, inputPassword);
    });
}

let loginAsGuestButton = document.getElementById('login-as-guest')
if (loginAsGuestButton) {
    loginAsGuestButton.addEventListener("click", function() {
        AttemptLogin("GuestEmail@testmail.com", "GuestPassword")
    })
}

// @param [String] email
// @param [String] password
const AttemptLogin = function (inputEmail, inputPassword) {
    let userFound = false;
    for (let i = 0; i < users.length; i++) {
        if (users[i].email === inputEmail && users[i].password === inputPassword) {
            setLoginCookie(users[i].email);
            userFound = true;
            window.location.pathname = "./haloman3069.github.io/html/landing-page.html";
        }
    }

    if (!userFound) {
        console.log("User not found or invalid credentials");
    }
}

const setLoginCookie = function(email) {
    // Setting a cookie that expires in 1 hour
    const expires = new Date();
    expires.setTime(expires.getTime() + (60 * 60 * 1000));  // 1 hour
    document.cookie = `loggedInUser=${email}; expires=${expires.toUTCString()}; path=/;`;
};

const getLoginCookie = function() {
    const cookies = document.cookie.split('; ');
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].split('=');
        if (cookie[0] === 'loggedInUser') {
            return cookie[1];  // Return the email or user identifier
        }
    }
    return null;  // No cookie found
};

const deleteLoginCookie = function() {
    document.cookie = 'loggedInUser=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
};

export { getLoginCookie, deleteLoginCookie };