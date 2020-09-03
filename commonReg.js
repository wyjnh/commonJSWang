/**
 * 正则相关的一些常用操作
 */
let CommonReg = {
    // 字符串前后空格去除与替换
    stringTrim(str){
        return str.replace(new RegExp('^([\\s])(.*)$'),'$2')
    }
};

module.exports = CommonReg;
