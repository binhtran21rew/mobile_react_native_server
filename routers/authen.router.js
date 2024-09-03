const express = require('express');
const router = express.Router();

const {
    login,
    register,
    getUser,
    deleteUser,
    updateUser,
    getUserId
} = require('../controllers/userController');


const {
    isAuth
} = require('../middlewares/AuthMiddleware')

router.get('/getUserId', isAuth, getUserId);
router.post('/register', register);
router.post('/login', login);
router.get('/users', isAuth, getUser);
router.put('/update', isAuth, updateUser);
router.delete('/delete', isAuth, deleteUser);



module.exports = router;