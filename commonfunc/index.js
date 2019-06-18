module.exports = {
    translate_keyCode: function (array, allcode, lang) {	//giang.ngo: outputFormat: các tên column cần lấy
        lang = lang === 'vi' || lang === 'en' ? lang : 'vi'; //tạm hardcode 2 ngôn ngữ
        var langMap = { vi: 'cdcontent', en: 'en_cdcontent' };
        if (allcode && array && array.length > 0) {
            let keyCode = [];
            let keys = Object.keys(array[0]);
            keys.forEach(key => {
                if (key.endsWith('Code')) {
                    keyCode.push(key);	//giang.ngo: lưu lại các trường trả ra dạng code để translate
                }
            });
            array.forEach(item => {
                keyCode.forEach(key => {
                    if (allcode[item[key]]) {
                        let transKey = key.substring(0, key.length - 4);
                        item[transKey] = allcode[item[key]][langMap[lang]];
                    }
                    if (item[key]) item[key] = item[key].substring(item[key].lastIndexOf('_') + 1, item[key].length);
                });
            });
        }
        return array;
    },
}