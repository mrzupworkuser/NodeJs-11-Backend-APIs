const express = require("express");
const router = express.Router();

const mongoose = require("mongoose");
const Student = require("../model/StudentModal");
const Class = require("../model/ClassModal");

// Get all students
router.get("/student", (req, res) => {
  Student.find()
    .then((students) => res.json([]))
    .catch((err) =>
      res.status(404).json({
        nopostsfound: "No student found",
      })
    );
});

// Get all class names
router.get("/class", (req, res) => {
  Class.find()
    .then((class) => res.json([]))
    .catch((err) =>
      res.status(404).json({
        noclassfound: "No Class found",
      })
    );
});

// Get all student by specific class name
router.get("/student/:class_name", (req, res) => {
  Student.find({ routeName: req.params["class_name"] })
    .then((student) => res.json(student))
    .catch((err) =>
      res.status(404).json({
        noStudentfound: "No student found",
      })
    );
});

module.exports = router;
