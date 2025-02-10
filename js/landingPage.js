import {getLoginCookie} from "/js/attemptlogin.js";
let userCookie = getLoginCookie();

function hideDiv(element) {

}

document.getElementById("landing-page-welcome").innerHTML = "Welcome " + userCookie;
