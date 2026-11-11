var suggBody = document.getElementById('suggBody');
var submitBtn = document.getElementById('submitBtn');
function renumber() {
    var rows = suggBody.querySelectorAll('tr[data-sugg]');
    for (var i = 0; i < rows.length; i++) {
        rows[i].cells[0].textContent = i + 1;
    }
}
function buildActionsCell(row) {
    var cell = row.insertCell(4);
    var editBtn = document.createElement('button');
    editBtn.className = 'btn btn-sm btn-outline-primary me-1';
    editBtn.textContent = 'Edit';
    editBtn.addEventListener('click', function() {
        if (row.dataset.editing === '1') {
            for (var c = 1; c <= 3; c++) {
                var input = row.cells[c].querySelector('input');
                if (!input) continue;
                var val = input.value.trim();
                if (!val) {
                    input.focus();
                    return;
                }
                row.cells[c].textContent = val;
            }
            row.dataset.editing = '0';
            editBtn.textContent = 'Edit';
            editBtn.classList.remove('btn-success');
            editBtn.classList.add('btn-outline-primary');
        } else {
            var otherEditing = suggBody.querySelector('tr[data-editing="1"]');
            if (otherEditing && otherEditing !== row) {
                var otherBtn = otherEditing.querySelector('.btn-success');
                if (otherBtn) otherBtn.click();
            }
            for (var c = 1; c <= 3; c++) {
                var cell = row.cells[c];
                var input = document.createElement('input');
                input.type = 'text';
                input.className = 'form-control form-control-sm';
                input.value = cell.textContent;
                cell.textContent = '';
                cell.appendChild(input);
            }
            row.dataset.editing = '1';
            editBtn.textContent = 'Save';
            editBtn.classList.remove('btn-outline-primary');
            editBtn.classList.add('btn-success');
        }
    });
    var delBtn = document.createElement('button');
    delBtn.className = 'btn btn-sm btn-outline-danger';
    delBtn.textContent = 'Delete';
    delBtn.addEventListener('click', function() {
        if (!confirm('Delete this suggestion?')) return;
        row.remove();
        renumber();
        showEmptyIfNeeded();
    });
    cell.appendChild(editBtn);
    cell.appendChild(delBtn);
}
function showEmptyIfNeeded() {
    var existing = document.getElementById('emptyRow');
    if (suggBody.querySelectorAll('tr[data-sugg]').length === 0) {
        if (!existing) {
            var empty = document.createElement('tr');
            empty.id = 'emptyRow';
            empty.innerHTML = '<td colspan="5" class="text-center text-muted py-3">No suggestions yet.</td>';
            suggBody.appendChild(empty);
        }
    } else {
        if (existing) existing.remove();
    }
}
submitBtn.addEventListener('click', function(e) {
    e.preventDefault();
    var title  = document.getElementById('suggTitle').value.trim();
    var artist = document.getElementById('suggArtist').value.trim();
    var album  = document.getElementById('suggAlbum').value.trim();
    if (!title || !artist || !album) return;
    var empty = document.getElementById('emptyRow');
    if (empty) empty.remove();
    var row = suggBody.insertRow();
    row.dataset.sugg = '1';
    row.insertCell(0).textContent = '0';
    row.insertCell(1).textContent = title;
    row.insertCell(2).textContent = artist;
    row.insertCell(3).textContent = album;
    buildActionsCell(row);
    renumber();
    document.getElementById('suggTitle').value = '';
    document.getElementById('suggArtist').value = '';
    document.getElementById('suggAlbum').value = '';
    document.getElementById('suggTitle').focus();
});
