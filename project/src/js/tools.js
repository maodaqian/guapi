/*
 * 生成指定范围的随机整数
 * @param lower 下限
 * @param upper 上限
 * @return 返回指定范围的随机整数，上/下限值均可取
 */
function random(lower, upper) {
  return Math.floor(Math.random() * (upper - lower)) + lower;
}

/*
 * 生成rgb随机颜色值
 * @return 返回生成的rgb字符串："rgb(33,44,55)"
 */
function randomColor() {
  // 随机生成 rgb 十进制值
  var r = random(0, 255),
    g = random(0, 255),
    b = random(0, 255);
  // 串联字符串，并返回
  return "rgb(" + r + "," + g + "," + b + ")";
}
/*
 * 将 URL 中查询字符串转换为对象
 * @param ul 待转换的URL字符串
 */
function parseQueryString(url) {
  // 获取 ? 与 # 的索引
  var start = url.indexOf("?"),
    end = url.indexOf("#");

  // 判断是否有 ?
  if (start === -1)
    // 不存在，则返回 null
    return null;
  // 存在 ?，则起始索引从?后一位置开始
  start += 1;

  // 判断是否有 #
  if (end === -1)
    // 不存在，则截取到字符串末尾
    end = url.length;

  // 获取查询字符串
  var queryString = url.slice(start, end);

  // 使用 & 符号将查询字符串分割
  queryString = queryString.split("&");
  var result = {}; // 保存解析后的对象
  // 遍历迭代数组中每个元素
  for (var i = 0, len = queryString.length; i < len; i++) {
    // 将当前数组中遍历到的 "key=value" 以 = 分割
    var parts = queryString[i].split("=");
    result[parts.shift()] = parts.shift();
  }

  // 将解析报的对象返回
  return result;
}

/*
 * 将对象转换为查询字符串
 * @param obj 对象
 * @return 查询字符串 key=value&key=value&key=value
 */
function toQueryString(obj) {
  // 定义变量保存转换结果
  var result = [];
  // 遍历迭代对象各属性
  for (var attr in obj) {
    result.push(attr + "=" + obj[attr]);
  }

  // 返回连接后的查询字符串
  return result.join("&");
}

/*
 * 格式化日期时间：yyyy-MM-dd HH:mm:ss
 * @param datetime 待格式化日期时间对象
 * @return 格式化后的字符串：yyyy-MM-dd HH:mm:ss
 */
function format(datetime) {
  var year = datetime.getFullYear(),
    month = ("0" + (datetime.getMonth() + 1)).slice(-2),
    date = ("0" + datetime.getDate()).slice(-2),
    hour = ("0" + datetime.getHours()).slice(-2),
    min = ("0" + datetime.getMinutes()).slice(-2),
    sec = ("0" + datetime.getSeconds()).slice(-2);

  return year + "-" + month + "-" + date + " " + hour + ":" + min + ":" + sec;
}

/*
*封装获取指定DOM元素的函数
*/

function $(selector) {
  var strs = selector.split(" "); //通过空格切割传递的字符串
  var result = document.getElementsByTagName("html"); //获取最外层的dom元素
  for (var i = 0, len = strs.length; i < len; i++) {
    //根据传过来的字符串，一层一层的遍历查找dom
    if (strs[i].charAt(0) === "#") {
      //如果是id，返回的是dom元素
      result = document.getElementById(strs[i].slice(1));
    } else if (strs[i].charAt(0) === ".") {
      //如果是class，则返回的是一个伪数组（集合），需要加一个下标，才能获得dom
      result = byClass(strs[i].slice(1), result[0]);
    } else {
      //如果是tagName
      if (i === 0)
        //代表传递的字符串只有一个tagName，
        result = result[0].getElementsByTagName(strs[i]);
      else if (strs[i - 1].charAt(0) === "#")
        //代表上一个是id，返回的是dom，可以直接调用
        result = result.getElementsByTagName(strs[i]);
      //代表上一个是class或者tagName，返回的是集合，需要加下标
      else result = result[0].getElementsByTagName(strs[i]);
    }
  }

  return result;
}

/*
 * 解决 document.getElementsByClassName 浏览器兼容问题
 * @param className 类名
 * @param context 查询上下文
 * @return 返回查找到的元素集合
 */
function byClass(className, context) {
  // 默认在整个文档中查询
  context = context || document;
  // 支持使用 getElementsByClassName 方法，则直接调用
  if (context.getElementsByClassName)
    return context.getElementsByClassName(className);
  // 不支持使用 getElementsByClassName 方法，解决兼容
  var result = []; // 保存所有查找到的元素
  // 查找查询上下文环境中所有元素
  var elements = context.getElementsByTagName("*");
  // 遍历所有元素，判断每个元素的类名
  for (var i = 0, len = elements.length; i < len; i++) {
    // 将当前遍历到元素的类名存入数组中
    var classNames = elements[i].className.split(" ");
    // 遍历数组中的元素，判断是否存在待查找的类名
    for (var j = 0, l = classNames.length; j < l; j++) {
      if (classNames[j] === className) {
        result.push(elements[i]);
        break;
      }
    }
  }

  // 返回查找结果
  return result;
}

