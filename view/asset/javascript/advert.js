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
    reqXHttp('POST', url, self, function ( result ) {
        result = JSON.parse(result);
        if ( result.code == 1000 ) {
            location.href = '/';
        } else {
            alert('[Error]:' + result.code);
        }
        return;
    });
}
function getTargetList () {
    var url        = '/advert/regist/selTargetList';
    var tgt_gender = ( document.getElementById('tgt_gender') || null );
    var tgt_age    = ( document.getElementById('tgt_age')    || null );

    reqXHttp('POST', url, {}, function ( result ) {
        result = JSON.parse(result);

        if ( tgt_gender == null && tgt_age == null ) {
            console.log("[Error]: Check Object Status");
            return;
        }
        if ( result != null && result.code == '1000' && result.data != null ) {
            var record = null;
            for ( var rows = 0; rows < result.data.length; rows++ ) {
                record = result.data[rows];
                tgl_class = record['tgl_class'];
                tgl_code  = record['tgl_code'];
                tgl_desc  = record['tgl_desc'];

                if ( record.tgl_class == 'G' ) {
                    tgt_gender.innerHTML += '<option value="' + tgl_code + '">'
                                                + tgl_desc
                                         + ' </option>'
                    ;
                } else
                if ( record.tgl_class == 'A') {
                    tgt_age.innerHTML    += '<option value="' + tgl_code + '">'
                                                + tgl_desc
                                         + ' </option>'
                    ;
                }
            }
        } else {
            alert('[Error]:' + result.code);
            return;
        }
        return;
    });
}
