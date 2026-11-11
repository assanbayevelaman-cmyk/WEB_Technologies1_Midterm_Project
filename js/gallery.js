// One fixed panel for both details and image navigation. No Bootstrap Modal API.
window.MusicAppGallery = (function () {
    function initialize(root, panel, overlay, catalog, details, render, $) {
        const cards = Array.from(root.querySelectorAll(".card"));
        const content = panel.querySelector("[data-panel-content]");
        const $content = $(content);
        const previous = panel.querySelector("[data-panel-previous]");
        const next = panel.querySelector("[data-panel-next]");
        const closeButton = panel.querySelector("[data-panel-close]");
        const message = panel.querySelector("[data-panel-message]");
        const position = panel.querySelector("[data-panel-position]");
        const scrollArea = panel.querySelector("[data-panel-scroll]");
        const background = Array.from(document.body.children).filter(function (element) {
            return element.tagName === "MAIN" || element.tagName === "HEADER" || element.tagName === "FOOTER";
        });
        let originalInert = [];
        let isOpen = false;
        let busy = false;
        let index = 0;
        let request = 0;
        let lastTrigger = null;

        function setBusy(value) {
            busy = value;
            previous.disabled = value || cards.length < 2;
            next.disabled = value || cards.length < 2;
            content.setAttribute("aria-busy", String(value));
        }

        function showItem(target, animate) {
            if (!isOpen || busy) return;
            const card = cards[target];
            const extra = details.find(function (item) { return item.id === card.id; });
            const entry = catalog.find(function (item) {
                return item.href === (extra.type === "album" ? "albums.html#" : "artists.html#") + card.id;
            });
            const token = ++request;
            setBusy(true);
            message.hidden = true;
            const image = new Image();
            image.onload = function () {
                if (!isOpen || token !== request) return;
                function update() {
                    if (!isOpen || token !== request) return;
                    // Update image and information together while the content is hidden.
                    render(content, card, entry, extra, catalog);
                    index = target;
                    position.textContent = (index + 1) + " / " + cards.length;
                    scrollArea.scrollTop = 0;
                    $content.fadeIn(180, function () {
                        if (isOpen && token === request) setBusy(false);
                    });
                }
                if (animate) $content.fadeOut(160, update);
                else update();
            };
            image.onerror = function () {
                if (!isOpen || token !== request) return;
                message.textContent = "This image could not be loaded. Try Previous or Next.";
                message.hidden = false;
                setBusy(false);
            };
            image.src = card.querySelector("img").getAttribute("src");
        }

        function openPanel(trigger, target) {
            if (isOpen) return;
            lastTrigger = trigger;
            isOpen = true;
            originalInert = background.map(function (element) { return element.inert; });
            background.forEach(function (element) { element.inert = true; });
            panel.hidden = false;
            overlay.hidden = false;
            panel.getBoundingClientRect(); // Commit the off-screen position before sliding in.
            panel.classList.add("is-open");
            overlay.classList.add("is-open");
            $content.hide();
            position.textContent = "";
            showItem(target, false);
            closeButton.focus({ preventScroll: true });
        }

        function closePanel() {
            if (!isOpen) return;
            isOpen = false;
            const token = ++request;
            $content.stop(true, true);
            setBusy(false);
            panel.classList.remove("is-open");
            overlay.classList.remove("is-open");
            background.forEach(function (element, i) { element.inert = originalInert[i]; });
            lastTrigger.focus({ preventScroll: true });
            setTimeout(function () {
                if (!isOpen && token === request) {
                    panel.hidden = true;
                    overlay.hidden = true;
                }
            }, 240);
        }

        function changeItem(direction) {
            if (isOpen && !busy) showItem((index + direction + cards.length) % cards.length, true);
        }

        cards.forEach(function (card, target) {
            card.querySelectorAll("[data-gallery-trigger], [data-music-details]").forEach(function (trigger) {
                trigger.addEventListener("click", function () { openPanel(trigger, target); });
            });
        });
        previous.addEventListener("click", function () { changeItem(-1); });
        next.addEventListener("click", function () { changeItem(1); });
        closeButton.addEventListener("click", closePanel);
        overlay.addEventListener("click", closePanel);
        document.addEventListener("keydown", function (event) {
            if (!isOpen) return;
            if (event.key === "Escape") {
                event.preventDefault();
                closePanel();
            } else if (event.key === "Tab") {
                const focusable = Array.from(panel.querySelectorAll("button, a[href]")).filter(function (element) {
                    return !element.disabled && element.getClientRects().length > 0;
                });
                const first = focusable[0], last = focusable[focusable.length - 1];
                if (event.shiftKey && (document.activeElement === first || !panel.contains(document.activeElement))) {
                    event.preventDefault(); last.focus();
                } else if (!event.shiftKey && (document.activeElement === last || !panel.contains(document.activeElement))) {
                    event.preventDefault(); first.focus();
                }
            }
        });
    }
    return { init: initialize };
}());
