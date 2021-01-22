import "../styles/global.scss";
import "../styles/header.scss";
import "../styles/main.scss";
import "../styles/footer.scss";

import "../images/bg-shorten-desktop.svg";
import "../images/illustration-working.svg";
import "../images/logo.svg";
import "../images/icon-brand-recognition.svg";
import "../images/icon-detailed-records.svg";
import "../images/icon-fully-customizable.svg";

import "../images/icon-facebook.svg";
import "../images/icon-twitter.svg";
import "../images//icon-pinterest.svg";
import "../images/icon-instagram.svg";

const humburgerMenu = document.querySelector(".hamburger-menu");
const navBar = document.querySelector(".nav-bar-container");
const inputURL = document.getElementById("url-input");
const shortenBTN = document.getElementById("shorten-link-btn");
const errorMsg = document.querySelector(".error-msg");

const shortURL = async (url) => {
  try {
    const response = await fetch(`https://api.shrtco.de/v2/shorten?url=${url}`);
    const data = await response.json();
    console.log(data.result.short_link);
  } catch (e) {
    console.log(e);
  }
};

humburgerMenu.addEventListener("click", () => {
  navBar.classList.toggle("active");
});

shortenBTN.addEventListener("click", () => {
  const regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;

  if (!inputURL.value || !regexp.test(inputURL.value.trim())) {
    inputURL.classList.add("error");
    errorMsg.classList.add("active");
    return;
  }

  if (inputURL.value.trim()) {
    inputURL.classList.remove("error");
    errorMsg.classList.remove("active");
  }

  shortURL(inputURL.value.trim());
});
