var request = require('request');

module.exports = {
    getInfo: function (urlResource, access_token, done) {
        request.get(urlResource + 'api/info', {
            'auth': {
                'bearer': access_token
            }
        }, function (err, res) {
            if (res && res.body)
                done(null, res.body);
            else {
                sails.log.error('getInfo.:Error', err);
                done(err, null);
            }
        });
    },
    getInfoWithHeader: function (urlResource, headers, done) {
        request.get({ url: urlResource + 'api/info', headers: headers }, function (err, res) {
            if (res && res.body)
                done(null, res.body);
            else {
                sails.log.error('getInfo.:Error', err);
                done(err, null);
            }
        });
    },
}
