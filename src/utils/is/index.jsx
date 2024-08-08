/**
 * Checks if the provided value is a number.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a number, false otherwise.
 */
export function isNumber(value) {
  return Object.prototype.toString.call(value) === '[object Number]';
}

/**
 * Checks if the provided value is a string.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a string, false otherwise.
 */
export function isString(value) {
  return Object.prototype.toString.call(value) === '[object String]';
}

/**
 * Checks if the provided value is a boolean.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a boolean, false otherwise.
 */
export function isBoolean(value) {
  return Object.prototype.toString.call(value) === '[object Boolean]';
}

/**
 * Checks if the provided value is null.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is null, false otherwise.
 */
export function isNull(value) {
  return Object.prototype.toString.call(value) === '[object Null]';
}

/**
 * Checks if the provided value is undefined.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is undefined, false otherwise.
 */
export function isUndefined(value) {
  return Object.prototype.toString.call(value) === '[object Undefined]';
}

/**
 * Checks if the provided value is an object.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is an object, false otherwise.
 */
export function isObject(value) {
  return Object.prototype.toString.call(value) === '[object Object]';
}

/**
 * Checks if the provided value is an array.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is an array, false otherwise.
 */
export function isArray(value) {
  return Object.prototype.toString.call(value) === '[object Array]';
}

/**
 * Checks if the provided value is a function.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a function, false otherwise.
 */
export function isFunction(value) {
  return Object.prototype.toString.call(value) === '[object Function]';
}

/**
 * Checks if the provided value is a Date object.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a Date object, false otherwise.
 */
export function isDate(value) {
  return Object.prototype.toString.call(value) === '[object Date]';
}

/**
 * Checks if the provided value is a RegExp object.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a RegExp object, false otherwise.
 */
export function isRegExp(value) {
  return Object.prototype.toString.call(value) === '[object RegExp]';
}

/**
 * Checks if the provided value is a Promise object.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a Promise object, false otherwise.
 */
export function isPromise(value) {
  return Object.prototype.toString.call(value) === '[object Promise]';
}

/**
 * Checks if the provided value is a Set object.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a Set object, false otherwise.
 */
export function isSet(value) {
  return Object.prototype.toString.call(value) === '[object Set]';
}

/**
 * Checks if the provided value is a Map object.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a Map object, false otherwise.
 */
export function isMap(value) {
  return Object.prototype.toString.call(value) === '[object Map]';
}

/**
 * Checks if the provided value is a File object.
 *
 * @param {any} value - The value to check.
 * @returns {boolean} Returns true if the value is a File object, false otherwise.
 */
export function isFile(value) {
  return Object.prototype.toString.call(value) === '[object File]';
}

/**
 * Checks if the provided string contains only ASCII characters.
 *
 * @param {string} str - The string to check.
 * @returns {boolean} Returns true if the string contains only ASCII characters, false otherwise.
 */
// eslint-disable-next-line no-control-regex
export const isASCII = str => /^[\x00-\x7F]*$/.test(str);
