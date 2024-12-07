// hugging face login:

// email: info@agapebloom.customElements
// password: Eatrealfood!1


// Defines my-header for the template header
class myHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <header class="header">
        <div class="header-container">
          <a href="/index.html"><img class="signature-image" src="/archive/images/agape_bloom_signature.png"
              alt="Agape Bloom" /></a>
          <nav>
            <ul>
              <li><a href="/contact.html">Contact</a></li>
              <li><a href="/about.html">About</a></li>
              <li><a href="/archive.html">Archive</a></li>
            </ul>
          </nav>
        </div>
      </header>
    `;
  }
}

class myFooter extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <footer>
        <div class="footer-content">
          <div class="footer-description">
            <p>Agape Bloom (AB) is a Louisiana-based development and application consultancy that helps companies adapt with
              and leverage technology in a rapidly changing ecosystem. We help you build LLM-driven tools for both internal
              and external products that leverage smaller, open-source models, scratch regression and classification models,
              and traditional software.</p>
          </div>
          <div class="footer-articles">
            <h4>Recent Articles</h4>
            <div class="articles_cont">
              <a href="/archive/literary-synthesis/ideal-team-player.html">How to be a Team Player</a>
              <a href="/archive/literary-synthesis/deep-work.html">Depth Necessity: Cal Newport's Deep Work</a>
              <a href="/archive/literary-synthesis/designing-orgs-inforich-world.html">Designing Organizations for an
                Information-Rich World</a>
              <a href="/archive/literary-synthesis/article4.html">Article 4</a>
              <a href="/archive/literary-synthesis/article5.html">Article 5</a>
              <a href="/archive/literary-synthesis/article6.html">Article 6</a>
            </div>
          </div>
          <div class="footer-links">
            <a href="https://www.linkedin.com/company/agapebloom/" target="_blank">
              <img src="/archive/images/yellow-linkedin-icon.png" alt="LinkedIn">
            </a>
            <a href="https://twitter.com" target="_blank">
              <img src="/archive/images/yellow-x_twitter-icon.png" alt="Twitter">
            </a>
            <a href="https://youtube.com" target="_blank">
              <img src="/archive/images/yellow-youtube-icon.png" alt="YouTube">
            </a>
          </div>
        </div>
        <p id="copywright">© Zachary Robert James. All rights reserved.</p>
      </footer>
    `;
  }
}

customElements.define('my-header', myHeader);
customElements.define('my-footer', myFooter);

document.addEventListener("DOMContentLoaded", function () {
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
