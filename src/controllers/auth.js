const Users = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { throwError, successRes } = require('../helpers/response');

module.exports.loginUser = async(req, res) => {
    try {
        const { email, password } = req.body;
        if (!(email && password)) {
            throwError(409, 'BAD_REQUEST', 'invalid user input');
        }
        const user = await Users.findOne({ email });
        if (user) {
            if (await bcrypt.compare(password, user.password)) {
                const token = jwt.sign(
                    { user_id: user._id, email },
                    process.env.TOKEN_KEY,
                    {
                      expiresIn: "2h",
                    }
                );
                user.token = token;
                await user.save();  
                const result = {user : user, token : token};
                return successRes(200, result);
            } else {
                throwError(409, 'INVALID_CREDINTIAL', 'credential not match');
            }
        } else {
            throwError(409, 'USER_NOT_FOUND', 'user not found');
        }
    } catch (error) {
        throw error;
    }
}
module.exports.registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        if (!(name && email && password)) {
            throwError(409, 'BAD_REQUEST', 'invalid user input');
        }
        const oldUser = await Users.findOne({ email });
        console.log("oldUser", oldUser);
        if (oldUser) {
            throwError(409, 'DUPLICATE_USER', 'User Already Exist. Please Login');
        }
        let encryptedPassword = await bcrypt.hash(password, 10);
        let user = await Users.create({
            name:name,
            email: email.toLowerCase(), // sanitize: convert email to lowercase
            password: encryptedPassword,
        });
        const token = jwt.sign(
            { user_id: user._id, email },
            process.env.TOKEN_KEY,
            {
              expiresIn: "2h",
            }
        );
        user.token = token;
        await user.save();
        const result = {user : user, token : token};
        return successRes(200, result);
    } catch (error) {
        console.log('error',error);
        throw error;
    }
}
