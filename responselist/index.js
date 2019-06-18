function createJson(errCode, errMsg, data) {
    if (errMsg) {
      return { s: errCode, errmsg: errMsg, d: data };
    } else {
      return { s: errCode, d: data };
    }
  }
  module.exports = {
    errServer: function (err, errmsg = sails.__('serverError')) {
      return createJson("error", errmsg, err);
  
    },
    success: function (data) {
      return createJson("ok", null, data);
    },
    errBusiness: function (errcode, errmsg, data) {
      return createJson("error", errcode + '#' + errmsg, data);
    },
  };
  