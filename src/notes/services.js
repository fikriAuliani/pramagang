const { nanoid } = require("nanoid");
const { Pool } = require("pg");

class NoteServices {
    
    constructor() {
        this._poll = new Pool();
    }

    async addNotes({title, body}) {
        
        const id = `notes-${nanoid(16)}`; //16 karakter
        const createdAt = new Date().toISOString();
        const updatedAt = createdAt;

        const query = {
            text: 'INSERT INTO notes VALUES($1, $2, $3, $4, $5) RETURNING id',
            values: [id, title, body, createdAt, updatedAt]
        }

        const result = await this._poll.query(query);

        if (!result.rows[0].id) {
            throw new Error('Notes gagal ditambahkan');                 //error message
        }

        return result.rows[0];

    }

    async getNotes() {
        const result = await this._poll.query('SELECT * FROM notes');
        return result.rows;
    }


    async getNoteById(noteId) {
        const query = {
            text: 'SELECT * FROM notes WHERE id = $1',
            values: [noteId]
        };

        const result = await this._poll.query(query);

        if (!result.rows.length) {

            throw new Error('Note tidak ditemukan')                             //error message

        };

        return result.rows[0];

    }

    async editNoteById(noteId, {title, body}) {

        const updatedAt = new Date().toISOString();
        const query = {
           text: 'UPDATE notes SET title=$1, body=$2, updated_at=$3 WHERE id = $4 RETURNING id',
           values: [title, body, updatedAt, noteId]
        };

        const result = await this._poll.query(query);

        if (!result.rowCount) {
            throw new Error(`Note tidak dapat diubah, Id tidak ditemukan`)          //error message
        };
    }
   
    async deleteNoteById(noteId) {
        const query = {
            text: 'DELETE FROM notes WHERE id = $1',
            values: [noteId]
        };

        const result = await this._poll.query(query);
            
        if(!result.rowCount) {
            throw new Error('Note gagal dihapus, Id tidak ditemukan');              //error message
        };        
    }


}

module.exports = NoteServices;