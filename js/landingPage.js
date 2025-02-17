import {getLoginCookie} from "./attemptlogin.js";

let userCookie = getLoginCookie();

let userbar = document.getElementById("landing-page-welcome");
if (userCookie) {
    userbar.innerHTML = "Welcome " + userCookie;
    userbar.classList.add("user-header");
} else {
    /* userbar.style.display = "none"; */
    userbar.innerHTML = "No User Logged In!";
}
