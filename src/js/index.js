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
    return {
      originalUrl: data.result.original_link,
      shortenUrl: data.result.short_link,
    };
  } catch (e) {
    console.log(e);
  }
};

const updateUI = (originalUrl, shortenUrl, copyHandler) => {
  const wrapper = document.createElement("div");
  wrapper.classList.add("shorten-link-history");

  wrapper.innerHTML = `<p id="original-url">${originalUrl}</p>
  <div>
    <p class="shorten-url">${shortenUrl}</p>
    <a>Copy</a>
  </div>`;
  const featuresSection = document.querySelector(".features");
  featuresSection.insertAdjacentElement("afterbegin", wrapper);
  const shortenURL = wrapper.querySelector(".shorten-url");
  const copyBTN = wrapper.querySelector("a");
  copyBTN.addEventListener(
    "click",
    copyHandler.bind(this, copyBTN, shortenURL)
  );
};

let shortenUrlList = [];

let urlList = localStorage.getItem("shortenUrlList");

if (urlList && urlList.length >= 0) {
  shortenUrlList = JSON.parse(urlList);
  console.log(shortenUrlList);

  shortenUrlList.forEach((element, index) => {
    if (index < 3) {
      updateUI(element.org, element.shr, (currentBTN, shortenURL) => {
        const txtarea = document.createElement("textarea");
        txtarea.value = shortenURL.textContent;
        console.log(shortenURL.textContent);
        document.body.appendChild(txtarea);
        txtarea.select();
        txtarea.setSelectionRange(0, 99999);
        document.execCommand("copy");
        currentBTN.style.backgroundColor = "hsl(257, 27%, 26%)";
        currentBTN.textContent = "Copied!";
        txtarea.parentElement.removeChild(txtarea);
      });
    }
  });
}

localStorage.setItem("shortenUrlList", JSON.stringify(shortenUrlList));

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

  const backDrop = document.querySelector(".backDrop");
  const loading = document.querySelector(".loadingCircel");

  backDrop.style.display = "block";
  loading.style.display = "block";

  shortURL(inputURL.value.trim()).then(
    (val) => {
      if (shortenUrlList.length > 2) {
        shortenUrlList.pop();
      }
      shortenUrlList.unshift({ org: val.originalUrl, shr: val.shortenUrl });

      localStorage.setItem("shortenUrlList", JSON.stringify(shortenUrlList));

      backDrop.style.display = "none";
      loading.style.display = "none";

      updateUI(val.originalUrl, val.shortenUrl, (currentBTN, shortenURL) => {
        const txtarea = document.createElement("textarea");
        txtarea.value = shortenURL.innerHTML;
        document.body.appendChild(txtarea);
        txtarea.select();
        txtarea.setSelectionRange(0, 99999);
        document.execCommand("copy");
        currentBTN.style.backgroundColor = "hsl(257, 27%, 26%)";
        currentBTN.textContent = "Copied!";
        txtarea.parentElement.removeChild(txtarea);
      });
    },
    (error) => {
      alert("Please Try Again Later!!");
      console.log(error);
    }
  );
});
