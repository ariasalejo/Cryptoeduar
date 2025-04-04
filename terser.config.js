module.exports = {
  compress: {
    drop_console: true
  },
  mangle: {
    properties: {
      regex: /^_/
    }
  },
  output: {
    comments: false
  }
};
