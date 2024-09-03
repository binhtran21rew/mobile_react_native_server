const { response } = require('express');
const { Op, Model, where } = require("sequelize");
const sequelize = require('../config/connection');

const models = require('../models')

const getAllRoom = async (req, res) => {
    const dataToken = req.authen.data;
    const result = await models.Room.findAll({
        include: [
            {
                model: models.User,
                as: 'RoomChats',
                attributes: ['id', 'name', 'image',],
                where: {
                    id: dataToken.id
                },

            }
        ]

    })
    return res.json(result);
}

const findRoom = async (req, res) => {
    const {roomId} = req.params;
    const result = await models.Room.findOne({
        where: {
            id: roomId
        },
        include: [
            {
                model: models.User,
                as: 'RoomChats',
                attributes: ['id', 'name', 'image',],
            }
        ]

    })
    return res.json(result);
}

const findUserRoomChats = async (req, res) => {
    const {roomId} = req.params;
    const dataToken = req.authen.data;

    const result = await models.Room.findAll({
        where: {
            id: roomId
        },
        include: [
            {
                model: models.MessageRecipient,
                as: 'MessageRecipient',
                include: {
                    model: models.Message,
                    as: 'Message',
                    include: {
                        model: models.User,
                        as: 'User',
                    }
                    
                }
            }
        ]
    })
    return res.json(result);
}

const sendMessageRoom = async (req, res) => {
    const {text, roomId} = req.body;
    const dataToken = req.authen.data;
    try{
        const result = await models.sequelize.transaction( async t => {
            const findRoom = await models.Room.findOne({
                where: {
                    id: roomId
                }
            }).then( async (result) => {
                if(!result) return res.status(404).json('room not found');
                const message = await models.Message.create({
                    text: text,
                    UserId: dataToken.id,
                    MessageRecipient: {
                        RoomId: result.id
                    }
                }, { 
                    transaction: t,
                    include: {
                        model: models.MessageRecipient,
                        as: 'MessageRecipient'
                    }
                });
                return message;
            })
            return findRoom
        })

        return res.status(200).json(result);
    }catch(err){

        return res.status(500).json(err + '');

    }
}

const changeRoomName = async (req, res) => {
    const {id, name} = req.body;
    const dataToken = req.authen.data;
    try{
        const result = await models.sequelize.transaction( async t => {
            await models.Room.update(
                {
                    name: name
                },
                {
                    where: {
                        id: id
                    },
                    transaction: t
                }
            ).then(result => {
                return result;
            })
        })

        return res.status(200).json(result);
    }catch(err){
        return res.status(500).json(err + '');
    }
}


const addUserRoom = async (req, res) => {
    const {roomId, userId} = req.body;
    const dataToken = req.authen.data;
    try{
        const result = await models.sequelize.transaction( async t => {
            const room = await models.Room.findOne({
                where: {
                    id: roomId
                },
                transaction: t
            })

            const user = await models.User.findOne({
                where: {
                    id: userId
                },
                transaction: t
            })
            return await user.addRoomChat(room);
        })
        return res.status(200).json(result);

    }catch(err){
        return res.status(500).json(err + '');
    }

}

const findAllUserRoom = async (req, res) => {
    const result = await models.User.findAll({
        attributes: ['id', 'name', 'image'],
        include: {
            model: models.Room,
            as: 'RoomChats'
        }
    })

    return res.status(200).json(result);
}

const userLogoutRoom = async(req, res) => {
    const {roomId} = req.params
    const dataToken = req.authen.data;
    try{
        const result = await models.sequelize.transaction( async t => {
            const room = await models.Room.findOne({
                where: {
                    id: roomId
                },
                transaction: t
            })

            const user = await models.User.findOne({
                where: {
                    id: dataToken.id
                },
                transaction: t
            })
            return await user.removeRoomChat(room);
        })
        return res.status(200).json(result);

    }catch(err){
        return res.status(500).json(err + '');
        
    }
}

module.exports = {
    getAllRoom,
    findUserRoomChats,
    sendMessageRoom,
    findRoom,
    changeRoomName,
    addUserRoom,
    findAllUserRoom,
    userLogoutRoom
}