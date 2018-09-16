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
    var url        = '/content/regist/selTargetList';
    var tgt_gender = ( document.getElementById('tgt_gender') || null );
    var tgt_age    = ( document.getElementById('tgt_age')    || null );

    reqXHttp('POST', url, {}, function ( result ) {
        result = JSON.parse(result);

        if ( tgt_gender == null && tgt_age == null ) {
            alert("[Error]: Check Object Status");
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
