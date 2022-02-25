const express = require("express");
const validateNote = require("../validation");
const NoteServices = require("./services");
const route = express.Router();


route.post('/notes', async(req, res) => {                                  //menambahkan data
    try {
        await validateNote.validateAsync(req.body)
        // const {title, body} = req.body;
        const notes = await new NoteServices().addNotes(req.body);
        res.json({
            status: 'success',
            message: 'noted created successfully',
            data: notes
        })
    } catch (error) {
        res.json({
            status: 'fail',
            message: error.message
        })
    }

    // const {title, body} = req.body;
    // const notes = await new NoteServices().addNotes({title, body});
    // res.json(notes)
});

route.get('/notes', async(req, res) => {                                        //get all note
    try {
        const notes = await new NoteServices().getNotes();
        res.json({
            status: 'success',
            data: { notes } 
        })
    } catch (error) {

    }
    
});

route.get('/notes/:id', async (req, res) => {                                   //get note by Id
    try {
        const noteId = req.params.id;
        const getNoteById = await new NoteServices().getNoteById(noteId);     
        res.json({
            status: 'success',
            data: getNoteById
        });
    } catch (error) {
        res.json({
            status: 'fail',
            message: error.message
        })
    }
    
});

route.put('/notes/:id', async (req, res) => {                                       //mengedit atau update data
    
    const noteId = req.params.id;
    
    try {
        await validateNote.validateAsync(req.body);
         // const {title, body} = req.body;
        
        const editNote = await new NoteServices().editNoteById(noteId, req.body);
        res.json({
            status: 'success',
            message: 'notes edited successfully',
            data: editNote
        });
        // res.json(editNote);
    } catch (error) {
        res.json({
            status: 'fail',
            message: error.message
        })
    }
    
});

route.delete('/notes/:Id', async (req, res) => {                                    //menghapus data
    try {
        const noteId = req.params.Id;
        const deleteNote = await new NoteServices().deleteNoteById(noteId);
        res.json({
            status: 'success',
            data: deleteNote
        });
    } catch (error) {
        res.json({
            status: 'fail',
            message: error.message
        });
    }
    
});

module.exports = route;

