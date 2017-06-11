const {render, makeid, router, db, auth, injectUserIfExist} = require('../util');

router.get('/', injectUserIfExist, (req, res) => {
    res.write(render('main', {user: req.user}));
    res.end();
});

router.get('/cors', (req, res) => {
    res.write(render('cors', {password}));
    res.end();
});


router.post('/login', (req, res) => {
    let session = makeid();
    db.sessions[session] = req.body.login;
    res.cookie('sessionid', session, {maxAge: 900000, httpOnly: true});
    res.redirect('/');

});

router.post('/changePassword', (req, res) => {
    password = req.body.password;
    res.redirect('/cors');
});

module.exports = router;
