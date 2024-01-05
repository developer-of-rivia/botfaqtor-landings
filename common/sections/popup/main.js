function getCookie(name) {
    let cookie_arr = document.cookie.split('; ');
    let cookie_obj = {};

    for (let i=0; i<cookie_arr.length; i++) {
        let nv = cookie_arr[i].split('=');
        cookie_obj[nv[0]] = nv[1]; 
    }

    return cookie_obj[name];
}        

let overlay_div = document.getElementById('tg-alert');

if ( getCookie('hide_popup') == 'yes' ) {
    overlay_div.style.display='none';
}

// При нажатии на кнопку ставим cookie, которая будет запрещать показ
// модального окна
document.getElementById('hide_popup')
.addEventListener('click', function() { 
    // Ставим cookie на минуту.                
    var date = new Date(new Date().getTime() + 60 * 1000 * 43200);
    document.cookie = "hide_popup=yes; path=/; expires=" + date.toUTCString();

    // и сразу же скрываем окно
    overlay_div.style.display='none';
});