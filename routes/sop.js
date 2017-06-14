const {render, makeid, router, db, auth, passwords} = require('../util');


function sopCheck(req, res, next) {
    // origin could not be sent if it's the same as host
    if (req.headers.origin && req.headers.origin !== 'http://bank:3001') {
        res.status(403).send("Wrong origin");
    } else {
        next()
    }
}

function addOrigin(req, res, next) {
    res.header('Access-Control-Allow-Origin', "*");
    next();
}

router.get('/sop',  (req, res) => {
    res.write(render('sop/sop', {user: req.user}));
    res.end();
});


router.get('/getCurrentPass', (req, res) => {
    res.status(200).json({password: passwords[req.user]});
});

router.get('/corsPass', addOrigin, (req, res) => {
    res.status(200).json({message: 'Answer from the server'});
});

router.get('/corsFail', (req, res) => {
    res.status(200).send({message: 'Answer from the server'});
});

router.get('/cors', (req, res) => {
    res.write(render('sop/cors', {user: req.user}));
    res.end();
});


router.post('/changePasswordSOP', auth, /*sopCheck,*/ (req, res) => {
    console.log(`origin is ${req.headers.origin}`);
    passwords[req.user] = req.body.password;
    res.status(200).json({password: passwords[req.user]});
});
