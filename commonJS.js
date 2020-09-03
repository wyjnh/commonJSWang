let CommomJS = {
    /**
     * 判断元素类型
     * @param {*} val 
     */
    getDataType(val){
        return Object.prototype.toString.call(val).replace(/^\[object (.+)\]$/,'$1')
    }
}

module.exports = CommomJS