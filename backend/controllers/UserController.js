import User from "../models/LoginModel.js";
import Book from "../models/UserModel.js";
import bcrypt from "bcrypt";

//User Table
export const getUser = async(req, res) => {
    try {
        const users = await User.findAll({
            attributes:['id','name', 'email']
        });
        res.status(200).json(users);
    } catch (error) {
        console.log(error.message);
    }
}

export const getUserById = async(req, res) => {
    try {
        const response = await User.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const regisUser = async(req, res) => {
    const { name, email, password, confPassword } = req.body;
    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});
    const salt = await bcrypt.genSalt();
    const hashPassword = await bcrypt.hash(password, salt);
    try {
        await User.create({
            name: name,
            email: email,
            password: hashPassword
        });
        res.status(201).json({msg: 'User Created'});
    } catch (error) {
        console.log(error.message);
    }
}

export const updateUser = async(req, res) => {
    try {
        await User.update(req.body,{
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({msg: 'User Updated'});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteUser = async(req, res) => {
    try {
        await User.destroy({
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({msg: 'User Deleted'});
    } catch (error) {
        console.log(error.message);
    }
}

//Book Table
export const getBooks = async(req, res) => {
    try {
        const response = await Book.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const getBookById = async(req, res) => {
    try {
        const response = await Book.findOne({
            where:{
                id: req.params.id
            }
        });
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const createBook = async(req, res) => {
    try {
        await Book.create(req.body);
        res.status(201).json({msg: 'Book Added'});
    } catch (error) {
        console.log(error.message);
    }
}
