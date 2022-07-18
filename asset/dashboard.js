const CACHE_KEY = "saved_notes";
function checkForStorage() {
    return typeof (Storage) !== undefined;
}

const note = {
    header: null,
    text: null
}


const saveButton = document.querySelector('.save-button')
    .addEventListener('click', function () {
        const noteHeader = document.querySelector('.note-header');
        const noteText = document.querySelector('.note-text');

        if (noteHeader.value != '' && noteText.value != '') {
            note.header = noteHeader.value;
            note.text = noteText.value;

            putSavedNote(note)
            renderSavedNotes();
        }
    });

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

function showSavedNotes() {
    if (checkForStorage()) {
        return JSON.parse(localStorage.getItem(CACHE_KEY) || [])
    } else {
        return [];
    }
}

function renderSavedNotes() {
    const notesData = showSavedNotes();
    console.log(notesData);
    let noteList = document.querySelector("#noteList")
    noteList.innerHTML = '';

    for (const note of notesData) {
        let div = document.createElement('div');
        div.innerHTML = /*html*/`<div class="saved-note card"><p>${note.header}</p></div>`;
        noteList.appendChild(div);
    }
}

renderSavedNotes();