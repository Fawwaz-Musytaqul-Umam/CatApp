const note = {
    header: null,
    text: null,
}

const saveButton = document.querySelector('.save-button')
saveButton.addEventListener('click', function () {
    const noteHeader = document.querySelector('.note-header');
    const noteText = document.querySelector('.note-text');

    if (noteHeader.value != '' && noteText.value != '') {
        note.header = noteHeader.value;
        note.text = noteText.value;

        putSavedNote(note);
        renderListNotes();
    }
});

const deleteAllNotes = document.querySelector(".delete-all-notes");
deleteAllNotes.addEventListener("click",function () {
    let _confirm = confirm("anda Yakin Ingin Menghapus Semua Catatan anda ?")

    if (_confirm) {
        localStorage.removeItem(CACHE_KEY);
        window.location.reload();
    }
})