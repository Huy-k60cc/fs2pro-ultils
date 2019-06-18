/**
 * RestfulHandler
 *
 * @description :: Server-side logic for managing Fronts.
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers

 giang.ngo: xu ly call request server to server
 */

var request = require('request');
module.exports = {
	post: function callPost(disable_gzip, timeout_bps, url, body) {
		return new Promise(function (resolve, reject) {
			try {
				var headers = {
					'Content-Type': 'application/json'
				};
				request({
					url: url,
					method: 'POST',
					gzip: !(disable_gzip || false),
					timeout: timeout_bps || (5 * 60 * 1000),
					json: body
				}, function (err, res) {

					if (err) {
						reject(err)
					} else {
						resolve(res.body);
					}

				});
			} catch (err) {
				reject(err);
			}
		});

	},
	get: function callGet(disable_gzip, timeout_bps, url,qs) {
		return new Promise(function (resolve, reject) {
			try {
				request.get({
					url: url,
					gzip: !(disable_gzip || false),
					timeout: timeout_bps || (5 * 60 * 1000),
					json :true,
					qs:qs,
				}, function (err, res) {
					if (err) {
						reject(err)
					} else {
						resolve(res.body);
					}
				});
			} catch (err) {
				reject(err);
			}
		});

	}
}