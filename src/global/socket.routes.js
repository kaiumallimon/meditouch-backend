const communitySocket = require("../features/community/socket/community.socket");

module.exports = (io) => {
    io.on('connection', (socket) => {
        console.log(`User connected: ${socket.id}`);

        // Attach socket event handlers for different features
        communitySocket(socket);

        // Add a generic disconnect event
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`);
        });
    });
};
