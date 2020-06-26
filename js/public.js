// 范围随机数
function random(min, max) {
    if (min > max) {
        var ls = min;
        min = max;
        max = ls;
    }
    return Math.floor(Math.random() * (max - min + 1)) + min
}

// 补零(补字符的零)
function createZero(n) {
    if (typeof n === "string") {
        if (n.length < 2) {
            return "0" + n
        }
        return n;
    } else {
        if (n < 10) {
            return "0" + n;
        }
        return n;
    }
}

// 随机十六进制的颜色值
function randomColor() {
    var r = random(0, 255).toString(16);
    var g = random(0, 255).toString(16);
    var b = random(0, 255).toString(16);
    return "#" + createZero(r) + createZero(g) + createZero(b);
}

// 取数组的最大值

function getMax(abc) {
    abc = abc.slice(0);
    abc.sort(function (a, b) {
        return b - a
    });
    return abc[0];
}

// 取数组的最小值
function getMin(qwe) {
    return qwe.slice(0).sort(function (a, b) {
        return a - b
    })[0];
}


// 数组去重
function isExist(arr,num){
    for(var i=0;i<arr.length;i++){
        if(arr[i] === num){
            return true;
        }
    }
    return false;
}
// var sArr = [];
//     for(var i=0;i<arr.length;i++){
//         if(!isExist(sArr, arr[i])){
//             sArr.push(arr[i]);
//         }
//     }

// 日期的格式化
function createDate() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    var myDate = d.getDate();
    var day = d.getDay();
    var hours = d.getHours();
    var minutes = d.getMinutes();
    var seconds = d.getSeconds();
    var millS = d.getMilliseconds();
    switch (day) {
        case 0:
            day = "日";
            break;
        case 1:
            day = "一";
            break;
        case 2:
            day = "二";
            break;
        case 3:
            day = "三";
            break;
        case 4:
            day = "四";
            break;
        case 5:
            day = "五";
            break;
        case 6:
            day = "六";
            break;
    }
    return {
        year: year,
        month: createZero(month),
        date: createZero(myDate),
        day: day,
        hours: createZero(hours),
        minutes: createZero(minutes),
        seconds: createZero(seconds),
        millS: millS
    };
}

// 计算两个日期之间的差值
function dateDiff(d1, d2) {
    var date1 = new Date(d1);

    var date2 = d2 ? new Date(d2) : new Date();

    var t = Math.abs(date1.getTime() - date2.getTime());

    var day = parseInt(t / 1000 / 60 / 60 / 24);
    var h = parseInt((t - day * 24 * 60 * 60 * 1000) / 1000 / 60 / 60);
    var m = parseInt((t - day * 24 * 60 * 60 * 1000 - h * 60 * 60 * 1000) / 1000 / 60);
    var s = parseInt((t - day * 24 * 60 * 60 * 1000 - h * 60 * 60 * 1000 - m * 60 * 1000) / 1000)
    var ms = t - day * 24 * 60 * 60 * 1000 - h * 60 * 60 * 1000 - m * 60 * 1000 - s * 1000;

    return {
        day: day,
        h: h,
        m: m,
        s: s,
        ms: ms
    }
}

// 获取样式的兼容处理
function getStyle(ele, attr) {
    if (ele.currentStyle) {
        return ele.currentStyle[attr];
    } else {
        return getComputedStyle(ele, false)[attr];
    }
}


// 取消事件冒泡，注意别忘记传参
function stopBubble(e) {
    if (e.stopPropagation) {
        e.stopPropagation();
    } else {
        e.cancelBubble = true;
    }
}

// 阻止默认事件,注意别忘记传参
function stopDefault(e){
    if(e.preventDefault){
        e.preventDefault();
    }else{
        e.returnValue=false;
    }
}

// 监听式事件绑定的封装
function addEvent(ele,type,cb){
    if(ele.addEventListener){
        ele.addEventListener(type,cb)
    }else if(ele.attachEvent){
        ele.attachEvent("on"+type,cb)
    }else{
        ele["on"+type] = cb;
    }
}

// 监听式事件删除的封装
function removeEvent(ele,type,cb){
    if(ele.removeEventListenner){
        ele.removeEventListenner(type,cb);
    }else{
        ele.detachEvent('on'+type,cb);
    }
}

