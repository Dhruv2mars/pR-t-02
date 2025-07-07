module.exports = function (api) {
  api.cache(true);
  
  return {
    presets: [
      [
        'babel-preset-expo',
        {
          // Enable import.meta transform for all platforms
          unstable_transformImportMeta: true,
        },
      ],
    ],
    plugins: [],
  };
};