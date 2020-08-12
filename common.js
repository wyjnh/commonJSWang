let Common = {
    /**
     * 语音播放
     * 页面创建audio元素播放指定音频 播放完后有回调函数
     * @param {$event} 事件绑定节点
     * @param {src} MP3语音链接
     */
    playVoice($event, src) {
        Common.deleteVoice();
        let audio, source;
        audio = document.createElement('audio');
        source = document.createElement('source');
        audio.id = 'video_mp3';
        audio.style.cssText = 'height:0';
        source.type = 'audio/mpeg';
        source.src = src;
        audio.appendChild(source);
        document.body.appendChild(audio);
        // Common.addClass($event.target, 'active');
        audio.play();
        audio.addEventListener(
            'ended',
            function() {
                // 回调函数
            },
            false
        );
    },
    /**
     * 删除创建的音频元素
     */
    deleteVoice() {
        let audio = document.querySelector(`#video_mp3`);
        if (!audio) return;
        let source = audio.querySelector('source');
        audio.pause && audio.pause();
        source.src = '';
        audio.removeChild(source);
        document.body.removeChild(audio);
        // 样式置空
        // let activeNodes = document.querySelectorAll('.active');
        // for (let i = 0; i < activeNodes.length; i++) {
        //     Common.removeClass(activeNodes[i], 'active');
        // }
    },
    /**
     * 格式化时间获取
     * @param {*} time 
     */
    getCurrentDate(time) {
        // 获取当前日期
        let date = new Date();
        if (time) {
            date.setTime(time);
        }
        let nowMonth = date.getMonth() + 1;
        let strDate = date.getDate();
        let seperator = '-';
        // 对月份进行处理，1-9月在前面添加一个“0”
        if (nowMonth >= 1 && nowMonth <= 9) {
            nowMonth = '0' + nowMonth;
        }
        // 对月份进行处理，1-9号在前面添加一个“0”
        if (strDate >= 0 && strDate <= 9) {
            strDate = '0' + strDate;
        }
        // 最后拼接字符串，得到一个格式为(yyyy-MM-dd)的日期
        let nowDate = date.getFullYear() + seperator + nowMonth + seperator + strDate;
        return nowDate;
    },
    /**
     * localStorage 模块封装
     * @param {*} lsSetItem 设置
     * @param {*} lsGetItem 获取 
     * @param {*} lsRemoveItem 删除
     */
    lsSetItem(key, value) {
        let result = [];
        if (window.localStorage) {
            try {
                result = window.localStorage.setItem(key, value);
            } catch (error) {
                result = [];
            }
        }
        return result;
    },
    lsGetItem(key) {
        let result = [];
        if (window.localStorage) {
            try {
                result = window.localStorage.getItem(key).replace(/[\s]{2,}/g, '');
            } catch (error) {
                result = [];
            }
        }
        return result;
    },
    lsRemoveItem(key) {
        return window.localStorage && window.localStorage.removeItem(key);
    },
    /**
     * class 类名的判断删减处理
     * @param {*} elements 
     * @param {*} cName 
     */
    hasClass(elements, cName) {
        return !!elements.className.match(new RegExp('(\\s|^)' + cName + '(\\s|$)'));
    },
    addClass(elements, cName) {
        if (!Common.hasClass(elements, cName)) {
            elements.className += ' ' + cName;
        }
    },
    removeClass(elements, cName) {
        if (Common.hasClass(elements, cName)) {
            elements.className = elements.className.replace(new RegExp('(\\s|^)' + cName + '(\\s|$)'), ' ');
        }
    },
    /**
     * 获取浏览器类型
     * @param {*} ua 
     */
    getSystemBrowserName(ua) {
        var browser = [
            ['sogousearch', 'sogouapp'], //app
            ['micromessenger', 'weixin'], // 微信
            ['miuibrowser', 'mi'], // 小米
            ['vivobrowser', 'vivo'], // vivo
            ['mqqbrowser', 'qq'], //qq浏览器
            ['qq/[0-9\\.]+', 'qqapp'], // qq
            ['sogoumobilebrowser', 'sogou'], //搜狗浏览器
            ['ucbrowser', 'uc'], //UC浏览器
            ['miuibrowser', 'miui'],
            'firefox', //火狐浏览器
            ['baidubrowser', 'baidu'], //百度浏览器
            ['liebaofast', 'liebao'], //猎豹浏览器
            ['mb2345browser', '2345'], //2345浏览器
            ['lebrowser', 'lvcha'], //绿茶浏览器
            ['(opera)|(opr)', 'opera'], //欧朋浏览器
            ['(chrome)|(criOS)', 'chrome'], //chrome浏览器
            'safari' //safari浏览器
        ];
        for (let i = 0, ln = browser.length; i < ln; i++) {
            let item = browser[i];
            if (typeof item === 'string') {
                item = [item, item];
            }
            let reg = new RegExp(item[0], 'ig');
            if (reg.test(ua)) {
                return item[1];
            }
        }
        return 'unknown';
    },
};

module.exports = Common;
