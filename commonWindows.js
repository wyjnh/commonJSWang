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
    }
}

module.exports = commonWindows;