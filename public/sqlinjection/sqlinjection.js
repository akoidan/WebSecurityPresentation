function findUser() {
    doPost('/findUser', null, (res) => {
        $('#results').empty();
        for (var i = 0; i < res.length ; i++) {
            insertRow(res[i].id, res[i].login);
        }
    }, document.sqlInjectionForm)
}

function setHack() {
    $('input[name=username]').val( `44'; update users set password = 'mypassword'; select * from users where login like 'a`);
}

function insertRow(name, value) {
    let el = $('#results')[0];
    var raw = el.insertRow();
    var th = document.createElement('th');
    raw.appendChild(th);
    th.textContent = name;
    var valueField = raw.insertCell();
    valueField.textContent = value;
    return valueField;
};

$(document).ready(function() {
    $('pre').hide();
    $('pre').each(function(i, block) {
        hljs.highlightBlock(block);
    });
});

function showPre() {
    $('pre').show()
}