const {render, makeid, router, db, auth, passwords} = require('../util');
var  mysql = require('mysql');
var client = mysql.createConnection({
    "host" : "localhost", // host where db is
        "user" : "root", // user of db
        "password" : "", // pw of user of db
        "database" : "snowhub", // name of db
        "multipleStatements" : true // allow multiple queries like "select 1; select 2;"
});
client.connect();



router.get('/sqlinjection', (req, res) => {
    /*res.header('X-Frame-Options', 'SAMEORIGIN');*/
    res.write(render('sqlinjection/sqlinjection', {user: req.user}));
    res.end();
});


router.post('/findUser', (req, response) => {
    let sql = "select id, login from users where login like '%"+req.body.username+"%'";
    console.log(sql);
    client.query(sql, (err, res) => {
        response.status(200).json(res);
    });
});

