const db = require('../models');

// Create a new Comment
const createComment = async (req, res) => {
    try {
        const { content, studentId } = req.body;
        const userId = req.user.id;

        const newComment = new db.Comment({
            content,
            Student: studentId,
            User: userId,
        });

        await newComment.save();
        const populatedComment = await newComment.populate('User', 'fullname').execPopulate();

        res.status(201).json({ message: "Comment created successfully", data: populatedComment });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update an existing Comment
const updateComment = async (req, res) => {
    try {
        const { content } = req.body;
        const commentId = req.params.id;

        const updatedComment = await db.Comment.findByIdAndUpdate(commentId, { content }, { new: true }).populate('User', 'fullname');

        if (!updatedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ message: "Comment updated successfully", data: updatedComment });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a Comment
const deleteComment = async (req, res) => {
    try {
        const commentId = req.params.id;

        const deletedComment = await db.Comment.findByIdAndDelete(commentId);

        if (!deletedComment) {
            return res.status(404).json({ message: "Comment not found" });
        }

        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Get all Comments by a Student
const getCommentsByStudent = async (req, res) => {
    try {
        const studentId = req.params.id;
        const comments = await db.Comment.find({ Student: studentId }).populate('User', 'fullname');

        res.status(200).json({ data: comments });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    createComment,
    updateComment,
    deleteComment,
    getCommentsByStudent,
};