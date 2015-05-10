var express = require('express');
var router = express.Router();

var authentication = require('../utils/authentication');
var Models = require('../models');

// Huom! Kaikki polut alkavat polulla /topics

// GET /topics
router.get('/', function (req, res, next) {
    // Hae kaikki aihealueet tässä (Vinkki: findAll)
    Models.Topic.findAll().then(function (topics) {
        console.warn("all topics: " + topics);
        res.json(topics);
    });
});

// GET /topics/:id
router.get('/:id', function (req, res, next) {
    // Hae aihealue tällä id:llä tässä (Vinkki: findOne)
    var topicId = req.params.id;
    Models.Topic.findOne(
            {where:
                { id: topicId },
                include: {
                    model: Models.Message
                }
            })
            .then(function (topic) {
                res.json(topic);
            });
});

// POST /topics
router.post('/', function (req, res, next) {
    // Lisää tämä aihealue
    var topicToAdd = req.body;
    Models.Topic.create(topicToAdd).then(function (topic) {
        // Palauta vastauksena lisätty aihealue
        res.json(topic);
    });
});

// POST /topics/:id/message
router.post('/:id/message', function (req, res, next) {
    // Lisää tällä id:llä varustettuun aihealueeseen...
    var topicId = req.params.id;
    // ...tämä viesti (Vinkki: lisää ensin messageToAdd-objektiin kenttä TopicId, jonka arvo on topicId-muuttujan arvo ja käytä sen jälkeen create-funktiota)
    var messageToAdd = req.body;
    messageToAdd.TopicId = topicId;
    // Palauta vastauksena lisätty viesti
    Models.Message.create(messageToAdd).then(function(message){
        res.json(message);
    });
    //res.send(200);
});

module.exports = router;
