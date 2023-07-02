const express = require('express');
const router = express.Router();
const httpStatus = require('http-status-codes').StatusCodes;
const authController = require('../../controllers/auth');

router.post('/login', async(req, res) => {
    try {
        req.body.updated_date = new Date();
        const authUser = await authController.loginUser(req, res);
        console.log(authUser);
        // const response = addAlbumService.albumsResponse(addAlbum);
        return res.status(200).send(authUser);
    } catch (err) {
        console.log(err);
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
});

router.post('/register', async(req, res) => {
    try {
        req.body.updated_date = new Date();
        const authUser = await authController.registerUser(req, res);
        console.log(authUser);
        // const response = addAlbumService.albumsResponse(addAlbum);
        return res.status(200).send(authUser);
    } catch (err) {
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).send(err);
    }
});

module.exports = router;