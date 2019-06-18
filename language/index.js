var defErrorDict = {};
var defErrorVi = {};
var defErrorEn = {};

var defErrorDictionary = {};
var defErrorMap = {
    vi: { fieldName: 'errdesc', internalErr: require('./locales/vi').ERR_DEF },
    en: { fieldName: 'en_errdesc', internalErr: require('./locales/en').ERR_DEF },
};

function setErrorDictByField(fieldName) {
    var errorDict = {}

    Object.keys(defErrorDict).forEach(key => {
        var error = defErrorDict[key];
        errorDict[error.errnum] = error[fieldName];
    })
    return errorDict;
}

function loadInternalErrDef(locale) {
    var internalErr = defErrorMap[locale].internalErr;
    if (!defErrorDictionary[locale]) defErrorDictionary[locale] = {};
    Object.keys(internalErr).forEach(errnum => {
        var errdesc = internalErr[errnum];
        defErrorDictionary[locale][errnum] = errdesc;
    })
}

function setDefErrorByLocale(locale, fieldName) {
    defErrorDictionary[locale] = setErrorDictByField(fieldName)
    loadInternalErrDef(locale);
}

module.exports = {
    setDefError: function (pr_defErrorDict) {
        defErrorDict = pr_defErrorDict;
        Object.keys(defErrorMap).forEach(locale => {
            setDefErrorByLocale(locale, defErrorMap[locale].fieldName);
        });
    },
    getDefError: function () {
        return defErrorDict;
    },

    getErrorByCode: function (code) {
        return defErrorDict[code];
    },
    getErrorMsgByCode: function (code, lang) {
        lang = lang ? lang : 'vi';
        var errMsg = defErrorDictionary[lang] ? defErrorDictionary[lang][code] : undefined;
        errMsg = errMsg ? errMsg : code;
        return errMsg;
    },
}