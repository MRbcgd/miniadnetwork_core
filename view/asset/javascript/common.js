function getPage ( page ) {
    location.href = '/' + page;
    return;
}
function reqXHttp ( url, data, callback ) {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json; charset=UTF-8');

    // send the collected data as JSON
    xhr.send(JSON.stringify(data));

    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            var result = JSON.parse(xhr.responseText);
            console.log("result:", result);
            callback(result);
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
