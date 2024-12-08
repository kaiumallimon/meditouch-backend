const { Server } = require('socket.io');
let io;

const initializeSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: '*', // Update in production
      methods: ['GET', 'POST'],
    },
  });

  // Load Socket.IO routes
  require('./../global/socket.routes')(io);

  return io;
};

const getIO = () => {
  if (!io) {
    throw new Error('Socket.IO is not initialized!');
  }
  return io;
};

module.exports = { initializeSocket, getIO };
