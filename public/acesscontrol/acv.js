function displayCard(id) {
    doGet(`/getCardDetails?id=${id}`, res => {
        $('#cards_details').empty();
        for (var key in res) {
            insertRow(key, res[key]);
        }
    }, document.sqlInjectionForm)
}

function insertRow(name, value) {
    let el = $('#cards_details')[0];
    var raw = el.insertRow();
    var th = document.createElement('th');
    raw.appendChild(th);
    th.textContent = name;
    var valueField = raw.insertCell();
    valueField.textContent = value;
    return valueField;
};

$(document).ready(function() {
    doGet('/getCardsName', res => {
        let cl = $('#cards_list');
        cl.empty();
        for (var i = 0; i < res.length; i++) {
            cl.append($('<option>', {
                value: res[i].id,
                text: res[i].brand
            }));
        }
        displayCard(res[0].id);
    });

    $('#cards_list').on('change', function() {
        displayCard(this.value);
    });
});