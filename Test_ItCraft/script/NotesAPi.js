export default class NotesAPI {
    static getAllNotes() {
        const notes = JSON.parse(localStorage.getItem("notesapp-notes") || "[]");

        return notes;
    }

    static saveNotes(noteToSave) {
        const notes = NotesAPI.getAllNotes();
        const existing = notes.find(note => note.id == noteToSave.id);

        if(existing){
            existing.title = noteToSave.title;
            existing.body = noteToSave.body;
            existing.updated = new Date().toISOString();
        } else {
            noteToSave.id = Math.floor(Math.random()*100000);
            noteToSave.updated = new Date().toISOString();
            notes.unshift(noteToSave);
        }

        localStorage.setItem("notesapp-notes", JSON.stringify(notes));

    }
    
    static deleteNote(id) {
        const notes = NotesAPI.getAllNotes();
        const newNotes = notes.filter(note => note.id != id);
        
        localStorage.setItem("notesapp-notes", JSON.stringify(newNotes));
    
    }
}