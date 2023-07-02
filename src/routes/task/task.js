const express = require('express');
const { addTask } = require('../../controllers/task');
const router = express.Router();
const httpStatus = require('http-status-codes').StatusCodes;

router.post('/', async(req, res) => {
    try {
        const taskResult = await addTask(req, res);
        return res.status(200).send(taskResult);
    } catch (err) {
        console.log(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
});
module.exports = router;