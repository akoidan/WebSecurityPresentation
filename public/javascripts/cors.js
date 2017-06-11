function changePassword() {
    doPost('/changePassword', {password: document.getElementById('pass').value})
}