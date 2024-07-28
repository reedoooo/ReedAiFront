export function isNumber(value) {
  return Object.prototype.toString.call(value) === '[object Number]';
}

export function isString(value) {
  return Object.prototype.toString.call(value) === '[object String]';
}

export function isBoolean(value) {
  return Object.prototype.toString.call(value) === '[object Boolean]';
}

export function isNull(value) {
  return Object.prototype.toString.call(value) === '[object Null]';
}

export function isUndefined(value) {
  return Object.prototype.toString.call(value) === '[object Undefined]';
}

export function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

export function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}

export function isFunction(value) {
  return Object.prototype.toString.call(value) === '[object Function]';
}

export function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]';
}

export function isRegExp(value) {
  return Object.prototype.toString.call(value) === '[object RegExp]';
}

export function isPromise(value) {
  return Object.prototype.toString.call(value) === '[object Promise]';
}

export function isSet(value) {
  return Object.prototype.toString.call(value) === '[object Set]';
}

export function isMap(value) {
  return Object.prototype.toString.call(value) === '[object Map]';
}

export function isFile(value) {
  return Object.prototype.toString.call(value) === '[object File]';
}

// eslint-disable-next-line no-control-regex
export const isASCII = str => /^[\x00-\x7F]*$/.test(str);
