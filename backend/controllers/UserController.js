import User from "../models/LoginModel.js";

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
