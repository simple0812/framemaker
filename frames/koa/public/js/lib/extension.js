if(!window.console) window.console = {
    log:function(){}
};

function $get() { return document.getElementById(arguments[0]); }

function pagerDelegate(obj, method, mode) {
    var delegate = function () {
        var args = [];
        args.push(mode);
        method.apply(obj, args);
    };

    return delegate;
}

function readonly() {
    this.blur();
    return false;
}

Array.prototype.objCount = function(c) { return c; }

String.prototype.format = function() {
    var args = arguments;
    return this.replace(/\{(\d+)\}/g, function(m, i) {
        return args[i];
    });
}

String.prototype.trimUrlPath = function() {
    return this.replace(/http:\/\/[^\/]+(:\d{2,8})?\//, '/');
}

String.format = function() {
    if (arguments.length == 0)
        return null;

    var str = arguments[0];
    for (var i = 1; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i - 1) + '\\}', 'gm');
        str = str.replace(re, arguments[i]);
    }

    return str;
}

String.formatArgs = function() {
    if (arguments.length == 0)
        return null;

    var str = arguments[0];
    var args = arguments[1];
    for (var i = 0; i < args.length; i++) {
        var re = new RegExp('\\{' + i + '\\}', 'gm');
        str = str.replace(re, args[i]);
    }

    return str;
}

String.prototype.htmlEncode = function() {
    var temp = document.createElement("div");
    (temp.textContent != null) ? (temp.textContent = this) : (temp.innerText = this);
    var output = temp.innerHTML;
    temp = null;
    return output;
}

String.prototype.htmlDecode = function() {
    var temp = document.createElement("div");
    temp.innerHTML = this;
    var output = temp.innerText || temp.textContent;
    temp = null;
    return output;
}

Array.indexOf = function() {
    var arr = arguments[0];

    for (var i = 0; i < arr.length; i++) {
        if (arr[i] == arguments[1])
            return i;
    }

    return -1;
}

Array.prototype.Clone = function() {
    return JSON.parse(JSON.stringify(this));
}



function getType(o) {
    var _t;
    return ((_t = typeof(o)) == "object" ? o == null && "null" ||
        Object.prototype.toString.call(o).slice(8,-1):_t).toLowerCase();
}


Array.prototype.indexOf = function(v) {
    for (var i = 0; i < this.length; i++) {
        if (this[i] == v)
            return i;
    }

    return -1;
}

Array.prototype.removeAt = function(index) {
    return this.splice(index, 1); //part1.concat(part2);
}

Array.prototype.remove = function(item) {
    //return this.removeAt(this.indexOf(item));
    var regString = ("," + this.join(",") + ",").replace("," + arguments[0] + ",", ",");

    if (regString != ",")
        return regString.substr(1, regString.length - 2).split(",");
    else
        return [];
}

Function.prototype.method = function(name, fn) {
    if(arguments.length < 2) throw  new Error('参数长度不正确');
    if(typeof (name) !== 'string') throw new Error('参数类型不正确');
    if(typeof (fn) !== 'function') throw new Error('参数类型不正确');
    this.prototype[name] = fn;
}

function extend(subClass, superClass) {
    var F = function() {};
    F.prototype = superClass.prototype;
    subClass.prototype = new F;
    subClass.prototype.constructor = subClass;

    subClass.superClass = superClass;
    if(superClass.prototype.constructor == Object.prototype.constructor)
        superClass.prototype.constructor = superClass;
}

(function($) {

    var o = $({});

    $.subscribe = function() {
        o.on.apply(o, arguments);
    };

    $.unSubscribe = function() {
        o.off.apply(o, arguments);
    };

    $.publish = function() {
        o.trigger.apply(o, arguments);
    };

}($));


