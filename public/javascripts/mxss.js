doGet('/mxmessage', function(res) {
    var container = $('#messages');
    container.empty();
    for (var i = 0; i < res.length ; i++) {
        var div = document.createElement('h4');
        div.innerHTML = res[i];
        container.append(div);
    }
});