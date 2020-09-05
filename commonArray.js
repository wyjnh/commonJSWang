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
     * 两个数组并集
     * @param {*} arr1 
     * @param {*} arr2 
     */
    getArrAll(arr1,arr2){
        return Array.from(new Set(arr1.concat(arr2)));
        // return arr1.concat(arr2.filter(item=>!arr1.includes(item)))
    },
    /**
     * 数组1相对于2的 差集
     * @param {*} arr1 
     * @param {*} arr2 
     */
    getArrReduce(arr1,arr2){
        return arr1.filter(item=>!new Set(arr2).has(item))
    },
    /**
     * 获取两个数组的补集 各自没有的
     * @param {*} arr1 
     * @param {*} arr2 
     */
    getArrOther(arr1,arr2){
        return Array.from(new Set(arr1.concat(arr2))).filter(item=>{
            return !new Set(arr1).has(item) || !new Set(arr2).has(item)
        })
    },
    /**
     * 数组去重
     * @param {*} arr 
     */
    arrDeduplication(arr){
        return Array.from(new Set(arr));
        // return [...new Set(arr)]
    },
    /**
     * 数组排序
     * @param {*} arr 
     * @param {*} type  升序降序
     * @param {*} key 是否是数组对象
     */
    arrSort(arr,type='dec',key=''){
        if(type === 'dec'){
            if(!!key){
                return arr.sort((a,b)=>a[key] - b[key])
            }else{
                return arr.sort((a,b)=> a-b);
            }
        }else if(type === 'rev'){
            if(!!key){
                return arr.sort((a,b)=>b[key] - a[key])
            }else{
                return arr.sort((a,b)=> b-a);
            }
        }
    },
    /**
     * 获取数组中最大值
     * @param {*} arr 
     */
    arrGetMax(arr){
        return arr.reduce((pre,cur,curindex,arr)=>{
            return Math.max(pre,cur)
        })
    },
    /**
     * 数组求和
     * @param {*} arr 
     */
    arrGetSum(arr){
        return arr.reduce((prev,cur)=>{
            return prev+cur;
        })
    },
    /**
     * 将数组的值转化为对象的val
     * @param {*} arrName 
     * @param {*} arrAge 
     * @param {*} arrDec 
     */
    arrToObject(arrName,arrAge,arrDec){
        return arrName.map((item,index)=>{
            return { name: item, age: arrAge[index],dec:arrDec[index]}
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
        if(size <= 0){
            return resultArr;
        }
        while(tmp.length){
            resultArr.push(tmp.splice(0,size))
        }
        return resultArr;
    }
};

module.exports = CommonArray;
