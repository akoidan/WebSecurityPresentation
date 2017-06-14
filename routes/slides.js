const {render, makeid, router, db, auth, passwords} = require('../util');

router.get('/authProcess', (req, res) => {
    res.write(render('slides/auth', {user: req.user}));
    res.end();
});

router.get('/cost', (req, res) => {
    res.write(render('slides/cost', {user: req.user}));
    res.end();
});

router.get('/htst', (req, res) => {
    res.write(render('slides/htst', {user: req.user}));
    res.end();
});

router.get('/ddos', (req, res) => {
    res.write(render('slides/ddos', {user: req.user}));
    res.end();
});



router.get('/cookie',  (req, res) => {
    res.write(render('slides/cookie', {user: req.user}));
    res.end();
});