const express = require('express');
const router = express.Router();

const {
    createMessage,
    findUserChat,
    createRoomMessage
} = require('../controllers/chatController');

const {
    getAllRoom,
    findUserRoomChats,
    sendMessageRoom,
    findRoom,
    changeRoomName,
    addUserRoom,
    findAllUserRoom,
    userLogoutRoom
} = require('../controllers/roomController');

const {
    isAuth
} = require('../middlewares/AuthMiddleware')

router.get('/findUserChat/:userId', isAuth, findUserChat);
router.get('/findUserMessageRoom/:roomId', isAuth, findUserRoomChats);
router.get('/getRoomChats', isAuth, getAllRoom);
router.get('/findroomChat/:roomId', isAuth, findRoom);
router.get('/findAllUserRoom', isAuth, findAllUserRoom);

router.post('/createRoomMessage', isAuth, createRoomMessage)
router.post('/createMessage', isAuth, createMessage);
router.post('/sendMessageRoom', isAuth, sendMessageRoom);
router.put('/updateRoomChat', isAuth, changeRoomName);
router.put('/addUserRoom', isAuth, addUserRoom);
router.delete('/userLogoutRoom/:roomId', isAuth, userLogoutRoom);

// router.get('/todos/getTodo/:id', isAuth, getTodoId);
// router.post('/todos/create', isAuth, createTodo);
// router.put('/todos/update', isAuth, updateTodo);
// router.put('/todos/updateStatus', isAuth, updateStatusTodo);
// router.delete('/todos/delete/:id', isAuth, deleteTodo);

module.exports = router;