/**
 * BPSService
 *
 * @description :: Server-side logic for managing Fronts.
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers

 giang.ngo: chua cac ham lien quan toi giao tiep vs BPSServer
 
 */

var path = require('path')
var Restfulhandler = require('../resfulhandler');
var Ioutput = require('../iooutput');
var TAG_FUNCTION = 'BPSHelper'

async function callBPS(bpsUrl, action, body) {
	try {
		sails.log.info(TAG_FUNCTION, 'callBPS START', 'action', action, 'body', body);
		var result = await Restfulhandler.post(bpsUrl + action, body);
		if (typeof result === 'error') {
			return Ioutput.create(-101339, 'He thong tam thoi gian doan', result);
		}
		sails.log.info('callBPS:. bps response', result.EC, result.EM);
		return result;

	} catch (err) {
		sails.log.error(TAG_FUNCTION, 'callBPS Error', err);
		return Ioutput.create(-101339, 'He thong tam thoi gian doan', err);
	}
}

module.exports = {
	//const
	ret: { dir: 3003, type: 2004 },
	ALL_MATCH: '%',
	ALL: 'ALL',

	execProd: async function (funckey, bindvar, callback) {
		return await this.execProdWithUrl(sails.config.serverapp.bpsUrl, funckey, bindvar, callback);
	},
	execProdWithUrl: async function (bpsUrl, funckey, bindvar, callback) {
		if(!bpsUrl) bpsUrl = sails.config.serverapp.bpsUrl;
		var keys = Object.keys(bindvar);
		for (field of keys) {
			if (bindvar[field] == undefined) {
				bindvar[field] = '';
			}
		}
		var body = {
			funckey: funckey,
			bindvar: bindvar
		}
		if (body.bindvar) {
			body.bindvar.err_code = { dir: 3002, type: 2001, value: "0" };
			body.bindvar.err_msg = { dir: 3003, type: 2001 };
			if (!body.bindvar.REFLOGID) {
				var funckey = body.funckey ? body.funckey : 'undefine funckey'
				body.bindvar.REFLOGID = funckey + '.no reflogid';
			}
		}
		var rs = await callBPS(bpsUrl, '/ExecStatement/execProcedure', body)
		if (callback) callback(rs);
		// try {
		// 	rs.EM = await ErrDefs.findErr(rs.EC, rs.EM);
		// } catch (error) {
		// 	sails.log.error('Processing.execProd', error);
		// }
		return rs;
	},
	// execProdToDownloadBLOB: async function (funckey, bindvar) {
	// 	var body = { funckey: funckey, bindvar: bindvar }
	// 	if (body.bindvar) {
	// 		body.bindvar.err_code = { dir: 3002, type: 2001, value: 0 };
	// 		body.bindvar.err_msg = { dir: 3003, type: 2001 };
	// 		if (!body.bindvar.REFLOGID) {
	// 			var funckey = body.funckey ? body.funckey : 'undefine funckey'
	// 			body.bindvar.REFLOGID = funckey + '.no reflogid';
	// 		}
	// 	}
	// 	var rs = await callBPS('/ExecStatement/execProcedureToDownloadBLOB', body)
	// 	// rs.EM = await ErrDefs.findErr(rs.EC, rs.EM);
	// 	return rs;
	// },
	// execProdToUploadFile: async function (req, res) {
	// 	sails.log.info(TAG_FUNCTION, 'execProdToUploadFile', req.body);
	// 	if (req._fileparser.upstreams.length == 0) {
	// 		return res.send(Ioutput.errServer('No file was uploaded'));
	// 	}
	// 	var fieldFile = req._fileparser.upstreams[0].fieldName;
	// 	req.file(fieldFile).upload({}, async function (err, uploads) {
	// 		if (err) {
	// 			sails.log.error(TAG_FUNCTION, 'execProdToUploadFile: Error', err);
	// 			return res.send(Ioutput.errServer(err));
	// 		}
	// 		if (uploads.length === 0) {
	// 			sails.log.error(TAG_FUNCTION, 'execProdToUploadFile: Error: No file was uploaded');
	// 			return res.send(Ioutput.errServer('No file was uploaded'));
	// 		}
	// 		sails.log.info(TAG_FUNCTION, 'execProdToUploadFile: upload.fd', uploads[0].fd, 'upload.filename', uploads[0].filename, 'fieldFile', fieldFile);

	// 		var form = req.body;
	// 		form[fieldFile] = fs.createReadStream(uploads[0].fd);
	// 		request({
	// 			url: sails.config.serverapp.bpsUrl + '/ExecStatement/execProcedureToUpload',
	// 			method: 'POST',
	// 			formData: form
	// 		}, async function (err, resdata) {

	// 			if (err) {
	// 				sails.log.error(TAG_FUNCTION, 'execProdToUploadFile: Error', err);
	// 				return res.send(Ioutput.errServer(err));
	// 			} else {
	// 				// resdata.body.EM = await ErrDefs.findErr(resdata.body.EC, resdata.body.EM);
	// 				return res.send(resdata.body);
	// 			}

	// 		});
	// 	})
	// },
	// execFunc: async function (funckey, bindvar) {
	// 	var body = { funckey: funckey, bindvar: bindvar }
	// 	if (body.bindvar) {
	// 		body.bindvar.err_code = { dir: 3003, type: 2001, value: 0 };
	// 		body.bindvar.err_msg = { dir: 3002, type: 2001 };
	// 		if (!body.bindvar.REFLOGID) {
	// 			var funckey = body.funckey ? body.funckey : 'undefine funckey'
	// 			body.bindvar.REFLOGID = funckey + '.no reflogid';
	// 		}
	// 	}
	// 	var rs = await callBPS('/ExecStatement/execFunction', body)
	// 	if (rs.EC) {
	// 		// rs.EM = await ErrDefs.findErr(rs.EC, rs.EM);
	// 	}
	// 	return rs;
	// },
	// execSttm: async function (funckey, bindvar) {
	// 	var body = { funckey: funckey, bindvar: bindvar }
	// 	var rs = await callBPS('/ExecStatement/execStatement', body)
	// 	if (rs.EC) {
	// 		// rs.EM = await ErrDefs.findErr(rs.EC, rs.EM);
	// 	}
	// 	return rs;
	// },
	// execArrSttm: async function (funckey, bindvar) {
	// 	var body = { funckey: funckey, bindvar: bindvar }
	// 	var rs = await callBPS('/ExecStatement/execArrayStatement', body)
	// 	if (rs.EC) {
	// 		// rs.EM = await ErrDefs.findErr(rs.EC, rs.EM);
	// 	}
	// 	return rs;
	// },
	execQrry: async function (bpsUrl, funckey, bindvar) {
		var body = { funckey: funckey, bindvar: bindvar }
		var rs = await callBPS(bpsUrl, '/ExecStatement/execQuerry', body)
		if (rs.EC) {
			// rs.EM = await ErrDefs.findErr(rs.EC, rs.EM);
		}
		return rs;
	},

	convert_to_Object: function convert_to_Object(ret, outputFormat) {
		var arr = [];
		var col = ret.col;
		var outputIndex = {};
		var columnFormated = [];
		for (let i = 0; i < col.length; i++) {
			const columnName = col[i];
			columnFormated.push(columnName.toLowerCase().replace(/_/g, ''));
		}
		if (outputFormat) {
			outputFormat.forEach(columnName => {
				outputIndex[columnName] = columnFormated.indexOf(columnName.toLowerCase());
			});
		} else if (col) {
			for (let i = 0; i < col.length; i++) {
				const columnName = col[i];
				outputIndex[columnName.toLowerCase()] = i;
			}
		}
		for (var data of ret.rows) {
			var obj = {};
			for (var key of Object.keys(outputIndex)) {
				obj[key] = data[outputIndex[key]];
			}
			arr.push(obj);
		}
		return arr;
	},
}