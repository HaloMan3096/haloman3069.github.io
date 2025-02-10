import {getLoginCookie} from "/js/attemptlogin.js";
let userCookie = getLoginCookie();

document.getElementById("landing-page-welcome").innerHTML = "Welcome " + userCookie;