// 事件委托的封装
function eveEnt(child,cb){
    return eve=>{
        var e = eve || window.event;
        var tar = e.target || e.srcElement;
        for(var i=0;i<child.length;i++){
            if(child[i] === tar){
                cb.bind(tar)();
            }
        }
    }
}
// 事件委托的使用
// obox.onclick=eveEnt(items,function(){
//     // 当前this已经被改变了，指向事件目标
//     console.log(this);
// })


//动画的封装   三个参数 对象 数据 回调函数
function move(ele, data, cb){
    clearInterval(ele.t);
    ele.t = setInterval(() => {
        var onoff = true;
        for(var i in data){
            // 获取当前值
            var iNow = i==="opacity" ? getStyle(ele,i) * 100 : parseInt(getStyle(ele,i));
            // 计算步长
            var speed = (data[i] - iNow)/8;
            speed = speed>0 ? Math.ceil(speed) : Math.floor(speed);
            // 设置属性
            ele.style[i] = i==="opacity" ? (iNow + speed)/100 : iNow + speed + "px";
            // 判断是否有属性没到目标
            if(iNow!=data[i]) onoff = false;
        }
        // 没有属性没到目标
        if(onoff){
            clearInterval(ele.t);
            cb && cb();
        }
    }, 30);
};
//动画封装的补充函数
function getStyle(ele,attr){
    if(ele.currentStyle){
        return ele.currentStyle[attr];
    }else{
        return getComputedStyle(ele, false)[attr];
    }
};


// 当前ajax封装完成之后的调用方式：
// var p1 = ajax({
//     type:"get",
//     url:"",
//     data:{
//         user:"admin",
//         pass:123
//     }
// })
// p1.then(function(res){
//     console.log(res)
// })
// p1.catch(function(res){
//     console.log(res)
// })
// ajax函数自身执行的时候不再接收成功和失败的处理函数了
// 交给ajax内部封装的promise处理
// 封装过程
function ajax(ops){
    ops.type = ops.type || "get";
    ops.data = ops.data || {};
    var str = "";
    for(var key in ops.data){
        str += `${key}=${ops.data[key]}&`;
    }
    if(ops.type=="get"){
        let t = new Date().getTime();
        ops.url = ops.url + "?" + str + "__qft="+ t;
    }
    var xhr = new XMLHttpRequest();
    xhr.open(ops.type, ops.url);
    if(ops.type == "get"){
        xhr.send();
    }else{
        xhr.setRequestHeader("Content-type","application/x-www-form-urlencoded");
        xhr.send(ops.data);
    }
    return new Promise(function(resolve,reject){
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200){
                resolve(xhr.responseText);
            }else if(xhr.readyState === 4 && xhr.status !== 200){
                reject("当前请求失败了，失败的原因是：" + xhr.status);
            }
        }
    })
}

//cookie的封装
function setCookie(key,val,ops){
    ops = ops || {};
    let e = "";
    if(ops.expires){
        console.log(ops.expires);
        var d = new Date();
        d.setDate( d.getDate() + ops.expires );
        e = ";expires="+d;
    }
    let p = ops.path ? ";path="+ops.path : "";
    document.cookie = `${key}=${val}${p}${e}`;
}

function getCookie(key){
    let strC = document.cookie;
    let arrC = strC.split("; ");
    for(var i=0;i<arrC.length;i++){
        if(arrC[i].split("=")[0] === key){
            return arrC[i].split("=")[1];
        }
    }
    return "";
}
function removeCookie(key,ops){
    ops = ops || {};
    ops.expires = -1;

    setCookie(key,"qweqwezzdasd",ops);
}


// jsonp(url,function(res){
//     console.log(res);
// },{
//     user:"root",
//     pass:678,
//     // 根据后台规定的字段名，随便传个函数名过去，让后台返回值后，能被script解析
//     cbn:"zxc",
//     // 为了实现前端的封装思想，为了适应后台不断变化的地址，将后台要接受的字段名，传给自己的函数
//     fieldName:"cbn"
// });
//jsonp解决跨域的封装
function jsonp(url,success,data){
    data = data || {};
    let str = "";
    for(var key in data){
        str += `${key}=${data[key]}&`;
    }
    let t = new Date().getTime();
    str = str + "__qft="+t;
    var script = document.createElement("script");
    script.src = url + "?" + str;
    document.body.appendChild(script);
    
    window[data[data.fieldName]] = function(res){
        success(res);
    }
}







