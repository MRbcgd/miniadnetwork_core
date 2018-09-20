function getPage ( page ) {
    location.href = '/' + page;
    return;
}
function reqXHttp ( method, url, data, callback ) {
    var xhr = new XMLHttpRequest();

    if ( method != 'POST' && method != 'GET' ) {
        alert("[Error]Check reqXHttp Method!");
        return;
    }

    xhr.open(method, url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(xhr.responseText);
        }
        return;
    }
}
// ORG: http://cofs.tistory.com/267 [CofS]
function byteCheck ( el ){
    var codeByte = 0;
    for (var idx = 0; idx < el.length; idx++) {
        var oneChar = escape(el.charAt(idx));
        if ( oneChar.length == 1 ) {
            codeByte ++;
        } else if (oneChar.indexOf("%u") != -1) {
            codeByte += 2;
        } else if (oneChar.indexOf("%") != -1) {
            codeByte ++;
        }
    }
    return codeByte;
}
function isByteLength ( str, length ) {
    if ( str != null && length >= 0 ) {
        if ( str.length > length ) return false;

        return true;
    }
    return false;
}
function dateFormat ( date ) {
    date = new Date(date);
    if ( (date instanceof Date) == false ) return null;

    var full_year    = date.getFullYear();
    var full_month   = date.getMonth() + 1;
    var full_date    = date.getDate();
    var full_hours   = date.getHours();
    var full_minutes = date.getMinutes();
    var full_seconds = date.getSeconds();

    return full_year + '-' + full_month + '-' + full_date + " " + full_hours + ":" + full_minutes + ":" + full_seconds;
}
