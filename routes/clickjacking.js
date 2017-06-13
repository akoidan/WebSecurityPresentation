const {render, makeid, router, db, auth, passwords} = require('../util');


function sopCheck(req, res, next) {
    // origin could not be sent if it's the same as host
    if (req.headers.origin && req.headers.origin !== 'http://bank:3002') {
        res.status(403).send("Wrong origin");
    } else {
        next()
    }
}

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


router.get('/sendMoney', auth, sopCheck, crsfSet, (req, res) => {
    /*res.header('X-Frame-Options', 'SAMEORIGIN');*/
    res.write(render('clickjacking/sendMoney', {
        password: passwords[req.user],
        user: req.user,
        csrfToken: req.token
    }));
    res.end();
});


router.post('/sendMoney', auth, sopCheck, csrfCheck, (req, res) => {
    console.log(`Successfully sent ${req.body.amount} from user ${req.user} to account ${req.body.account}`);
    res.redirect('/sendMoney');
});
