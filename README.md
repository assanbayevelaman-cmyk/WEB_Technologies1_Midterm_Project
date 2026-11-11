# Music Playlist Website: songs, albums, artists

## Project Title and Topic
MusicApp** - a multi-page music discovery website for browsing songs, albums, artists, and playlists.

## Group Member Names
- **Assanbayev Yelaman**
- **Dinmukhammed Dauletkhan**
- **Akkulov Zhasulan**

## Short Description
A responsive multi-page music discovery website built with HTML, CSS, Bootstrap, JavaScript, and jQuery. Visitors can search the published catalog, explore album track lists and artist profiles, and browse enlarged images in a fixed side panel. MusicApp is a static frontend project; it does not provide a backend, Spotify API integration, or audio streaming.

## Features Implemented
- Home page with an "About Us" section and a "What You Can Do" list.
- Dynamic Search & Filter on Home. Search updates while typing, ignores case and surrounding spaces, and works together with All / Songs / Albums / Artists filters without reloading the page.
- Search result counts, a no-results message, a clear button, and links to specific catalog entries.
- Songs page with a table of 10 tracks.
- Dynamic Table with CRUD operations on Songs. Insertion of new entries into a table, inline editing of existing records, delete option with confirmation prompts.
- Playlists page with Bootstrap cards for 6 playlists in a responsive grid.
- Contact page with a feedback form and a contact info card.
- Albums page with a responsive grid of album cards.
- Artists page with artist cards, photos, genres, and album links.
- Interactive Image Gallery on Albums and Artists: clicking an image opens a fixed side panel over a dark overlay, with enlarged images.
- Album Details with release year, genre, edition information, and complete track lists for the six selected album editions.
- Artist Details with short biographies, genres, and links to related albums and songs available in MusicApp.
- Shared sticky navigation bar and footer.
- External stylesheet with CSS variables, Google Font, hover/focus states, and media queries for tablet and mobile.

## Technologies Used
- HTML, CSS
- Bootstrap
- JavaScript
- DOM API
- jQuery
- Google Fonts

## Individual Contribution  
**Assanbayev Yelaman**
- Built `index.html` and `songs.html`
- Wrote `style.css` for both pages
- Implemented navbar, footer, and songs table
- Added responsive breakpoints for tablet and mobile
- Created a table for user suggested songs.
- Implemented full CRUD functionality using JavaScript.
- Added the ability to add new entries to the song suggestions table.
- Enabled inline editing of existing records.
- Allowed users to remove items with confirmation prompts.

**Akkulov Zhasulan**
- Implemented Home search for published songs, albums, and artists
- Added category filtering without page reloads
- Implemented case-insensitive search, result rendering and counts, clearing, and links to specific entries
- Organized the catalog data and search logic in separate JavaScript files
- Implemented interactive album and artist galleries using Bootstrap Grid
- Added enlarged image viewing in a responsive side panel
- Implemented cyclic Previous / Next navigation and jQuery Fade Effects
- Added album details, track lists, and artist profiles
- Adapted the card grid and panel behavior for different screen sizes


**Dinmukhammed Dauletkhan**
- Built `playlists.html` and `contact.html`
- Used the same navbar, footer, and `style.css` as the other pages to keep the design consistent
- Made the Playlists page with Bootstrap cards (title, description, songs, and a "Listen" button) in a responsive grid: 1 card per row on mobile, 2 on tablet, 3 on desktop
- Made the Contact page with a form (name, email, topic, message, checkbox) using Bootstrap form classes and basic validation with `required` and `type="email"`
- Used a two-column layout on the Contact page that stacks on small screens

## Link to Published Website
https://assanbayevelaman-cmyk.github.io/WEB_Technologies1_Midterm_Project/
