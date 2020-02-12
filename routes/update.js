
const express = require('express');
const TodoTask = require('../models/TodoTask');
const router = express.Router();

router
.get("/edit/:id", (req, res)=> {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks)=> {
        res.render("todoEdit.ejs", {todoTasks: tasks, idTask: id});
    });
})
router
.post("/edit/:id", async (req, res)=> {
    const id = req.params.id;
    console.log(req.body)
    await TodoTask.updateOne({_id: id}, { content: req.body.content }, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});

module.exports = router