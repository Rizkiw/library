import User from "../models/LoginModel.js";
import Book from "../models/UserModel.js";
import Borrow from "../models/BorrowModel.js";
import bcrypt from "bcrypt";


export const getBorrow = async(req, res) => {
    try {
        const response = await Borrow.findAll();
        res.status(200).json(response);
    } catch (error) {
        console.log(error.message);
    }
}

export const borrowBook = async(req, res) => {
    try {
        await Borrow.create(req.body);
        res.status(201).json({msg: 'Book Borrowed'});
    } catch (error) {
        console.log(error.message);
    }
}

export const returnBook = async(req, res) => {
    const { name, title, status, isBorrow } = req.body;
    if(status === isBorrow) return res.status(400).json({msg: "Out of Stock"});
    try {
        await Borrow.create({
            name: name,
            title: title,
            status: status
        });
        res.status(201).json({msg: 'Book Returned'});
    } catch (error) {
        console.log(error.message);
    }
}


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
    if(password !== confPassword) return res.status(400).json({msg: "Password and Confirm Password not match"});
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

export const updateBook = async(req, res) => {
    try {
        await Book.update(req.body,{
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({msg: 'Book Updated'});
    } catch (error) {
        console.log(error.message);
    }
}

export const deleteBook = async(req, res) => {
    try {
        await Book.destroy({
            where:{
                id:req.params.id
            }
        });
        res.status(200).json({msg: 'Book Deleted'});
    } catch (error) {
        console.log(error.message);
    }
}

export const Login = async(req, res) => {
    try {
        const user = await User.findAll({
            where:{
                email: req.body.email
            }
        });
        const match = await bcrypt.compare(req.body.password, user[0].password);
        if(!match) return res.status(400).json({msg: "Wrong Password"})
        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({msg:"Email tidak ditemukan"});
    }
}