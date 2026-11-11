let suggestions = [];
let nextId = 1;
let editingId = null;

const suggForm = document.getElementById('suggForm');
const suggBody = document.getElementById('suggBody');
const suggTitle = document.getElementById('suggTitle');
const suggArtist = document.getElementById('suggArtist');
const suggAlbum = document.getElementById('suggAlbum');

function renderSuggestions() {
    if (suggestions.length === 0) {
        suggBody.innerHTML = '<tr><td colspan="5" class="text-center text-muted py-3">No suggestions yet.</td></tr>';
        return;
    }
    let html = '';
    suggestions.forEach(s => {
        html += `<tr>
            <td>${s.id}</td>
            <td>${s.title}</td>
            <td>${s.artist}</td>
            <td>${s.album}</td>
            <td>
                <button class="btn btn-sm btn-outline-primary" onclick="editSugg(${s.id})">Edit</button>
                <button class="btn btn-sm btn-outline-danger" onclick="deleteSugg(${s.id})">Delete</button>
            </td>
        </tr>`;
    });
    suggBody.innerHTML = html;
}

suggForm.onsubmit = (e) => {
    e.preventDefault();
    const data = {
        title: suggTitle.value.trim(),
        artist: suggArtist.value.trim(),
        album: suggAlbum.value.trim()
    };
    if (!data.title || !data.artist || !data.album) return;
    if (editingId !== null) {
        const s = suggestions.find(x => x.id === editingId);
        Object.assign(s, data);
        editingId = null;
    } else {
        suggestions.push({ id: nextId++, ...data });
    }
    suggForm.reset();
    renderSuggestions();
};

function editSugg(id) {
    const s = suggestions.find(x => x.id === id);
    suggTitle.value = s.title;
    suggArtist.value = s.artist;
    suggAlbum.value = s.album;
    editingId = id;
    suggTitle.focus();
}

function deleteSugg(id) {
    const s = suggestions.find(x => x.id === id);
    if (confirm('Delete suggestion "' + s.title + '"?')) {
        suggestions = suggestions.filter(x => x.id !== id);
        if (editingId === id) {
            editingId = null;
            suggForm.reset();
        }
        renderSuggestions();
    }
}

renderSuggestions();
