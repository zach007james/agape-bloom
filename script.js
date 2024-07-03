function loadHtml(file, elementId) {
  fetch(file)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.text();
    })
    .then((data) => {
      document.getElementById(elementId).innerHTML = data;
    })
    .catch((error) => console.error('Error loading file:', error));
}

document.addEventListener("DOMContentLoaded", function () {
  loadHtml('/header.html', 'header');
  loadHtml('/footer.html', 'footer');

  // Your existing code
  const storedImageUrl = localStorage.getItem("lastArtImageUrl");
  const storedImageTitle = localStorage.getItem("lastArtImageTitle");

  if (storedImageUrl && storedImageTitle) {
    displayArt(storedImageUrl, storedImageTitle);
  } else {
    loadRandomArt();
  }

  const button = document.querySelector("button");
  if (button) {
    button.addEventListener("click", loadRandomArt);
  }
});

function displayArt(url, title) {
  const artContainer = document.getElementById("art-container");
  artContainer.innerHTML = `<img src="${url}" alt="${title}"><p>${title}</p>`;
}

function loadRandomArt() {
  const randomArtUrl = "https://example.com/random-art.jpg";
  const randomArtTitle = "Random Art Title";

  displayArt(randomArtUrl, randomArtTitle);

  localStorage.setItem("lastArtImageUrl", randomArtUrl);
  localStorage.setItem("lastArtImageTitle", randomArtTitle);
}

// Your existing functions
let activeFilters = [];

function toggleFilter(button, category, parent) {
  button.classList.toggle("active");

  const index = activeFilters.indexOf(category);
  if (index > -1) {
    activeFilters.splice(index, 1);
  } else {
    activeFilters.push(category);
  }

  if (activeFilters.length === 0) {
    document
      .querySelectorAll(".filter-btn")
      .forEach((btn) => btn.classList.remove("active"));
  }

  filterAndSortLinks(parent, "a");
}

function filterAndSortLinks(containerId, tagName) {
  var container = document.querySelector("." + containerId);
  var elements = Array.from(container.getElementsByTagName(tagName));

  elements.forEach((element) => (element.style.display = "none"));

  if (activeFilters.length > 0) {
    elements
      .filter((element) =>
        activeFilters.some((category) => element.classList.contains(category))
      )
      .forEach((element) => (element.style.display = ""));
  } else {
    elements.forEach((element) => (element.style.display = ""));
  }
}

function resetFilters() {
  activeFilters = [];

  document
    .querySelectorAll(".filter-btn")
    .forEach((button) => button.classList.remove("active"));

  filterAndSortLinks("apps-scripts-cont", "a");
}

function testButtonClick() {
  alert("Button clicked!");
}
