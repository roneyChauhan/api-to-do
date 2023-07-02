
const dotenv = require('dotenv')
dotenv.config();
const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
let mongoDB = require('./helpers/database-mongodb');
const apiRoute = require('./routes');
mongoDB.connect();
const app = express();
app.use(express.json());
app.use(cors());

app.use(
	express.urlencoded({
		extended: false,
	}),
);
app.use(bodyParser.json());
app.use(apiRoute);
app.listen(process.env.APP_PORT || 3001, () => {
    console.log(`server is running on : ${process.env.APP_PORT}`);	
});
