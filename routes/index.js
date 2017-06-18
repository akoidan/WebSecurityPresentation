const {render, makeid, router, sqlight, onError} = require('../util');

router.get('/', (req, res) => {
    res.write(render('body', {user: req.user}));
    res.end();
});

router.post('/login', (req, res) => {
    const finish = () => {
        res.cookie('sessionid', session, {maxAge: 900000, httpOnly: true});
        res.redirect(req.headers.referer || '/');
    };
    let session = makeid();
    if (req.body.type === 'Sign In') {
        sqlight.run('update users set session_id = ? where login = ? and password = ?',
            session, req.body.login, req.body.password).then(user => {
            if (user.changes) {
                finish()
            } else {
                res.write(render('error', {error: "Invalid login or password"}));
                res.end();
            }
        }).catch(onError(res))
    } else if (req.body.type === 'Sign Up') {
        sqlight.run('insert into users (login, password, session_id) values (?, ?, ?)',
           req.body.login, req.body.password, session)
            .then(finish)
            .catch(onError(res))
    }
});

module.exports = router;
