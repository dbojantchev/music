var pg = require('pg');

function postgres() {

    var connectionString = process.env.POSTGRES_DATABASE_URL || 'postgres://postgres:postgres@localhost:5432/postgres';

    connectionString = "postgres://jotfcbia:cPZdQSzWaXKJrq92pqd5-mE6JQrSy-Ik@jumbo.db.elephantsql.com:5432/jotfcbia";

    var client = new pg.Client(connectionString);
    client.connect();

    this.getAlbums = function (req, cb) {
        sqlstr = "SELECT * FROM ALBUM";

        var query = client.query(sqlstr,
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    if (cb) {
                        cb(result);
                    }
                }
            }
        );
    };

    this.getSongs = function (req, cb) {
        sqlstr = "SELECT * FROM SONG WHERE ALBUM_ID=" + req.query.albumId;
        console.log('getSongs:' + sqlstr);

        var query = client.query(sqlstr,
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    if (cb) {
                        cb(result);
                    }
                }
            }
        );
    };

    this.addSong = function (data, cb) {

        sqlstr = "INSERT INTO SONG (album_id, track_no, title,length,genre,create_dt,update_dt)" +
        "VALUES (" + data.albumId + "," + data.track_no + ",'" + data.title + "',"
            + data.length + ",'" + data.genre + "', now(), now() )";


        console.log('addSong:' + sqlstr);

        var query = client.query(sqlstr,
            function (err, result) {
                if (err) {
                    console.log(err);
                } else {
                    if (cb) {
                        cb(result);
                    }
                }
            }
        );
    };
}

module.exports = postgres;









