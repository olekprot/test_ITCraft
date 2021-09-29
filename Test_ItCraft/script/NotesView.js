
export default class NotesView {
    constructor(root, { onNoteSelect, onNoteAdd, onNoteEdit, onNoteDelete} = {}) {
        this.root = root;
        this.onNoteSelect = onNoteSelect;
        this.onNoteAdd = onNoteAdd;
        this.onNoteEdit = onNoteEdit;
        this.onNoteDelete = onNoteDelete;
        this.root.innerHTML = `

        <div class="notes_sidebar">
            <button class="notes_add" type="button">+ New</button>
            <div class="notes_list"></div>
        </div>


        <div class="notes_preview">
            <input type="text" class="title_search" placeholder="Search by title">
            <div class="notes_main">
                <h3>Title:</h2>
                <input type="text" class="notes_title" placeholder="Enter a title of your note">
                <button class="delete_button">Delete</button>
                <h3>Description:</h3>
                <textarea type="text" class="notes_body" placeholder="Enter your note"></textarea>
                <button class="notes_save">Save</button>
            </div>
        </div>`;

        const btnAddNote = this.root.querySelector(".notes_add");
        const btnDeleteNote = this.root.querySelector(".delete_button");
        const inpTitle = this.root.querySelector(".notes_title");
        const inpBody = this.root.querySelector(".notes_body");


        btnAddNote.addEventListener("click", () => {
            this.onNoteAdd();
        });
        btnDeleteNote.addEventListener("click", () => {
            this.onNoteDelete(btnDeleteNote.dataset.noteId);
        });

        [inpTitle, inpBody].forEach(inputField => {
            inputField.addEventListener("blur", ()=> {
                const updatedTitle = inpTitle.value.trim();
                const updatedBody = inpBody.value.trim();
               
                this.onNoteEdit(updatedTitle, updatedBody);    
            });
        });
    }

    _createListItemHTML(id, title){
        const MAX_TITLE_LENGHT = 50;
        return `
            <div class="notes_list-item"  data-note-id="${id}">
                <div class="notes_smaill-title">${title}</div>
            </div>
        ` 
    }
    updateNoteList(notes){
        const notesListContainer = this.root.querySelector(".notes_list");

        notesListContainer.innerHTML = "";

        for (const note of notes) {
            const html = this._createListItemHTML(note.id, note.title);

            notesListContainer.insertAdjacentHTML("beforeend", html);
        }
        
        notesListContainer.querySelectorAll(".notes_list-item").forEach(noteListItem => {
            noteListItem.addEventListener("click", ()=> {
                this.onNoteSelect(noteListItem.dataset.noteId);
            });
        });
    }

    updateActiveNote(note){
        if (note == null){
            note = {
                title: "",
                body: ""
            }
        }
        this.root.querySelector(".notes_title").value = note.title;
        this.root.querySelector(".notes_body").value = note.body;
        this.root.querySelector(".delete_button").dataset.noteId = note.id;
        if (note.id != null){
            this.root.querySelectorAll(".notes_list-item").forEach(noteListItem => {
                noteListItem.classList.remove("notes_list-item--selected");
            })
            this.root.querySelector(`.notes_list-item[data-note-id ="${note.id}"]`).classList.add("notes_list-item--selected");
        }   
    }

    
} 