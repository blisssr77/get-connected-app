const db = require("../models");

// Get Freelancers for the current user
const getFreelancers = async (req, res) => {
    try {
        const freelancers = await db.Freelancer.find();
        console.log(req.user.id, " <-- this is req.user.id FROM FREELANCER")
        if (!freelancers) {
            return res.status(404).json({ message: "Cannot find Freelancers" });
        }
        res.status(200).json({ data: freelancers });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Create a new Freelancer
const createFreelancer = async (req, res) => {
    try {
        console.log("Request body:", req.body);
        console.log("Request file:", req.file);
        console.log("Request user:", req.user);
        
        const { fullname, age, career, hobby, degree, location, description, experience } = req.body;
        const photo = req.file ? req.file.path : null; // Get the photo file path if uploaded
        const userId = req.user.id

        if (!userId) {
            return res.status(400).json({ error: "User ID is required" });
        }

        const newFreelancer = new db.Freelancer({
            fullname,
            age,
            career,
            hobby,
            degree,
            location,
            description,
            experience,
            photo,
            User: userId,
        });

        await newFreelancer.save();
        res.status(201).json({ message: "Freelancer created successfully", data: newFreelancer });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Update an existing Freelancer
const updateFreelancer = async (req, res) => {
    try {
        const updatedFreelancer = await db.Freelancer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedFreelancer) {
            return res.status(400).json({ message: "Could not update Freelancer" });
        }
        res.status(200).json({ data: updatedFreelancer, message: "Freelancer updated" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

// Delete a Freelancer
const deleteFreelancer = async (req, res) => {
    try {
        const deletedFreelancer = await db.Freelancer.findByIdAndDelete(req.params.id);
        if (!deletedFreelancer) {
            return res.status(400).json({ message: "Could not delete Freelancer" });
        }
        res.status(200).json({ data: deletedFreelancer, message: "Freelancer deleted" });
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

module.exports = {
    getFreelancers,
    createFreelancer,
    updateFreelancer,
    deleteFreelancer
};