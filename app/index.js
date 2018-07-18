const answersController = require('./answers.controller')
const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const app = express();
const router = express.Router();

app.use(cors({origin: true}));
app.use('/api', router);
router.get('/answers/:letter', answersController.getAnswers);
router.post('/answers/', answersController.addAnswer);
router.use('/answers', (req, res) => res.status(401).send("Not authorized"));

exports.api = functions.https.onRequest(app);