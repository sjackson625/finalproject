// store the link plus the API key in a variable
const key = "uQG4jhIEHKHKm0qMKGcTHqUgAolr1GM0";
const API = `https://api.nytimes.com/svc/topstories/v2/nyregion.json?api-key=${key}`;
const storagePrefix = "nyt-autosave";

import { setWithExpiry, getWithExpiry} from './modules/localStorageHelpers.js'

function getStories() {
  const value = getWithExpiry(storagePrefix);
  if (!value) {
    console.log(" expired - fetching again ");
    fetch(API)
      .then((response) => response.json())
      .then((data) => showData(data.results));
  } else {
    document.querySelector(".stories").innerHTML = value;
  }
}

function showData(stories) {
  const looped = stories
    .map(
      (story) => `
    <div class="item">
    <img src="${story.multimedia ? story.multimedia[2].url : ""}" alt="${
        story.multimedia ? story.multimedia[2]?.caption : ""
      }" />
    <figcaption>${
      story.multimedia ? story.multimedia[2]?.caption : ""
    }</figcaption>
      <h3><a href="${story.url}">${story.title}</a></h3>
      <p>${story.abstract}</p>
    </div>
  `
    )
    .join("");

  document.querySelector(".stories").innerHTML = looped;
  setWithExpiry(storagePrefix, looped, 1000 * 60);
}

if (document.querySelector(".home")) {
  getStories();
}

// nav

// var hamburger = document.querySelector("#pull");
// var body = document.querySelector("body");

document.addEventListener("click", clickHandlers);

// function clickHandlers(event) {
//   console.log(event.target);
//   if (event.target.matches("#pull")) {
//     document.querySelector("body").classList.toggle("show-nav");
//     event.preventDefault();
//   }
//   // event.preventDefault();
// }

function clickHandlers(event) {
  if (event.target.matches("#pull")) {
    showMenu();
    event.preventDefault();
  }
  if (event.target.matches(".content-video a")) {
    videoSwitch(event);
    event.preventDefault();
  }
}

function showMenu() {
  document.querySelector("body").classList.toggle("show-nav");
}

function videoSwitch(event) {
  const iFrame = document.querySelector("iframe");
  const videoLinks = document.querySelectorAll(".content-video a");
  videoLinks.forEach((videoLink) => videoLink.classList.remove("active"));
  event.target.classList.add("active");
  const videoToPlay = event.target.getAttribute("href");
  iFrame.setAttribute("src", videoToPlay);
}
