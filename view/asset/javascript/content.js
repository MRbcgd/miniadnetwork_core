function addContent () {
    var url = '/content/regist/add';
    var self = {};
    self.ctt_name   = ( document.getElementById('ctt_name')   || {} ).value;
    self.ctt_owner  = ( document.getElementById('ctt_owner')  || {} ).value;
    self.email      = ( document.getElementById('email')      || {} ).value;
    self.tgt_gender = ( document.getElementById('tgt_gender') || {} ).value;
    self.tgt_age    = ( document.getElementById('tgt_age')    || {} ).value;

    if ( isByteLength(self.ctt_name, 64) == false ) {
        alert("Check Content Name");
        return;
    }

    if ( isByteLength(self.ctt_owner, 64) == false ) {
        alert("Check Content Owner");
        return;
    }
    if ( isByteLength(self.email, 64) == false ) {
        alert("Check Email");
        return;
    }
    if ( isByteLength(self.tgt_gender, 2) == false ) {
        alert("Check Gender");
        return;
    }
    if ( isByteLength(self.tgt_age, 2) == false ) {
        alert("Check Age");
        return;
    }

    reqXHttp(url, self, function ( result ) {
        console.log("result:", result);
        return;
    });
}
