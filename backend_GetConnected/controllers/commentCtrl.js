const db = require('../models');

// Get comments for a specific student
const getComments = async (req, res) => {
    try {
        const comments = await db.Comment.find({ student: req.params.studentId }).populate('user', 'username');
        res.status(200).json({ data: comments });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Create a new comment
const createComment = async (req, res) => {
    try {
        const { content, studentId } = req.body;
        const userId = req.user.id;

        const newComment = new db.Comment({
            content,
            user: userId,
            student: studentId
        });

        await newComment.save();
        res.status(201).json({ message: "Comment created successfully", data: newComment });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update a comment
const updateComment = async (req, res) => {
    try {
        const updatedComment = await db.Comment.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!updatedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ message: "Comment updated successfully", data: updatedComment });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a comment
const deleteComment = async (req, res) => {
    try {
        const deletedComment = await db.Comment.findByIdAndDelete(req.params.id);

        if (!deletedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ message: "Comment deleted successfully", data: deletedComment });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getComments,
    createComment,
    updateComment,
    deleteComment
};