/* 
*添加监听事件
*/
function on(element, type, callback) {
  if (element.addEventListener) {
    if (type.charAt("on") === 0) type = type.slice(2);
    element.addEventListener(type, callback, false);
  } else {
    if (type.charAt("on") !== 0) type = "on" + type;
    element.attachEvent(type, callback);
  }
}

/* 
*删除监听事件
*/
function off(element, type, callback) {
  if (element.removeEventListener) {
    if (type.charAt("on") === 0) type = type.slice(2);
    element.removeEventListener(type, callback, false);
  } else {
    if (type.charAt("on") !== 0) type = "on" + type;
    element.detachEvent(type, callback);
  }
}

/* 
*获取设置CSS样式
*/
function css(element, attr, value) {
  if (typeof attr === "object") {
    //设置样式
    for (var i in attr) {
      element.style[i] = attr[i];
    }
    return;
  }
  //查询样式
  if (typeof value === "undefined") {
    return window.getComputedStyle
      ? window.getComputedStyle(element)[attr]
      : element.currentStyle[attr];
  }
  //设置
  element.style[attr] = value;
}

/* 
*显示元素
*/
function show(element) {
  element.style.display = "block";
}

/* 
*隐藏元素
*/
function hide(element) {
  element.style.display = "none";
}

/* 
*获取元素在文档中的定位坐标
*/
function offset(element) {
  var _top = 0,
    _left = 0;
  while (element !== null) {
    _top += element.offsetTop;
    _left += element.offsetLeft;
    element = element.offsetParent;
  }
  return {
    top: _top,
    left: _left
  };
}

/* 
*查询保存cookie
*/
function cookie(key, value, options) {
  //writing
  if (typeof value !== "undefined") {
    //传入有具体的value值,此时执行cookie保存操作
    var cookie = encodeURIComponent(key) + "=" + encodeURIComponent(value);
    //判断可配置项
    options = options || {};
    if (options.expires) {
      //如果有有效时间
      var datetime = new Date();
      datetime.setDate(datetime.getDate() + options.expires);
      cookie += ";expires=" + datetime.toUTCString();
    }
    // 有路径
    if (options.path) cookie += ";path=" + options.path;
    // 有域
    if (options.domain) cookie += ";domain=" + options.domain;
    // 有安全配置
    if (options.secure) cookie += ";secure";
    // 保存cookie
    document.cookie = cookie;
    return;
  }
  //reading
  // 读取域下所有 cookie ("key=value") 放到数组中保存
  var cookies = document.cookie.split("; ");
  // 遍历迭代数组元素
  for (var i = 0, len = cookies.length; i < len; i++) {
    // 当前cookie以 "=" 分割
    var parts = cookies[i].split("=");
    // 第一个=号前的是cookie名，剩余元素以=连接作为cookie值
    var name = decodeURIComponent(parts.shift());
    // cookie名是否为待查找的名称
    if (name === key) {
      // 将value解码
      var value = decodeURIComponent(parts.join("="));
      // 返回查找到的 cookie 值
      return value;
    }
  }
  // 不能查找到，则返回 undefined
  return undefined;
}

/*
 * 删除cookie
 * @param key cookie名
 * @param options 可配置项
 */
function removeCookie(key, options) {
	options = options || {};
	options.expires = -1;
	cookie(key, "", options);
}



/* 
*封装动画动作函数
*@param element 需要添加动画的dom元素
*@param options 需要改变的属性以及值
*@param speed 动画的时间
*@param fn 动画结束执行的函数
*/
function animate(element,options,speed,fn){
  // 清除element前面的计时器
  clearInterval(element.timer);
  // 获取属性的初始值以及运动的总距离
  var start = {}, _range = {};
  for(var attr in options){
    start[attr] = parseFloat(css(element,attr));
    _range[attr] = options[attr]-start[attr];
  }
  // 获取点击按钮的时候的当前时间
  var nowTime = +new Date();
  // 启动计时器进行动画的运动
  element.timer = setInterval(function(){
    // 获取定时器运行的时候的时间与初始点击的时间的差值
    var dataTime = Math.min(+new Date()-nowTime,speed);
    for(var attr in options){
      result = dataTime * _range[attr]/speed + start[attr];
      if(attr === "width" || attr === "height" || attr === "bottom" || attr === "right" || attr === "left" || attr === "top")
        element.style[attr] = result + "px";
      else
        element.style[attr] = result;
    }
    if(dataTime === speed){
      clearInterval(element.timer);
      fn && fn();
    }
  },1000/60);


}

/* 淡入 */
function fadeIn(element,speed,fn){
    element.style.display = "block";
    element.style.opacity = 0;
    animate(element,{opacity:1},speed,fn);
}

/* 淡出 */
function fadeOut(element,speed,fn){
  animate(element,{opacity:0},speed,function(){
    element.style.display = "none";
  });
}