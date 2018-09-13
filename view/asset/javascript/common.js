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
