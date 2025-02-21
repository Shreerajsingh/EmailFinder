async function getEmails(req, res) {
    const response = await emailService(req.body);

    return res.status(201).json({
        success: true,
        error: {},
        message: "Successfully sent the email for searching",
        data: response
    });
}

module.exports = { getEmails };