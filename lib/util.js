
"use strict";

var _interopRequireDefault = require("@babel/runtime-corejs2/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isNumber = isNumber;
exports.isUndefined = isUndefined;
exports.isEqual = isEqual;
exports.noop = noop;
exports.each = each;
exports.isArray = void 0;

var _isArray = _interopRequireDefault(require("@babel/runtime-corejs2/core-js/array/is-array"));

var ObjProto = Object.prototype;
var toString = ObjProto.toString;
var nativeIsArray = _isArray.default;

function isNumber(obj) {
  return typeof obj === 'number';
}

var isArray = nativeIsArray ? nativeIsArray : function (value) {
  return toString.call(value) === '[object Array]';
};
exports.isArray = isArray;

function isUndefined(obj) {
  return obj === undefined;
}

function isEqual(a, b) {
  return String(a) === String(b);
}

function noop() {}

function each(obj, iterator, context) {
  if (obj == null) return obj;
  var i,
      length,
      hasContext = context === void 0 ? false : true;

  for (i = 0, length = obj.length; i < length; i++) {
    if (iterator.call(hasContext ? context : obj[i], obj[i], i, obj) === false) break;
  }

  return obj;
}