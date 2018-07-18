const admin = require('firebase-admin');
admin.initializeApp();
const db = admin.firestore();
const APIKEY = require('./apikey');
const CATEGORIES = require('./categories');

let validate = function (data) {
    let message = "";
    let valid = true;
    if (data && data.letter && data.category && data.answer) {
        let alpha = "abcdefghijklmnopqrstuvwxyz";
        if (data.letter.length !== 1) {
            valid = false;
            message += "\nInvalid letter: must be of length 1";
        }
        else if (!alpha.includes(data.letter.toLowerCase())) {
            valid = false;
            message += "\nInvalid letter: given letter is not in a..z";
        }
        if (CATEGORIES.indexOf(data.category) === -1) {
            valid = false;
            message += "\nInvalid category";
        }
        if (!data.answer.toLowerCase().startsWith(data.letter.toLowerCase())) {
            valid = false;
            message += "\nInvalid answer: doesn't start with given letter " + data.letter;
        }
        if (data.answer.length > 20) {
            valid = false;
            message += "\nInvalid answer: length must be between 1 and 20";
        }
    }
    else {
        valid = false;
        message += "\nIncomplete answer data";
    }
    return { message: message, valid: valid };
}

module.exports.getAnswers = function (req, res) {
    let letter = req.params.letter;
    if (letter) {
        let data = db.collection('answers').where('letter', '==', letter.toLowerCase());
        let category = req.query.category;
        if (category) {
            data = data.where('category', '==', category);
        }
        data.get()
            .then(function (snapshot) {
                let result = [];
                snapshot.forEach(function (doc) {
                    result.unshift(doc.data());
                });
                res.status(200).json(result);
            })
            .catch(function (err) {
                res.status(500).json(err);
            });
    }
    else {
        res.status(500).send("Error: no letter specified.");
    }
}

module.exports.addAnswer = function (req, res) {
    if (req.query.apiKey === APIKEY) {
        let data = {
            letter: req.body.letter,
            category: req.body.category,
            answer: req.body.answer
        };
        let validation = validate(data);
        if (validation.valid) {
            data.letter = data.letter.toLowerCase();
            let doc = db.collection('answers').doc();
            doc.set(data)
                .then(function (data) {
                    res.status(200).json(data);
                })
                .catch(function (err) {
                    res.status(500).json(err);
                });
        }
        else {
            res.status(500).send(validation.message);
        }
    }
    else {
        res.status(401).send("Not authorized");
    }
}