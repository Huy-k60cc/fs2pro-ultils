module.exports = {
    create: function (errCode, errMsg, data) {
        return { EC: errCode, EM: errMsg, DT: data };
    }
}