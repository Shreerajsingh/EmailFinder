const { executeCommand } = require('../containers/dockerContainer');

async function checkEmail(io, email, socketId) {
    try {
        const result = await executeCommand(io, email, socketId);
        return {
            success: true,
            message: "Email check completed",
            data: result
        };
    } catch (error) {
        return {
            success: false,
            error: error.message,
            message: "Failed to check email"
        };
    }
}

module.exports = { checkEmail };