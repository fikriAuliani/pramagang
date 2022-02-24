const express = require("express");
const NoteServices = require("./services");
const route = express.Router();


route.post('/notes', async(req, res) => {
    const {title, body} = req.body;
    const notes = await new NoteServices().addNotes({title, body});
    res.json(notes)
});

route.get('/notes', async(req, res) => {  //get all note
    const notes = await new NoteServices().getNotes();
    res.json(notes);
});

route.get('/notes/:id', async (req, res) => {
    const noteId = req.params.id;
    const getNoteById = await new NoteServices().getNoteById(noteId);
    res.json(getNoteById);
});

module.exports = route;

