
const express = require("express");
const app = express();

const path = require("path");
app.use(express.static(path.join(__dirname, 'public')));

const mongoose = require("mongoose");
const config = require("./config/config");


//Hämtar exportade todotask filen
const TodoTask = require("./models/TodoTask");


mongoose.set("useFindAndModify", false);

mongoose.connect(config.databaseurl, config.options)
.then(() => {
    app.listen(3000, () => console.log ("Lyssnar på servern som är igång!"));
})

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

//GET metoden
app.get("/", (req, res) => {
    TodoTask.find({}, (err, tasks) => {
    res.render("todo.ejs", {todoTasks: tasks});
    });
});

//POST metoden
app.post("/", async (req, res)=> {
    const todoTask = new TodoTask({
    content: req.body.content
    });
    try {
        await todoTask.save();
        res.redirect("/");
    }   catch (err) {
        res.redirect("/");
    }
});

//UPDATE metoden

app
.get("/edit/:id", (req, res)=> {
    const id = req.params.id;
    TodoTask.find({}, (err, tasks)=> {
        res.render("todoEdit.ejs", {todoTasks: tasks, idTask: id});
    });
})

.post("/edit/:id", (req, res)=> {
    const id = req.params.id;
    TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});

/*
app
.route("/edit/:id")
.get((req, res) => {
const id = req.params.id;
TodoTask.find({}, (err, tasks) => {
res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
});
})
.post((req, res) => {
const id = req.params.id;
TodoTask.findByIdAndUpdate(id, { content: req.body.content }, err => {
if (err) return res.send(500, err);
res.redirect("/");
});
});*/

//DELETE metoden
app.get("/remove/:id", (req, res)=> {
    const id = req.params.id;
    TodoTask.findByIdAndDelete(id, err => {
        if (err) return res.send(500, err);
        res.redirect("/");
    });
});


app.get("/", async (req, res, next)=> {
    const resPerPage = 9;
    const page = req.params.page || 1;

    const totalTodos = await Todotask.find()
    .skip((resPerPage * page) - resPerPage)
    .limit(resPerPage);
})