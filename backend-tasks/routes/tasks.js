var express = require("express");
var router = express.Router();

let tasks = [
    {
        id: "1254125412541",
        title: "Task 1",
        description: "Description 1",
        completed: "in-progress",
    },
    {
        id: "1254125412542",
        title: "Task 2",
        description: "Description 2",
        completed: "in-progress",
    },
    {
        id: "1254125412543",
        title: "Task 3",
        description: "Description 3",
        completed: "in-progress",
    },
    {
        id: "1254125412544",
        title: "Task 4",
        description: "Description 4",
        completed: "in-progress",
    },
    {
        id: "1254125412545",
        title: "Task 5",
        description: "Description 5",
        completed: "in-progress",
    },
    {
        id: "1254125412546",
        title: "Task 6",
        description: "Description 6",
        completed: "done",
    },
    {
        id: "1254125412547",
        title: "Task 7",
        description: "Description 7",
        completed: "in-progress",
    },
    {
        id: "1254125412548",
        title: "Task 8",
        description: "Description 8",
        completed: "in-progress",
    },
    {
        id: "1254125412549",
        title: "Task 9",
        description: "Description 9",
        completed: "in-progress",
    },
    {
        id: "1254125412540",
        title: "Task 10",
        description: "Description 10",
        completed: "done",
    },
];

/* GET users listing. */
router.get("/", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.header("Access-Control-Allow-Headers", "Content-Type");

    res.json(tasks);
});

module.exports = router;
