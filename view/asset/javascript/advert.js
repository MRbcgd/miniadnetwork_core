function addAdvert () {
    var url = '/advert/regist/add';
    var self = {};
    self.adv_owner  = ( document.getElementById('adv_owner')  || {} ).value;
    self.adv_desc   = ( document.getElementById('adv_desc')   || {} ).value;
    self.adv_link   = ( document.getElementById('adv_link')   || {} ).value;
    self.tgt_gender = ( document.getElementById('tgt_gender') || {} ).value;
    self.tgt_age    = ( document.getElementById('tgt_age')    || {} ).value;

    if ( isByteLength(self.adv_owner, 64) == false ) {
        alert("Check Advertiser");
        return;
    }
    if ( isByteLength(self.adv_desc, 128) == false ) {
        alert("Check Advertising slogan");
        return;
    }
    if ( isByteLength(self.adv_link, 512) == false ) {
        alert("Check Advertising Link");
        return;
    }
    if ( isByteLength(self.tgt_gender, 64) == false ) {
        alert("Check Gender");
        return;
    }
    if ( isByteLength(self.tgt_age, 64) == false ) {
        alert("Check Age");
        return;
    }
    reqXHttp(url, self, function ( result ) {
        console.log("result:", result);
        return;
    });
}
