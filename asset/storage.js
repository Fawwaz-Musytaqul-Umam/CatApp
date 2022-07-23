const CACHE_KEY = "saved_notes";
function checkForStorage() {
    return typeof (Storage) !== undefined;
}

function putSavedNote(data) {
    if (checkForStorage()) {
        let notesData = null;

        if (localStorage.getItem(CACHE_KEY) == null) {
            notesData = [];
        } else {
            notesData = JSON.parse(localStorage.getItem(CACHE_KEY))
        }

        notesData.unshift(data);
        localStorage.setItem(CACHE_KEY, JSON.stringify(notesData))
    }
}

function showListNotes() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY) || [])
    } else {
        return [];
    }
}

function renderListNotes() {
    let noteId = 0;
    const notesData = showListNotes();

    let noteList = document.querySelector("#noteList")
    noteList.innerHTML = '<div class="delete-all-notes card">Hapus Semua Notes</div>';

    for (const note of notesData) {
        let div = document.createElement('div');
        div.setAttribute("class", `saved-note ${noteId} card`)
        div.innerHTML = note.header;

        noteList.appendChild(div);
        noteId++;
    }
}

const noteList = document.querySelector("#noteList")
noteList.addEventListener("click", function (event) {
    const target = event.target;
    
    if (event.target.classList.contains("saved-note")) {
        renderSavedNote(target.classList[1]);
    }

});

function renderSavedNote(index) {
    const noteHeader = document.querySelector('.note-header');
    const noteText = document.querySelector('.note-text');
    const notesData = showListNotes();

    noteHeader.innerHTML = notesData[index].header;
    noteText.innerHTML = notesData[index].text;
}

renderListNotes();