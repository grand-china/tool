
//  Tool 相关
var Tool = {

  // 网络请求
  // discription:  xml request  ajax
  // # get post 简单请求
  // 1 path
  // 2 callbackback 返回函数 函数参数
  // 3 identify feature
  request: {
    get: function getRequest() {
      var url = arguments[0] || null;
      var callback = arguments[1] || null;
      var feature = arguments[2];
      var method = 'GET'
      this.loadData(url, callback, feature, method);
    },
    //# post 请求
    post: function postRequest() {
      var url = arguments[0] || null;
      var callback = arguments[1] || null;
      var feature = arguments[2];
      var method = 'POST'
      tish.loadData(url, callback, feature, method);
    },

    // finally
    loadData: function loadData(url, callback, feature, method) {
      var xmlhttp = new XMLHttpRequest();
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
          var result = xmlhttp.responseText;
          if (feature != undefined) {
            callback(result, feature);
          }
          else {
            callback(result);
          }
        }
      };
      xmlhttp.open(method, url, true); // false同步 ; true 异步
      xmlhttp.send(); // can send data here only for post
    }
  },

  //  页面元素
  ele: {
    id: (id) => {
      return document.getElementById(id)
    },
    classname: (classname) => {
      return document.getElementsByClassName(classname)
    },
    queryAll: (seletor) => {
      return document.querySelectorAll(seletor)
    }
  },

  //workspace env 的一些判断
  env: (function () {
    // 查询当前location url 参数paraName的value值
    function getUrlPara(paraName) {
        var url = document.location.toString();
        var arrObj = url.split("?");
         if (arrObj.length > 1) {
            var arrPara = arrObj[1].split("&");
            var arr;
        for (var i = 0; i < arrPara.length; i++) {
              arr = arrPara[i].split("=");
            if (arr != null && arr[0] == paraName) {
              return arr[1];
            }
        }
        return "";
      }
      else {
        return "";
      }
    }

    // 判断env 是android 还是ios
    var u = navigator.userAgent;
    var _isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端 
    var _isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端 

    function isAndroid() {
      return _isAndroid
    }

    function isIOS() {
      return _isiOS
    }
    function isMobile() {
      // Simplified logic
      return screen.width <= 600;
    }

    return {
      'getUrlPara': getUrlPara,
      'isAndroid': isAndroid,
      'isIOS': isIOS,
      'isMobile': isMobile,
    }
  })(),

  // KVO 利用监听属性变化 onChange: (old,newvalue,obj) : Void
  // var proxy = Tool.watch({},"name",(old,newvalue,obj) => {}); 
  // proxy.name = "grand"
  watch: (obj,property,onChange) => {
    var old = null;
    return new Proxy(obj, {
      set: (target,property,value,reciever) => {
        old = target[property];
        if (old !== value) {
          Reflect.set(target,property,value,reciever);
          onChange(old,value,target);
        }
      },
    })
  },

  // KVO 利用define, 任何变化通知
  // onChange :(key, new, obj) => {} 
  // @seealso watch
  observer: (obj, onChange) => {
    if (!obj || typeof obj !== 'object' ) {
      return
    }

    for (var key in obj) {
      OPdefineProperty(obj,key,obj[key])
    }

    function OPdefineProperty(obj,key,value) {
      Tool.observer(value,onChange);
      Object.defineProperty(obj,key, {
        set:(newvalue) => {
          var old = value
          value = newvalue
          if (old !== newvalue) {
             onChange(key,newvalue,obj)
          }
        },
        get: () => {
           return value;
        },
      });
    }
  },


  // Safe

  string: {
    isEmpty: (str) => {
      var co =  typeof str === "string"
      var lo = str.length > 0
      return !(co && lo)
    }
  }

}

