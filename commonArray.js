/**
 * 数组相关的一些常用操作
 */
let CommonArray = {
    /**
     * 获取数组交集
     * @param {*} list 
     * @param  {...any} args 
     * CommonArray.getArrCommon([1],[1,3,4,5,6],[0,3])
     */
    getArrCommon(list, ...args) {
        return list.filter(item=>{
            return args.every(i=>{
                return i.includes(item);
            })
        })
    },
    /**
     * 分割指定长度的元素数组
     * @param {*} list 
     * @param {*} size 
     * @param {*} resultArr 
     * CommonArray.spliceArrList(arr,2)
     */
    spliceArrList(list,size=1,resultArr=[]){
        let tmp = [...list];
        if(size<=0){
            return resultArr;
        }
        while(tmp.length){
            resultArr.push(tmp.splice(0,size))
        }
        return resultArr;
    }
};

module.exports = CommonArray;
