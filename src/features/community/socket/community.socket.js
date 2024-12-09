const { getCommunityPostsSocket } = require("../controllers/community.controller");



module.exports = (socket) => {
  // Handle "get_community_posts" event
  socket.on('get_community_posts', async () => {
    console.log('Fetching community posts...');
    await getCommunityPostsSocket(socket);
  });
  
};
