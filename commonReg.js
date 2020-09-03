/**
 * 正则相关的一些常用操作
 */
let CommonReg = {
    /**
     * 字符串前后去除空格
     * @param {*} str 
     * @param {*} type  ‘before’ 'after'
     */
    stringTrim(str,type){
        if(type === 'before'){
            return str.replace(new RegExp('^([\\s]*)(.*)$'),'$2')
        }else if(type === 'after' ){
            return str.replace(new RegExp('^(.*?)([\\s]*)$','$1'))
        }
    },
    /**
     * 除去字符串的html代码
     * @param {*} str 
     */
    removeHtml(str=''){
        return str.replace(/<[\/\!]*[^<>]*>/ig, '')
    },
    /**
     * 强制只输入中文
     * @param {*} str 
     */
    forceChinese(str){
        return str.replace(/[^\u4e00-\u9fa5]/g,'')
    }
};

module.exports = CommonReg;
