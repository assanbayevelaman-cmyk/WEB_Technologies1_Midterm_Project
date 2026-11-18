(function () {
    var KEY = 'theme';

    function readTheme() {
        try { return localStorage.getItem(KEY) === 'dark' ? 'dark' : 'light'; }
        catch (e) { return 'light'; }
    }

    function saveTheme(theme) {
        try { localStorage.setItem(KEY, theme); } catch (e) { /* storage unavailable */ }
    }

    function applyTheme(theme, button) {
        if (theme === 'dark') document.documentElement.setAttribute('data-theme', 'dark');
        else document.documentElement.removeAttribute('data-theme');
        if (button) {
            button.textContent = theme === 'dark' ? 'Light' : 'Dark';
            button.setAttribute('aria-pressed', String(theme === 'dark'));
        }
    }

    // Apply the saved theme immediately (this script runs in <head>) to avoid a flash.
    applyTheme(readTheme());

    function init() {
        var button = document.getElementById('themeToggle');
        if (!button) return;
        applyTheme(readTheme(), button);
        button.addEventListener('click', function () {
            var next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
            saveTheme(next);
            applyTheme(next, button);
        });
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
    else init();
})();
