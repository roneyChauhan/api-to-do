const Tasks = require('../models/task');
const { throwError, successRes } = require('../helpers/response');

module.exports.addTask = async(req, res) => {
    try {
        const user = req.user;
        const {title, description, dueDate, priority} = req.body;
        if (!(title && description && dueDate && priority)) {
            throwError(409, 'BAD_REQUEST', 'invalid user input');
        }
        let task = await Tasks.create({
            user : user.user_id,
            title,
            description,
            dueDate, 
            priority
        });
        const result = {task : task};
        return successRes(200, result);
    } catch (error) {
        console.log('error',error);
        throw error;
    }
}
