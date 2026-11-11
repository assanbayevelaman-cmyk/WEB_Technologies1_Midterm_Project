// Composition root: other Endterm features can add their own initializers here.
document.addEventListener("DOMContentLoaded", function () {
    const searchRoot = document.getElementById("catalog-search");
    if (searchRoot) {
        window.MusicAppSearch.init(searchRoot, publishedMusicCatalog);
    }

    const galleryRoot = document.querySelector("[data-image-gallery]");
    const panel = document.getElementById("music-panel");
    const overlay = document.getElementById("music-panel-overlay");
    if (galleryRoot && panel && overlay && window.jQuery) {
        window.MusicAppGallery.init(galleryRoot, panel, overlay, publishedMusicCatalog,
            musicDetailsData, window.MusicAppDetails.render, window.jQuery);
    }
});
