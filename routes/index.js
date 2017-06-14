const {render, makeid, router, db, auth, passwords} = require('../util');

router.get('/', (req, res) => {
    res.write(render('body', {user: req.user}));
    res.end();
});

router.post('/login', (req, res) => {
    let session = makeid();
    db.sessions[session] = req.body.login;
    res.cookie('sessionid', session, {maxAge: 900000, httpOnly: true});
    res.redirect('/');

});

// router.post('/changePassword', (req, res) => {
//     password = req.body.password;
//     res.redirect('/csrf');
// });
//
// router.post('/changePasswordNoRed', (req, res) => {
//     password = req.body.password;
//     res.status(200).send('OK');
// });

module.exports = router;
