const Tasks = require('../models/task');
const { throwError, successRes } = require('../helpers/response');
const validPriority = ['low','medium','high'];
const validTaskStatus = ['pending','complete'];

module.exports.getTasks = async(req, res) => {
    try {
        const queryObj = req.query;
        const user = req.user;
        const validOrder = ['createdAt','dueDate'];
        let dbQuery = {
            user : user.user_id,
            status : 'active'
        };
        if (queryObj?.priority && validPriority.includes(queryObj.priority)) {
            dbQuery['priority'] = queryObj.priority; 
        }
        if (queryObj?.taskStatus && validTaskStatus.includes(queryObj.taskStatus)) {
            dbQuery['taskStatus'] = queryObj.taskStatus; 
        }
        let sortBy = {createdAt : 1};
        if (queryObj?.orderBy && queryObj?.order && validOrder.includes(queryObj.orderBy)) {
            sortBy = {[queryObj.orderBy] : queryObj.order === 'asc' ? 1 : -1}; 
        }
        let tasks = await Tasks.find(dbQuery).sort(sortBy);
        const result = {tasks : tasks};
        return successRes(200, result);
    } catch (error) {
        console.log('error',error);
        throw error;
    }
}

module.exports.getTask = async(req, res) => {
    try {
        const user = req.user;
        const taskId = req.params.taskId;
        let task = await Tasks.findOne({
            _id : taskId,
            user : user.user_id,
            status : 'active'
        });
        if(!task) {
            throwError(409, 'NOT_FOU D', 'task not found');
        } 
        const result = {task : task};
        return successRes(200, result);
    } catch (error) {
        console.log('error',error);
        throw error;
    }
}

module.exports.addTask = async(req, res) => {
    try {
        const user = req.user;
        const {title, description, dueDate, priority} = req.body;
        if (!(title && dueDate && priority)) {
            throwError(409, 'BAD_REQUEST', 'invalid user input');
        }
        if(!validPriority.includes(priority)){
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
module.exports.updateTask = async(req, res) => {
    try {
        const user = req.user;
        const taskId = req.params.taskId;
        const {title, description, dueDate, priority} = req.body;
        if (!(title && dueDate && priority)) {
            throwError(409, 'BAD_REQUEST', 'invalid user input');
        }
        if(!validPriority.includes(priority)){
            throwError(409, 'BAD_REQUEST', 'invalid user input');
        }
        let task = await Tasks.findOne({
            _id : taskId,
            user : user.user_id,
            status : 'active'
        });
        if(task) {
            task = await Tasks.findByIdAndUpdate(
                task._id,
                {
                    title : title,
                    description : description,
                    dueDate : dueDate,
                    priority : priority
                },
                {new : true}
            );
        } else {
            throwError(409, 'NOT_FOUND', 'task not found');
        }
        const result = {task : task};
        return successRes(200, result);
    } catch (error) {
        console.log('error',error);
        throw error;
    }
}
module.exports.updateTaskPriority = async(req, res) => {
    try {
        const user = req.user;
        const taskId = req.params.taskId;
        const {priority} = req.body;
        if ((!priority || !validPriority.includes(priority))) {
            throwError(409, 'BAD_REQUEST', 'invalid user input');
        }
        let task = await Tasks.findOne({
            _id : taskId,
            user : user.user_id,
            status : 'active'
        });
        if(task) {
            task = await Tasks.findByIdAndUpdate(
                task._id,
                {
                    priority : priority
                },
                {new : true}
            );
        } else {
            throwError(409, 'NOT_FOUND', 'task not found');
        }
        const result = {task : task};
        return successRes(200, result);
    } catch (error) {
        console.log('error',error);
        throw error;
    }
}
module.exports.updateTaskStatus = async(req, res) => {
    try {
        const user = req.user;
        const taskId = req.params.taskId;
        const {taskStatus} = req.body;
        if ((!taskStatus || !validTaskStatus.includes(taskStatus))) {
            throwError(409, 'BAD_REQUEST', 'invalid user input');
        }
        let task = await Tasks.findOne({
            _id : taskId,
            user : user.user_id,
            status : 'active'
        });
        if(task) {
            task = await Tasks.findByIdAndUpdate(
                task._id,
                {
                    taskStatus : taskStatus
                },
                {new : true}
            );
        } else {
            throwError(409, 'NOT_FOUND', 'task not found');
        }
        const result = {task : task};
        return successRes(200, result);
    } catch (error) {
        console.log('error',error);
        throw error;
    }
}
module.exports.deleteTask = async(req, res) => {
    try {
        const user = req.user;
        const taskId = req.params.taskId;
        const {taskStatus} = req.body;
        let task = await Tasks.findOne({
            _id : taskId,
            user : user.user_id,
            status : 'active'
        });
        if(task) {
            task = await Tasks.findByIdAndUpdate(
                task._id,
                {
                    status : 'deleted',
                    deletedAt: new Date()
                },
                {new : true}
            );
        } else {
            throwError(409, 'NOT_FOUND', 'task not found');
        }
        const result = {task : task};
        return successRes(200, result);
    } catch (error) {
        console.log('error',error);
        throw error;
    }
}
