const { spawn } = require('child_process');

function executeCommand(io, email, socketId) {
    return new Promise((resolve, reject) => {
        const dockerProcess = spawn('docker', ['run', 'holehe', 'holehe', email]);
        let output = '';

        dockerProcess.stdout.on('data', (data) => {
            const lines = data.toString().split('\n');
            lines.forEach(line => {
                if (line.trim()) {
                    io.to(socketId).emit('containerOutput', {
                        type: 'output',
                        data: line
                    });
                    output += line + '\n';
                }
            });
        });

        dockerProcess.stderr.on('data', (data) => {
            io.to(socketId).emit('containerOutput', {
                type: 'error',
                data: data.toString()
            });
        });

        dockerProcess.on('close', (code) => {
            if (code === 0) {
                io.to(socketId).emit('containerOutput', {
                    type: 'complete',
                    data: 'Process completed successfully'
                });
                resolve(output);
            } else {
                reject(new Error(`Process exited with code ${code}`));
            }
        });
    });
}

module.exports = { executeCommand };