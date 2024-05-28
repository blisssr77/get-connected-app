const db = require('../models');

// Controller to fetch both students and freelancers for the current user
const getRoleProfile = async (req, res) => {
    const userId = req.user.id;

    try {
        const students = await db.Student.find({ User: userId });
        const freelancers = await db.Freelancer.find({ User: userId });

        res.status(200).json({ students, freelancers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getRoleProfile,
};