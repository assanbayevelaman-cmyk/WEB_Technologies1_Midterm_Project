// One public initializer; search state and DOM helpers stay inside this module.
window.MusicAppSearch = (function () {
    function filterCatalog(catalog, query, category) {
        const normalizedQuery = query.trim().toLowerCase();

        return catalog.filter(function (entry) {
            const matchesCategory = category === "all" || entry.type === category;
            const searchableText = [entry.title, entry.artist || "", entry.album || ""].join(" ").toLowerCase();
            return matchesCategory && searchableText.includes(normalizedQuery);
        });
    }

    function createResult(entry) {
        const item = document.createElement("li");
        item.className = "col-12 col-md-6";

        const link = document.createElement("a");
        link.className = "catalog-search__result h-100";
        link.href = entry.href;

        const heading = document.createElement("div");
        heading.className = "d-flex justify-content-between align-items-start gap-2 mb-2";

        const title = document.createElement("h3");
        title.className = "h5 mb-0";
        title.textContent = entry.title;

        const type = document.createElement("span");
        type.className = "badge bg-dark text-light";
        type.textContent = entry.type.charAt(0).toUpperCase() + entry.type.slice(1);

        const details = document.createElement("p");
        details.className = "small text-muted mb-0";
        if (entry.type === "song") {
            details.textContent = entry.artist + " · " + entry.album + " · " + entry.duration;
        } else if (entry.type === "album") {
            details.textContent = entry.artist + " · " + entry.year + " · " + entry.genre;
        } else {
            details.textContent = entry.genre + " · Album: " + entry.album;
        }

        heading.appendChild(title);
        heading.appendChild(type);
        link.appendChild(heading);
        link.appendChild(details);
        item.appendChild(link);
        return item;
    }

    function renderResults(results, list, count, emptyMessage) {
        list.textContent = "";
        results.forEach(function (entry) {
            list.appendChild(createResult(entry));
        });
        count.textContent = results.length + (results.length === 1 ? " result found" : " results found");
        emptyMessage.hidden = results.length !== 0;
    }

    function initializeSearch(root, catalog) {
        const input = root.querySelector("#catalog-search-input");
        const clearButton = root.querySelector("#catalog-search-clear");
        const categoryButtons = root.querySelectorAll("[data-search-category]");
        const list = root.querySelector("#catalog-search-results");
        const count = root.querySelector("#catalog-search-count");
        const emptyMessage = root.querySelector("#catalog-search-empty");
        let selectedCategory = "all";

        function updateResults() {
            const results = filterCatalog(catalog, input.value, selectedCategory);
            renderResults(results, list, count, emptyMessage);
            clearButton.disabled = input.value.length === 0;
        }

        input.addEventListener("input", updateResults);

        categoryButtons.forEach(function (button) {
            button.addEventListener("click", function () {
                selectedCategory = button.getAttribute("data-search-category");
                categoryButtons.forEach(function (categoryButton) {
                    const isSelected = categoryButton === button;
                    categoryButton.classList.toggle("btn-dark", isSelected);
                    categoryButton.classList.toggle("btn-outline-dark", !isSelected);
                    categoryButton.setAttribute("aria-pressed", String(isSelected));
                });
                updateResults();
            });
        });

        clearButton.addEventListener("click", function () {
            input.value = "";
            updateResults();
            input.focus();
        });

        updateResults();
    }

    return { init: initializeSearch };
}());
