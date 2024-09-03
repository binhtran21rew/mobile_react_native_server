const {sequelize} = require('../config/connection');
// const Todo = require('../models/todoModel');
const {Todo }= require('../models')


const getAll = async (req, res) => {
    // sequelize.sync({alter: true});
    const dataToken = req.authen.data;
    Todo.findAll({where: {UserId: dataToken.id}}).then((data) => {
        return res.send(data);
    })
}

const getTodoId = async (req, res) => {
    const dataToken = req.authen.data;
    try{
        Todo.findOne(
            {where: 
                {
                    id: req.params.id, 
                    UserId: dataToken.id
                }
            })
            .then((response) => {
                return res.status(200).json(response)
            }
        )
    }catch(err){
        return res.status(500).json(err);
    }
}

const createTodo = async (req, res) => {
    const dataToken = req.authen.data;
    const transaction = await sequelize.transaction();
    try{
        const todo = Todo.build({
            text: req.body.text,
            date: req.body.date,
        })
        await Todo.create({
            text: todo.text,
            date: todo.date,
            UserId: dataToken.id,
        }, {transaction}).then((response) => {
            return res.status(200).json(response);
        });

        await transaction.commit();
    }catch(err){
        await transaction.rollback();
        return res.status(500).json(err + '');
    }
}

const updateTodo = async (req, res) => {
    const dataToken = req.authen.data;
    const transaction = await sequelize.transaction();
    try{
        const todo = Todo.build({
            id: req.body.id,
            text: req.body.text,
            date: req.body.date
        });
        await Todo.update(
            {
                text: todo.text,
                date: todo.date
            },
            {
                where: {
                    id: todo.id,
                    UserId: dataToken.id
                },
                transaction
            },
        ).then((response) => {
            return res.status(200).json(response)
        })

        await transaction.commit();
    }catch(err){
        await transaction.rollback();
        return res.status(500).json(err);
    }
}

const updateStatusTodo = async (req, res) => {
    const dataToken = req.authen.data;
    const transaction = await sequelize.transaction();
    try{
        const todo = Todo.build({
            id: req.body.id,
            status: req.body.status
        });
        await Todo.update(
            {
                status: todo.status,
            },
            {
                where: {
                    id: todo.id,
                    UserId: dataToken.id
                },
                transaction
            },
        ).then((response) => {
            return res.status(200).json(response)
        })

        await transaction.commit();
    }catch(err){
        await transaction.rollback();
        return res.status(500).json(err);
    }
}

const deleteTodo = async (req, res) => {
    const dataToken = req.authen.data;
    const transaction = await sequelize.transaction();
    try{
        await Todo.destroy(
            {
                where: {
                    id: req.params.id,
                    UserId: dataToken.id
                },
                transaction
            }
        ).then((response) => {
            return res.status(200).json(response)
        })

        await transaction.commit();
    }catch(err){
        await transaction.rollback();
        return res.status(500).json(err);
    }

}

module.exports = {
    getAll,
    getTodoId,
    createTodo,
    updateTodo,
    updateStatusTodo,
    deleteTodo
}