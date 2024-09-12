const path = require('path');

exports.interfaceVersion = 2;

exports.resolve = function (source, file, config) {
  if (source.endsWith('?worker')) {
    return {
      found: true,
      path: null,
    };
  }

  // Fallback to Node resolution
  return require('eslint-import-resolver-node').resolve(source, file, config);
};
