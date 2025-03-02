const express = require('express');
const { createServer } = require('http');
const { Server } = require('socket.io');
const { PORT } = require('./config/server-config');
const cors = require('cors');
const apiRouter = require('./routes');

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

app.use(cors());
app.use((req, res, next) => {
    req.io = io;
    next();
});

app.use(express.json());
app.use('/api', apiRouter);

io.on('connection', (socket) => {
    console.log('Client connected:', socket.id);

    socket.on('disconnect', () => {
        console.log('Client disconnected:', socket.id);
    });
});

httpServer.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});