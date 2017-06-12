function changePassword() {
    doPost(
        '/changePasswordSOP',
        {password: document.getElementById('pass').value},
        function (res) {
            $('#currentPass').text(res.password);
        }
    )
}

$(document).ready(function () {
    doGet('/getCurrentPass', function (res) {
        $('#currentPass').text(res.password);
    })
});