const bcrypt = require('bcryptjs');
const validator = require('validator');
// const User = require('../models/userModel');
const {sequelize} = require('../config/connection');
const {User} = require('../models')

const {
    createToken,
    checkToken
} = require('../config/JWT');


const register = async (req, res) => {
    const transaction = await sequelize.transaction();
    try{
        const {name, email, password, image} = req.body;

        if(!name || !email || !password) return res.status(400).json("Please enter required");
        if(!validator.isEmail(email)) return res.status(400).json("The email is invalid");

        await User.findOne({where: {email}}, {transaction}).then((data) => {
            if(data){
                return res.status(400).json("User email already exists dfdfd")
            }
        });

        const user = User.build({
            name: name,
            email: email, 
            password: password, 
            image: image ? image : null
        });
        const salt = bcrypt.genSaltSync(10);
        user.password = bcrypt.hashSync(user.password, salt);

        await User.create({
            name: user.name,
            email: user.email,
            password: user.password,
            image: user.image
        }, {transaction}).then((response) => {
            return res.status(200).json(response);
        });
        await transaction.commit();

    }catch(err){
        console.log(err);
        await transaction.rollback();
    }
}

const login = async (req, res) => {
    try{
        const {email, password} = req.body;
        const data = await User.findOne({where: {email}}).then( async (data) => {
            if(!data){
                return res.status(400).json("Email not found")
            }
            const isValidPassword = bcrypt.compareSync(password, data.password);

            if(!isValidPassword) return res.status(400).json("Password not valid");
            const _token = await createToken(data);
            return res.status(200).json(_token);
        });

    }catch(err){
        return res.status(500).json(err + '');
    }
}

const updateUser = async (req, res) => {
    const dataToken = req.authen.data;
    const transaction = await sequelize.transaction();
    try{
        const user = User.build({
            name: req.body.name,
            email: req.body.email,
            image: req.body.image ? req.body.image : null,
        });
        await User.update(
            {
                name: user.name,
                email: user.email,
                image: user.image
            },
            {
                where: {
                    id: dataToken.id,
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

const deleteUser = async (req, res) => {
    const dataToken = req.authen.data;
    const transaction = await sequelize.transaction();
    try{
        await User.destroy(
            {
                where: {
                    id: dataToken.id,
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

const getUser = async (req, res) => {
    const data = await User.findAll();
    return res.status(200).json(data);
}

const getUserId = async (req, res) => {
    const dataToken = req.authen.data;
    const data = await User.findOne({
        where: {
            id: dataToken.id
        }
    });

    return res.status(200).json(data);
}

module.exports = {
    login,
    register,
    getUser,
    deleteUser,
    updateUser,
    getUserId
}