const {render, makeid, router, db, auth} = require('../util');
const passwords = {};

router.get('/', (req, res) => {
    res.write(render('main', {user: req.user}));
    res.end();
});

router.get('/changePassword', auth, (req, res) => {
    var password = passwords[req.user] || "''";
    res.write(render('changePassword', {password, user: req.user}));
    res.end();
});


router.post('/changePassword', auth, (req, res) => {
    console.log(`origin is ${req.headers.origin}`);
    passwords[req.user] = req.body.password;
    res.redirect('/changePassword');
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
