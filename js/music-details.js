// Render existing metadata into the panel; navigation belongs to gallery.js.
window.MusicAppDetails = (function () {
    function addMetadata(list, label, value) {
        const term = document.createElement("dt");
        const description = document.createElement("dd");
        term.textContent = label;
        description.textContent = value;
        list.appendChild(term);
        list.appendChild(description);
    }

    function renderLinks(list, entries) {
        list.textContent = "";
        entries.forEach(function (entry) {
            const item = document.createElement("li");
            const link = document.createElement("a");
            link.textContent = entry.title;
            link.href = entry.href;
            item.appendChild(link);
            list.appendChild(item);
        });
    }

    function renderDetails(container, card, entry, extra, catalog) {
        const sourceImage = card.querySelector("img");
        const image = container.querySelector("[data-details-image]");
        image.src = sourceImage.getAttribute("src");
        image.alt = sourceImage.getAttribute("alt");
        container.querySelector("[data-details-title]").textContent = entry.title;
        container.querySelector("[data-details-type]").textContent = entry.type === "album" ? "Album" : "Artist profile";
        const metadata = container.querySelector("[data-details-metadata]");
        metadata.textContent = "";
        const isAlbum = entry.type === "album";
        container.querySelector("[data-details-album]").hidden = !isAlbum;
        container.querySelector("[data-details-artist]").hidden = isAlbum;

        if (isAlbum) {
            addMetadata(metadata, "Artist", entry.artist);
            addMetadata(metadata, "Released", entry.year);
            addMetadata(metadata, "Genre", entry.genre);
            container.querySelector("[data-details-edition]").textContent = extra.edition;
            const tracks = container.querySelector("[data-details-tracks]");
            tracks.textContent = "";
            extra.tracks.forEach(function (title) {
                const item = document.createElement("li");
                item.textContent = title;
                tracks.appendChild(item);
            });
        } else {
            addMetadata(metadata, "Genres", entry.genre);
            container.querySelector("[data-details-biography]").textContent = extra.biography;
            renderLinks(container.querySelector("[data-details-albums]"), catalog.filter(function (record) {
                return record.type === "album" && record.artist === entry.title;
            }));
            renderLinks(container.querySelector("[data-details-songs]"), catalog.filter(function (record) {
                return record.type === "song" && record.artist === entry.title;
            }));
        }


    }

    return { render: renderDetails };
}());
