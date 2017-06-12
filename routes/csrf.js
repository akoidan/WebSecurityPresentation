const {render, makeid, router, db, auth, passwords} = require('../util');

function crsfSet(req, res, next) {
    let token;
    if (req.cookies.csrfToken) {
        req.token = req.cookies.csrfToken;
    } else {
        token = makeid();
        res.cookie('csrfToken', token, {maxAge: 9000000000, httpOnly: true});
        req.token = token;
    }
    next();
}


function csrfCheck(req, res, next) {
    if (!req.cookies.csrfToken) {
        res.status(403).send("csrfToken cookie is missing");
    } else if (!req.body.csrfToken) {
        res.status(403).send("csrfToken is missing from body");
    } else if (req.cookies.csrfToken !== req.body.csrfToken)  {
        res.status(403).send("Invalid csrf token");
    } else {
        next()
    }
}


router.get('/cookie',  (req, res) => {
    res.write(render('csrf/cookie', {user: req.user}));
    res.end();
});

router.post('/setCookie',  (req, res) => {
    res.cookie(req.body.name, req.body.value, {maxAge: parseInt(req.body.maxAge), httpOnly: req.body.httpOnly == 'true'});
    res.status(200).send();
});


router.get('/changePassword', auth,/* crsfSet, */(req, res) => {
    var password = passwords[req.user] || "''";
    // token can be injected anywhere, in header as well
    res.write(render('csrf/changePassword', {password, user: req.user/*, csrfToken: req.token*/}));
    res.end();
});


router.post('/changePassword', auth, /*csrfCheck,*/ (req, res) => {
    console.log(`origin is ${req.headers.origin}`);
    passwords[req.user] = req.body.password;
    res.redirect('/changePassword');
});