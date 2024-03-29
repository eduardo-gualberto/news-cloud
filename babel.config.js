module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['expo-router/babel', ["module:@preact/signals-react-transform", { mode: 'all' }]],
  };
};
