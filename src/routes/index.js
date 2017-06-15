const router = require('express').Router();
// const chatsController = require('../controllers/chatsController');
// const messagesController = require('../controllers/messagesController');
// const usersController = require('../controllers/usersController');

// router.get('/chats',chatsController.getChats);

// router.get('/messages',messagesController.getMessages);

// router.get('/users', usersController.getUsers);


// Render a API index page
router.get('/', (req, res) => {
  console.log('get caro');
  res.sendFile(path.resolve('public/index.html'));
});

module.exports = router;
