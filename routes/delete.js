
const express = require('express');
const TodoTask = require('../models/TodoTask');

const router = express.Router();

//DELETE metoden
router.get("/remove/:id", (req, res)=> {
    const id = req.params.id;
    TodoTask.findByIdAndDelete(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});

module.exports = router