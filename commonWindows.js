let commonWindows = {
    /**
     * 禁止网页复制粘贴
     * @param {*} copyCb 
     * @param {*} pasteCb 
     */
    banCopyAndPaste(copyCb,pasteCb){
        let htmlel = document.querySelector('html');
        htmlel.oncopy = function(){
            copyCb();
        }
        htmlel.onpaste = function(){
            pasteCb()
        }
    },
    /**
     * 返回元素相对于document的偏移量
     * @param {*} el 
     */
    getElOffset(el){
        // 元素相对于视口的距离
        let { top,left } = el.getBoundingClientRect();
        let { scrollTop , scrollLeft } = document.body;
        return {
            top : top + scrollTop,
            left: left + scrollLeft
        }
    },
    /**
     * 判断是否是移动端
     */
    isMobile(){
        return 'ontouchstart' in window
    }
}

module.exports = commonWindows;