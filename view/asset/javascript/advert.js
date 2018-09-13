function addAdvert () {
    var url = '/advert/regist/add';
    var self = {};
    self.adv_owner  = document.getElementById('adv_owner')  || null;
    self.adv_desc   = document.getElementById('adv_desc')   || null;
    self.tgt_gender = document.getElementById('tgt_gender') || null;
    self.tgt_age    = document.getElementById('tgt_age')    || null;
    self.adv_owner  = document.getElementById('adv_owner')  || null;

    reqXHttp(url, self, function ( result ) {
        console.log("result:", result);
        return;
    });
}
