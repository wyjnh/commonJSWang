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
    /**
     * 判断ie浏览器
     * @param {*} ua 
     */
    IeJudge() {
        // 在首页、ie、pad版qq浏览器 保留fixIE
        let ua = window.navigator.userAgent;
        let isIe = false;
        if((document.documentMode || +(ua.match(/MSIE (\d+)/) && RegExp.$1))){
            isIe = true;
        }
        return isIe;
    },
    /**
     * 兼容ie删除节点
     * @param {*} _element 
     */
    removeElement(_element) {
        var _parentElement = _element.parentNode;
        if (_parentElement) {
            _parentElement.removeChild(_element);
        }
    },
    /**
     * 判断终端类型
     */
    terminalJudge() {
        //判断是否手机端访问 ua移动端走wap pc和ipad根据宽度判断
        var userAgentInfo = window.navigator.userAgent.toLowerCase();
        let reg = RegExp(/iphone|symbianos|android|windows phone|ipod/);
        if (userAgentInfo.match(reg)) {
            return 'wap';
        } else if (window.innerWidth <= 820) {
            return 'wap';
        } else {
            return 'web';
        }
    },
    /**
     * 返回节点所有父节点class
     * @param {*} startTag 节点
     * @param {*} parentTagList 父节点class数组
     */
    getParentTag(startTag, parentTagList = []) {
        // 传入标签是否是DOM对象
        if (!(startTag instanceof HTMLElement)) return console.error('receive only HTMLElement');
        // 父级标签是否是body,是着停止返回集合,反之继续
        if (startTag.parentElement && 'BODY' !== startTag.parentElement.nodeName) {
            // 放入集合
            parentTagList.push(startTag.parentElement.className);
            // 再上一层寻找
            return Common.getParentTag(startTag.parentElement, parentTagList);
        }
        // 返回集合,结束
        else return parentTagList;
    },
    /**
     * 插入js
     * @param {*} url 
     */
    appendPassportJs(url) {
        var script = document.createElement('script');
        script.id = 'passport';
        script.type = 'text/javascript';
        script.src = url;
        document.body.appendChild(script);
    },
    /**
     * 获取页面内的选择文本
     */
    getSelection() {
        let selection = '';
        if (window.getSelection) {
            let activeElement = document.activeElement;
            if (activeElement && (activeElement.nodeName === 'TEXTAREA' || activeElement.nodeName === 'INPUT')) {
                selection = activeElement.value.substring(activeElement.selectionStart, activeElement.selectionEnd); // 针对 FireFox textarea input 的特殊处理
            } else {
                selection = window.getSelection(); // FireFox, Safari, Chrome
            }
        } else if (document.getSelection) {
            selection = document.getSelection(); // IE10
        } else if (document.selection) {
            selection = document.selection.createRange().text; // IE6+10-
        }
        return selection
            .toString()
            .replace(/^\s+/g, '')
            .replace(/\s+$/g, '');
    },
    /**
     * 移除页面内的选择“记忆”
     */
    removeSelection() {
        if (window.getSelection) {
            window.getSelection().removeAllRanges();
        } else if (document.getSelection && document.getSelection.empty) {
            document.getSelection().empty();
        } else if (document.selection && document.selection.empty) {
            document.selection.empty();
        }
    },
    /**
     * 获取自定义属性 ie 兼容 dateSet
     * @param {*} ele 
     */
    getDataset(ele) {
        if (ele.dataset) {
            return ele.dataset;
        } else {
            var attrs = ele.attributes, //元素的属性集合
                dataset = {},
                name,
                matchStr;

            for (var i = 0; i < attrs.length; i++) {
                //是否是data- 开头
                matchStr = attrs[i].name.match(/^data-(.+)/);
                if (matchStr) {
                    //data-auto-play 转成驼峰写法 autoPlay
                    name = matchStr[1].replace(/-([\da-z])/gi, function(all, letter) {
                        return letter.toUpperCase();
                    });
                    dataset[name] = attrs[i].value;
                }
            }
            return dataset;
        }
    },
    /**
     * 把对象转成get请求参数形式
     * @param {*} obj 
     */
    urlParams(obj) {
        let param = [];
        for (let key in obj) {
            param.push(key + '=' + encodeURIComponent(obj[key]));
        }
        return param.join('&');
    },
    /**
     * 页面滚动js
     * @param {*} options { x: ,y: ,duration: }
     */
    scrollTo: function (options) {
        var x = options.x,
            y = options.y,
            duration = options.duration || 10,
            html = document.documentElement,
            body = document.body,
            tl, type, current, direction, split, distance, _timer, _scroll;

        if ('undefined' === typeof x && y >= 0) {
            tl = html.scrollTop || body.scrollTop;
            current = y;
            type = 'y';
        } else if ('undefined' === typeof y && x >= 0) {
            tl = html.scrollLeft || body.scrollLeft;
            current = x;
            type = 'x';
        } else {
            return;
        }

        if (current === tl) return;

        direction = current - tl > 0 ? 1 : -1;
        distance = Math.abs(current - tl);
        split = distance / 50;
        split *= direction;
        _scroll = function(tl) {
            'x' === type ? window.scrollTo(tl, 0) : window.scrollTo(0, tl);
        }
        _timer = setInterval(function () {
            tl += split;
            distance -= Math.abs(split);
            if (distance <= 0) {
                _scroll(current);
                clearInterval(_timer);
                _timer = null;
            } else {
                _scroll(tl);
            }
        }, duration)
    },
};

module.exports = Common;
