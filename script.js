let activeFilters = [];

function toggleFilter(button, category, parent) {
    // Toggle active class on buttons
    button.classList.toggle('active');

    // Add or remove the category from the active filters list
    const index = activeFilters.indexOf(category);
    if (index > -1) {
        activeFilters.splice(index, 1); // Remove it if it's already in the array
    } else {
        activeFilters.push(category); // Add it if it's not in the array
    }

    // If no filters are active, reset to show all links
    if (activeFilters.length === 0) {
        document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
    }

    // Filter and sort links
    filterAndSortLinks(parent, 'a');
}


function filterAndSortLinks(containerId, tagName) {
    var container = document.querySelector('.' + containerId);
    var elements = Array.from(container.getElementsByTagName(tagName));

    // Initially hide all elements
    elements.forEach(element => element.style.display = 'none');

    // Determine which elements to show based on active filters
    if (activeFilters.length > 0) {
        elements.filter(element => activeFilters.some(category => element.classList.contains(category)))
                .forEach(element => element.style.display = ''); // Show filtered elements
    } else {
        elements.forEach(element => element.style.display = ''); // No filters, show all elements
    }

    // Note: This approach does not sort the elements in the DOM,
    // but you could sort them visually or manage their order differently.
}


function resetFilters() {
    // Clear active filters
    activeFilters = [];

    // Remove 'active' class from all buttons
    document.querySelectorAll('.filter-btn').forEach(button => button.classList.remove('active'));

    // Re-display all links
    filterAndSortLinks('apps-scripts-cont', 'a');
}


document.addEventListener("DOMContentLoaded", function() {
    // Check if there's a stored image URL and use it
    const storedImageUrl = localStorage.getItem('lastArtImageUrl');
    const storedImageTitle = localStorage.getItem('lastArtImageTitle');

    if (storedImageUrl && storedImageTitle) {
        displayArt(storedImageUrl, storedImageTitle);
    } else {
        // If not, load a new random image
        loadRandomArt();
    }

    // Attach the event listener to the button
    document.querySelector("button").addEventListener("click", loadRandomArt);
});




function testButtonClick()
{
  alert("Button clicked!");
}