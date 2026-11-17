document.addEventListener("DOMContentLoaded", function () {
    const root = document.getElementById("music-api");
    if (!root) return;

    const form = root.querySelector("#music-api-form");
    const input = root.querySelector("#music-api-query");
    const status = root.querySelector("#music-api-status");
    const results = root.querySelector("#music-api-results");
    let requestNumber = 0;

    function hasText(value) {
        return typeof value === "string" && value.trim().length > 0;
    }

    function safeTrackLink(value) {
        if (!hasText(value)) return "";
        try {
            const url = new URL(value);
            const appleHost = url.hostname === "music.apple.com" || url.hostname === "itunes.apple.com";
            if (url.protocol === "https:" && appleHost && !url.username && !url.password && !url.port) {
                return url.href;
            }
        } catch (error) {
            return "";
        }
        return "";
    }

    function setStatus(state, message) {
        root.dataset.state = state;
        root.setAttribute("aria-busy", String(state === "loading"));
        status.textContent = message;
    }

    function addDetail(container, label, value) {
        if (!hasText(value)) return;
        const paragraph = document.createElement("p");
        paragraph.textContent = label + value;
        container.appendChild(paragraph);
    }

    function renderResults(records) {
        let count = 0;
        records.forEach(function (record) {
            if (!record || record.kind !== "song" || !hasText(record.trackName) || !hasText(record.artistName)) return;
            const href = safeTrackLink(record.trackViewUrl);
            if (!href) return;

            const item = document.createElement("li");
            item.className = "col-12 col-md-6 col-lg-4";
            const article = document.createElement("article");
            article.className = "music-api__result";
            const title = document.createElement("h3");
            title.className = "h5";
            title.textContent = record.trackName;
            article.appendChild(title);
            addDetail(article, "Artist: ", record.artistName);
            addDetail(article, "Album: ", record.collectionName);
            addDetail(article, "Genre: ", record.primaryGenreName);

            const link = document.createElement("a");
            link.href = href;
            link.textContent = "View on iTunes";
            article.appendChild(link);
            item.appendChild(article);
            results.appendChild(item);
            count++;
        });
        return count;
    }

    form.addEventListener("submit", async function (event) {
        event.preventDefault();
        const currentRequest = ++requestNumber;
        const query = input.value.trim();
        results.textContent = "";
        if (!query) {
            setStatus("empty", "Enter a song, artist or album before searching.");
            input.focus();
            return;
        }

        setStatus("loading", "Loading music from iTunes...");
        try {
            const url = "https://itunes.apple.com/search?term=" + encodeURIComponent(query) +
                "&media=music&entity=song&country=US&limit=20";
            const response = await fetch(url);
            if (currentRequest !== requestNumber) return;
            if (!response.ok) {
                throw new Error("iTunes returned HTTP " + response.status + ". Please try again later.");
            }
            const data = await response.json();
            if (currentRequest !== requestNumber) return;
            if (!data || !Array.isArray(data.results) || !Number.isInteger(data.resultCount) ||
                data.resultCount < 0 || data.resultCount !== data.results.length) {
                throw new Error("iTunes returned an unexpected response. Please try again later.");
            }
            if (data.results.length === 0) {
                setStatus("empty", "No results found. Try another song, artist or album.");
                return;
            }
            const count = renderResults(data.results);
            if (count === 0) {
                throw new Error("iTunes returned no usable song records. Please try another query.");
            }
            setStatus("success", count + (count === 1 ? " song found on iTunes." : " songs found on iTunes."));
        } catch (error) {
            if (currentRequest !== requestNumber) return;
            results.textContent = "";
            let message = error.message;
            if (error instanceof TypeError) {
                message = "Could not load music from iTunes. Check your connection and try again.";
            } else if (error instanceof SyntaxError) {
                message = "iTunes returned invalid JSON. Please try again later.";
            }
            setStatus("error", message);
        }
    });
});
