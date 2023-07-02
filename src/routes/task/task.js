const express = require('express');
const { addTask, getTasks, getTask, updateTask, updateTaskPriority, updateTaskStatus, deleteTask } = require('../../controllers/task');
const router = express.Router();
const httpStatus = require('http-status-codes').StatusCodes;


router.get('/', async(req, res) => {
    try {
        const taskResult = await getTasks(req, res);
        return res.status(200).send(taskResult);
    } catch (err) {
        console.log(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
});

router.get('/:taskId', async(req, res) => {
    try {
        const taskResult = await getTask(req, res);
        return res.status(200).send(taskResult);
    } catch (err) {
        console.log(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
});

router.post('/', async(req, res) => {
    try {
        const taskResult = await addTask(req, res);
        return res.status(200).send(taskResult);
    } catch (err) {
        console.log(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
});

router.put('/:taskId/priority', async(req, res) => {
    try {
        const taskResult = await updateTaskPriority(req, res);
        return res.status(200).send(taskResult);
    } catch (err) {
        console.log(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
});

router.put('/:taskId/status', async(req, res) => {
    try {
        const taskResult = await updateTaskStatus(req, res);
        return res.status(200).send(taskResult);
    } catch (err) {
        console.log(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
});

router.put('/:taskId', async(req, res) => {
    try {
        const taskResult = await updateTask(req, res);
        return res.status(200).send(taskResult);
    } catch (err) {
        console.log(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
});

router.delete('/:taskId', async(req, res) => {
    try {
        const taskResult = await deleteTask(req, res);
        return res.status(200).send(taskResult);
    } catch (err) {
        console.log(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
});
module.exports = router;