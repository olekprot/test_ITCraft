import NotesView from "./NotesView.js";
import NotesAPI from "./NotesAPi.js"

export default class App {
    constructor(root){
        this.notes = [];
        this.activeNote = null;
        this.viev = new NotesView(root, this._handlers());

        this._refreshNotes();
    }

    _refreshNotes(){
        const notes = NotesAPI.getAllNotes();

        this._setNotes(notes);
        if (notes.lenght > 0) {
            this._setActiveNote(notes[0]);
        }
    }

    _setNotes(notes) {
        this.notes= notes;
        this.viev.updateNoteList(notes);
    }

    _setActiveNote(note) {
        this.activeNote = note;
        this.viev.updateActiveNote(note);
    }

    _handlers() {
        return {
            onNoteSelect: noteId => {
                const selectedNote = this.notes.find(note => note.id == noteId);
                this._setActiveNote(selectedNote);
            },
            onNoteAdd: () => {
                const newNote = {
                    title: "New note",
                    body: "This is a new note"
                }
                NotesAPI.saveNotes(newNote);
                this._refreshNotes();
                const selectedNote = this.notes[0];
                this._setActiveNote(selectedNote);
            },
            onNoteEdit: (title, body) => {
                
                NotesAPI.saveNotes({
                    id: this.activeNote.id,
                    title,
                    body
                });
                this._refreshNotes();
                const selectedNote = this.notes.find(note => note.id ==this.activeNote.id);
                this._setActiveNote(selectedNote);
            },
            onNoteDelete: noteId => {
                NotesAPI.deleteNote(noteId);
                this._refreshNotes();
                this._setActiveNote(this.notes[0]);
            },
        }
    }
}