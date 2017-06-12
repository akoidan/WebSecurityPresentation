function setCookie(name, value, maxAge) {
    document.cookie = `${name}=${value};path=/;maxAge=${maxAge}`;
}

function setCookieFromForm() {
    setCookie($('form[name=cookieForm] input[name=name]').val(),
        $('form[name=cookieForm] input[name=value]').val(),
        $('form[name=cookieForm] input[name=name]').val()
    )
}

function readCookie() {
    var name = $('form[name=cookieForm] input[name=name]').val();
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0)
            return c.substring(nameEQ.length, c.length);
    }
    return null;
}

function showCookie() {
    alert(readCookie());
}

function eraseCookie() {
    let name = $('form[name=cookieForm] input[name=name]').val();
    document.cookie =  name + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}