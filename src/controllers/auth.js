const Users = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { throwError, successRes } = require('../helpers/response');

module.exports.loginUser = async(req, res) => {
    try {
        const data = req.body;
		const sessionID = req.sessionID;
		const session = req.session;

        console.log('data',data,sessionID,'sessionID', 'session', session);

        return {session : session};
    } catch (error) {
        throw error;
    }
}
module.exports.registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;
        // Validate if user exist in our database
        const oldUser = await Users.findOne({ email });
        console.log("oldUser", oldUser);
        if (oldUser) {
            throwError(409, 'DUPLICATE_USER', 'User Already Exist. Please Login');
            // res.status(409).send("");
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
        return successRes(200, user);
    } catch (error) {
        console.log('error',error);
        throw error;
    }
}
