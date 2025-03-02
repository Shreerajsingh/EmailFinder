const { checkEmail } = require('../services/emailService');

async function getEmails(req, res) {
    try {
        const { email } = req.body;
        const socketId = req.body.socketId;

        if (!email) {
            return res.status(400).json({
                success: false,
                error: "Email is required"
            });
        }

        const response = await checkEmail(req.io, email, socketId);
        return res.status(200).json(response);
    } catch (error) {
        return res.status(500).json({
            success: false,
            error: error.message
        });
    }
}

module.exports = { getEmails };