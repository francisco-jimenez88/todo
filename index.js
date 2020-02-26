
const express = require("express");
const app = express();
const path = require("path");

const mongoose = require("mongoose");
const config = require("./config/config");

//Hämtar exportade filer
const TodoTask = require("./models/TodoTask");
const deleteRoute = require('./routes/delete');
const updateRoute = require('./routes/update');
app.use(express.urlencoded({ extended: true }));

app.use(deleteRoute);
app.use(updateRoute);

mongoose.set("useFindAndModify", false);
mongoose.connect(config.databaseurl, config.options)
.then(() => {
    app.listen(3000, () => console.log ("Lyssnar på servern som är igång!"));
})
app.set("view engine", "ejs");
app.use(express.static(path.join(__dirname, 'public')));

//GET metoden
app.get("/", async (req, res) => {
    const resPerPage = 9;
    let page = req.query.page;
    if (!page || page <= 0) {
        page = 1
    }
    const totalTodos = await TodoTask.find({}, (err, tasks) => {
    res.render("todo.ejs", {todoTasks: tasks, page: page});
    })
    .skip((resPerPage * page) - resPerPage)
    .limit(resPerPage)
    .sort({content:1})
});

//GET metod för about sidan
app.get("/about", (req, res)=> {
    res.render("about.ejs")
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

module.exports = {
    app
}