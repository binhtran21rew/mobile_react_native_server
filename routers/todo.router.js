const express = require('express');
const router = express.Router();

const {
    getAll,
    getTodoId,
    createTodo,
    updateTodo,
    updateStatusTodo,
    deleteTodo
} = require('../controllers/todoController');

const {
    isAuth
} = require('../middlewares/AuthMiddleware')

router.get('/todos/getAll', isAuth, getAll);
router.get('/todos/getTodo/:id', isAuth, getTodoId);
router.post('/todos/create', isAuth, createTodo);
router.put('/todos/update', isAuth, updateTodo);
router.put('/todos/updateStatus', isAuth, updateStatusTodo);
router.delete('/todos/delete/:id', isAuth, deleteTodo);

module.exports = router;