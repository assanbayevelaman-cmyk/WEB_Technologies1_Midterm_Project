(() => {
    const AUTH_KEY = 'musicapp-auth';

    function readSession() {
        try {
            const session = JSON.parse(localStorage.getItem(AUTH_KEY) || 'null');
            return session && typeof session.email === 'string' ? session : null;
        } catch {
            return null;
        }
    }

    function addAuthNavigation() {
        const nav = document.querySelector('.navbar-nav');
        if (!nav) return;

        const item = document.createElement('li');
        item.className = 'nav-item nav-auth';
        const session = readSession();

        if (session) {
            const greeting = document.createElement('span');
            greeting.className = 'nav-link nav-auth-greeting';
            greeting.textContent = `Hi, ${session.displayName || session.email}`;

            const signOut = document.createElement('button');
            signOut.type = 'button';
            signOut.className = 'btn btn-outline-light nav-auth-button';
            signOut.textContent = 'Sign out';
            signOut.addEventListener('click', () => {
                localStorage.removeItem(AUTH_KEY);
                window.location.href = 'signin.html?signedout=1';
            });

            item.append(greeting, signOut);
        } else {
            const signIn = document.createElement('a');
            signIn.className = 'nav-link nav-cta';
            signIn.href = 'signin.html';
            signIn.textContent = 'Sign in';
            item.append(signIn);
        }

        const themeItem = nav.querySelector('#themeToggle')?.closest('.nav-item');
        nav.insertBefore(item, themeItem || null);
    }

    function setupSignInForm() {
        const form = document.getElementById('signInForm');
        if (!form) return;

        const message = document.getElementById('signInMessage');
        const params = new URLSearchParams(window.location.search);
        if (params.get('signedout') === '1') {
            message.textContent = 'You have signed out.';
            message.className = 'alert alert-info';
            message.hidden = false;
        }

        form.addEventListener('submit', (event) => {
            event.preventDefault();
            form.classList.add('was-validated');

            if (!form.checkValidity()) {
                message.textContent = 'Please enter a valid email and a password of at least 8 characters.';
                message.className = 'alert alert-danger';
                message.hidden = false;
                return;
            }

            const email = form.elements.email.value.trim().toLowerCase();
            const displayName = email.split('@')[0].replace(/[._-]+/g, ' ').replace(/\b\w/g, (letter) => letter.toUpperCase());

            // This static demo stores only display information, never the password.
            localStorage.setItem(AUTH_KEY, JSON.stringify({ email, displayName }));
            message.textContent = 'You are signed in. Your session will remain active on this browser.';
            message.className = 'alert alert-success';
            message.hidden = false;
            window.setTimeout(() => { window.location.href = 'index.html'; }, 650);
        });
    }

    addAuthNavigation();
    setupSignInForm();
})();
