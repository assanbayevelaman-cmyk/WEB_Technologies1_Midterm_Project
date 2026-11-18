(() => {
    const AUTH_KEY = 'musicapp-auth';
    const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    function readSession() {
        try {
            const session = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
            return session && typeof session.email === 'string' ? session : null;
        } catch {
            return null;
        }
    }

    function saveSession(session) {
        try {
            localStorage.setItem(AUTH_KEY, JSON.stringify(session));
            return true;
        } catch {
            return false;
        }
    }

    function clearSession() {
        try { localStorage.removeItem(AUTH_KEY); } catch { /* storage unavailable */ }
    }

    // Adds "Sign in" (signed out) or greeting + "Sign out" (signed in) to the navbar on every page.
    function addAuthNavigation() {
        const nav = document.querySelector('.navbar-nav');
        if (!nav || nav.querySelector('.nav-auth')) return;

        const item = document.createElement('li');
        item.className = 'nav-item nav-auth';
        const session = readSession();
        const onSignInPage = /signin\.html$/.test(window.location.pathname);

        if (session) {
            const greeting = document.createElement('span');
            greeting.className = 'nav-link nav-auth-greeting';
            greeting.textContent = `Hi, ${session.displayName || session.email}`;

            const signOut = document.createElement('button');
            signOut.type = 'button';
            signOut.id = 'signOutButton';
            signOut.className = 'btn btn-outline-light nav-auth-button';
            signOut.textContent = 'Sign out';
            signOut.addEventListener('click', () => {
                clearSession();
                window.location.href = 'signin.html?signedout=1';
            });

            item.append(greeting, signOut);

            // A signed-in user does not need the "Sign up" link.
            nav.querySelectorAll('a[href="register.html"]').forEach((link) => {
                const li = link.closest('.nav-item');
                if (li) li.remove();
            });
        } else {
            const signIn = document.createElement('a');
            signIn.className = 'nav-link nav-cta' + (onSignInPage ? ' active' : '');
            if (onSignInPage) signIn.setAttribute('aria-current', 'page');
            signIn.href = 'signin.html';
            signIn.textContent = 'Sign in';
            item.append(signIn);
        }

        const themeItem = nav.querySelector('#themeToggle')?.closest('.nav-item');
        if (themeItem) themeItem.after(item);
        else nav.append(item);
    }

    function showMessage(message, text, type) {
        message.textContent = text;
        message.className = `alert alert-${type}`;
        message.hidden = false;
    }

    function setupSignInForm() {
        const form = document.getElementById('signInForm');
        if (!form) return;

        const message = document.getElementById('signInMessage');
        const params = new URLSearchParams(window.location.search);
        const existing = readSession();

        if (params.get('signedout') === '1') {
            showMessage(message, 'You have signed out.', 'info');
        } else if (existing) {
            showMessage(message, `You are already signed in as ${existing.email}. Use "Sign out" in the menu to switch accounts.`, 'info');
        }

        const emailInput = form.elements.email;
        const passwordInput = form.elements.password;

        function validate() {
            const emailOk = EMAIL_RE.test(emailInput.value.trim());
            const passwordOk = passwordInput.value.length >= 8;
            emailInput.classList.toggle('is-invalid', !emailOk);
            emailInput.classList.toggle('is-valid', emailOk);
            passwordInput.classList.toggle('is-invalid', !passwordOk);
            passwordInput.classList.toggle('is-valid', passwordOk);
            return emailOk && passwordOk;
        }

        [emailInput, passwordInput].forEach((input) => {
            input.addEventListener('input', () => {
                if (input.classList.contains('is-invalid') || input.classList.contains('is-valid')) validate();
            });
        });

        form.addEventListener('submit', (event) => {
            event.preventDefault();

            if (!validate()) {
                showMessage(message, 'Please enter a valid email and a password of at least 8 characters.', 'danger');
                return;
            }

            const email = emailInput.value.trim().toLowerCase();
            const displayName = email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

            // Only non-sensitive info is stored. The password is never saved.
            if (!saveSession({ email, displayName })) {
                showMessage(message, 'Could not save your session. Please enable browser storage and try again.', 'danger');
                return;
            }
            showMessage(message, 'You are signed in. Your session will remain active on this browser.', 'success');
            window.setTimeout(() => { window.location.href = 'index.html'; }, 650);
        });
    }

    addAuthNavigation();
    setupSignInForm();
})();
