
var ObjProto = Object.prototype

var toString = ObjProto.toString;

var
    nativeIsArray = Array.isArray;

export function isNumber(obj) {
    return typeof obj === 'number';
}

export var isArray = nativeIsArray ? nativeIsArray : function (value) {
    return toString.call(value) === '[object Array]';
}

export function isUndefined(obj) {
    return obj === undefined;
}


export function isEqual(a, b) {
    return String(a) === String(b);
}

export function noop() { }


export function each(obj, iterator, context) {
    if (obj == null) return obj;

    var i, length, hasContext = context === void 0 ? false : true;

    for (i = 0, length = obj.length; i < length; i++) {
        if (iterator.call(hasContext ? context : obj[i], obj[i], i, obj) === false) break;
    }

    return obj;
}
