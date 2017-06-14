const {render, makeid, router, db, auth, passwords} = require('../util');
const cards = {
    1: {expires: '11/03/2020', brand: 'visa', number: '4242424242424242', cvv: '123'},
    2: {expires: '9/05/2014',brand: 'visa', number: '4012888888881881', cvv: '423'},
    3: {expires: '3/24/2022',brand: 'Visa (debit)', number: '4000056655665556', cvv: '526'},
    4: {expires: '4/12/2022',brand: 'Mastercard', number: '5555555555554444', cvv: '153'},
    5: {expires: '1/06/2030',brand: 'Mastercard (debit)', number: '5200828282828210', cvv: '826'},
    6: {expires: '12/18/2018',brand: 'Mastercard (prepaid)', number: '5105105105105100', cvv: '853'},
    7: {expires: '7/21/2019',brand: 'American Express', number: '378282246310005', cvv: '015'},
};

let mycards = [3,4,7];

router.get('/acv', (req, res) => {
    res.write(render('acesscontrol/acv', {user: req.user}));
    res.end();
});


router.get('/getCardDetails', (req, res) => {
    res.status(200).json(cards[req.query.id]);
});


router.get('/getCardsName', (req, res) => {

    //this is usually more looks like "select * from cards";
    // res.status(200).json(mycards.map(e => cards[e]));
    res.status(200).json(mycards.map(e => ({id: e, brand : cards[e].brand})));
});
