const db = require("../models");

// Get Students for the current user
const getStudents = async (req, res) => {
    try {
        const students = await db.Student.find({ User: req.user.id });
        console.log(students);
        if (!students) {
            return res.status(404).json({ message: "Cannot find Students" });
        }
        res.status(200).json({ data: students });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Create a new Student
const createStudent = async (req, res) => {
    try {
        const newStudent = await db.Student.create({ ...req.body, User: req.user.id });
        newStudent.save();
        console.log(newStudent);
        res.status(201).json({ data: newStudent, message: "Student created" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update an existing Student
const updateStudent = async (req, res) => {
    try {
        const updatedStudent = await db.Student.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedStudent) {
            return res.status(400).json({ message: "Could not update Student" });
        }
        res.status(200).json({ data: updatedStudent, message: "Student updated" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a Student
const deleteStudent = async (req, res) => {
    try {
        const deletedStudent = await db.Student.findByIdAndDelete(req.params.id);
        if (!deletedStudent) {
            return res.status(400).json({ message: "Could not delete Student" });
        }
        res.status(200).json({ data: deletedStudent, message: "Student deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getStudents,
    createStudent,
    updateStudent,
    deleteStudent
};