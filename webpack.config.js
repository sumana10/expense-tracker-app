module.exports = {
    // other options...
    resolve: {
      fallback: {
        fs: false, // not needed as this is a browser environment
        path: require.resolve("path-browserify"),
        os: require.resolve("os-browserify/browser"),
      },
    },
  };
  