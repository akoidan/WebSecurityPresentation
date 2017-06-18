const {render, makeid, router, db, auth, passwords, sqlight, onError} = require('../util');

router.get('/sqlinjection', (req, res) => {
    /*res.header('X-Frame-Options', 'SAMEORIGIN');*/
    res.write(render('sqlinjection/sqlinjection', {user: req.user}));
    res.end();
});


router.post('/findUser', (req, response) => {
    let sql = "select id, login from users where login like '%" + req.body.username + "%'";
    sqlight.all(sql).then(res => response.status(200).json(res || [])).catch(onError(response));
});

