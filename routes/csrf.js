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
    } else if (req.cookies.csrfToken !== req.body.csrfToken)  {
        res.status(403).send("Invalid csrf token");
    } else {
        next()
    }
}

router.get('/changePassword', auth, /*crsfSet,*/ (req, res) => {
    var password = passwords[req.user] || "''";
    res.write(render('csrf/changePassword', {password, user: req.user, /*token: req.token*/}));
    res.end();
});


router.post('/changePassword', auth, /*csrfCheck,*/ (req, res) => {
    console.log(`origin is ${req.headers.origin}`);
    passwords[req.user] = req.body.password;
    res.redirect('/changePassword');
});