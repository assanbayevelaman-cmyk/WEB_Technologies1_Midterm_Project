# MusicApp: Final Project (WEB Technologies 1)

## Project Title and Topic
**MusicApp** is a multi-page music discovery website for browsing songs, albums, artists, and playlists, and for finding more music through a public API.

## Group Members
- **Assanbayev Yelaman**
- **Akkulov Zhasulan**
- **Dinmukhammed Dauletkhan**

## Links
- **Deployed website (GitHub Pages):** https://assanbayevelaman-cmyk.github.io/WEB_Technologies1_Midterm_Project/
- **GitHub repository:** https://github.com/assanbayevelaman-cmyk/WEB_Technologies1_Midterm_Project

## Short Description
A responsive, multi-page music website built with HTML5, CSS, Bootstrap, JavaScript, jQuery, and the iTunes Search API. Visitors can search the catalog, explore album and artist details, suggest songs, switch between Light and Dark themes, sign in, and search for real songs through the API. It is a static frontend project: there is no backend and no audio streaming.

## Pages (8)
| Page | File |
|---|---|
| Home (catalog search and filters) | `index.html` |
| Songs (table, CRUD suggestions, iTunes API search, FAQ) | `songs.html` |
| Albums | `albums.html` |
| Artists | `artists.html` |
| Playlists | `playlists.html` |
| Contact | `contact.html` |
| Create account | `register.html` |
| Sign in | `signin.html` |

A shared navigation bar is visible on every page.

## Features Implemented

### Final project requirements
- **Light/Dark theme toggle** (`js/theme.js`): the choice is saved in `localStorage`, stays active after a refresh, and is applied on all pages.
- **Sign-in with localStorage** (`js/auth.js`, `signin.html`): a validated form (email format, password of at least 8 characters). Only non-sensitive data (email and display name) is saved, never the password. The session survives a refresh. On every page the navbar shows "Sign in" when signed out, or a greeting and a **Sign out** button when signed in. Sign out clears the saved state.
- **jQuery FAQ** (`js/faq.js`, Songs page): 5 music-related questions, answers open and close with `.slideToggle()`, and a + / − indicator shows the state.
- **API integration** (`js/music-api.js`, Songs page): the public **iTunes Search API** is called with `fetch()`, JSON is processed, and results are rendered dynamically. Users can search by song, artist, or album. Empty input, loading state, no results, and request errors are handled.

### Earlier features
- Home page with dynamic search and All / Songs / Albums / Artists filters.
- Songs table with CRUD for song suggestions (add, inline edit, delete with confirmation).
- Albums and Artists pages with an interactive image gallery, album track lists, and artist details.
- Playlists page with responsive Bootstrap cards.
- Contact form and registration form with live validation and a password-strength meter.
- Responsive layout (Flexbox / Grid / Bootstrap) for desktop, tablet, and mobile, with a shared sticky navbar and footer.

## Technologies Used
HTML5, CSS3, Bootstrap 5, JavaScript (DOM API, Fetch API, async/await, JSON, localStorage), jQuery, iTunes Search API, Google Fonts.

## Individual Contributions (Final Project)

**Akkulov Zhasulan: API Integration (15 points)**
- Integrated the public iTunes Search API on the Songs page using `fetch()`.
- Processed the JSON data and displayed titles, artists, albums, genres, and iTunes links dynamically.
- Added the search form, empty-input validation, loading indicator, empty-result message, and error handling.
- Prevented outdated responses from replacing newer ones.
- Wrote the responsive styling for the API section (`css/music-api.css`).

**Assanbayev Yelaman: Theme + FAQ (20 points)**
- Implemented the Light/Dark theme for all MusicApp pages with `localStorage` persistence (`js/theme.js`, `css/theme.css`).
- Built the FAQ section with 5 questions and jQuery `.slideToggle()` with a + / − indicator (`js/faq.js`).
- Earlier work: `index.html`, `songs.html`, shared `style.css`, navbar, footer, songs table, responsive breakpoints, and the CRUD table for song suggestions.

**Dinmukhammed Dauletkhan: Sign-in + Report (15 points)**
- Built the sign-in form with validation, the sign-in and sign-out logic, and the signed-in navbar interface (`signin.html`, `js/auth.js`, `css/auth.css`).
- Wrote this README and prepared the group report.
- Earlier work: `playlists.html`, `contact.html`, `register.html`, `js/form-validation.js`, and the shared Sign up link.

## AI Usage Disclosure
AI tools (Claude by Anthropic) were used only as supporting tools for debugging, code review, and cross-browser checks. The group's own implementation work, technical decisions, and responsibility for the submitted code were not replaced by AI. This credit is also shown in the footer of every page and in the group report.
