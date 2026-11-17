if (localStorage.getItem('theme') === 'dark')
    document.documentElement.setAttribute('data-theme', 'dark');
var themeBtn = document.getElementById('themeToggle');
if (localStorage.getItem('theme') === 'dark')
    themeBtn.textContent = 'Light';
themeBtn.onclick = function() {
    var dark = document.documentElement.getAttribute('data-theme') === 'dark';
    if (dark) {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
        themeBtn.textContent = 'Dark';
    } else {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        themeBtn.textContent = 'Light';
    }
};