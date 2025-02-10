import {getLoginCookie} from "/attemptlogin.js";
let userCookie = getLoginCookie();

document.getElementById("landing-page-welcome").innerHTML = "Welcome " + userCookie;
