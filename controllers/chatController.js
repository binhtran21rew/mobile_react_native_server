const { response } = require('express');
const { Op, Model } = require("sequelize");
const sequelize = require('../config/connection');

const models = require('../models')


const createRoomMessage = async (req, res) => {
    const {members} = req.body;
    const dataToken = req.authen.data;
    const checkUser = await models.User.findAll({
        where: {
            id: members
        }
    }).then(data => data)
    if(checkUser.length !== members.length) return res.json('User khong ton tai');

    const userArray = [...members, dataToken.id];
    const checkUserDouble = members.filter(data =>  data === dataToken.id)
    if(checkUserDouble.length > 0){
        return res.status(400).json('khong the tao nhom voi chinh minh');
    }

    try{
        const result = await models.sequelize.transaction( async t => {
            const room = await models.User.findAndCountAll({
                where:{
                    id:  userArray,
                },
                include: {
                    model: models.Room,
                    as: 'RoomChats'
                }
            })
            .then( async ({count, rows}) => {
                const createRoom = await models.Room.create({
                    name: `${dataToken.name} is host`
                }, {transaction: t});
        
        
                const roomChat = rows.map(async (data) => {
                    await data.addRoomChat(createRoom);
                })
                return roomChat;
            })
            return room;
        })

        return res.status(200).json(result);
    }catch(e){
        return res.status(500).json(err + '');

    }

}



const createMessage = async (req, res) => {
    const {text, members} = req.body;
    const dataToken = req.authen.data;
    const checkUser = await models.User.findAll({
        where: {
            id: members
        }
    }).then(data => data)
    if(checkUser.length !== members.length) return res.json('User khong ton tai');

    try{
        const result = await models.sequelize.transaction( async t => {
            if(members.length === 1) {
                const user = await models.User.findOne({
                    where: {
                        id: members
                    }
                }).then(async data => {
                    if(!data) return res.status(404).json('not found');
                    const message = await models.Message.create({
                        text: text,
                        UserId: dataToken.id,
                        MessageRecipient: {
                            UserId: members
                        }
                    }, {
                        include: {model: models.MessageRecipient, as: 'MessageRecipient'},
                        transaction: t
                    });
                    return message;
                })
                return user;
            }else{
                return 'khong the gui tin nhan';
            }
        })

        return res.status(200).json(result);
    }catch(err){
        return res.status(500).json(err + '');
    }
}

const findUserChat = async (req, res) => {
    const userId = req.params.userId;
    const dataToken = req.authen.data;

    const checkUser = await models.User.findOne({
        where: {
            id: userId
        }
    })
    if(!checkUser) return res.json([]);

    const user = await models.Message.findAll({
        where:{
            userId: [dataToken.id, userId],
            '$MessageRecipient.UserId$': [dataToken.id, userId]
        },
        include: {
            model: models.MessageRecipient,
            as: 'MessageRecipient'
        }
    })
    return res.json(user);
}






module.exports = {
    createMessage,
    findUserChat,
    createRoomMessage
}
