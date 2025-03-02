const express = require('express');
const EmailController = require('../../controllers/emailController');

const apiRouter = express.Router();

apiRouter.post('/', EmailController.getEmails);

module.exports = apiRouter;