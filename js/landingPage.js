import {getLoginCookie} from "./haloman3069.github.io/js/attemptlogin.js";
let userCookie = getLoginCookie();

document.getElementById("landing-page-welcome").innerHTML = "Welcome " + userCookie;
