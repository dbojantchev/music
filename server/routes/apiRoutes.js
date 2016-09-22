var express = require('express');
var router  = express.Router();
global.router = router;

var postgres     = require('../postgres/postgres');
var postgres  = new postgres();
global.postgres = postgres;


router.get('/getAlbums', function(req, res, next) {
    postgres.getAlbums(req, function(result){
            res.send(result);
        }
    );
});

router.get('/getSongs', function(req, res, next) {
    postgres.getSongs(req, function(result){
            res.send(result);
        }
    );
});

router.post('/addSong', function(req, res, next) {
    postgres.addSong(req.body, function(response){
            console.log('response=' + response);
            res.send(response);
        }
    );
});

module.exports = router;

