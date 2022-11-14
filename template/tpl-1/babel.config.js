// eslint-disable-next-line func-names
module.exports = function (api) {
  api.cache(true);

  return {
    presets: [['next/babel']],
    plugins: [
      ['import', { libraryName: 'antd', libraryDirectory: 'lib', style: true }],
      [
        'module-resolver',
        {
          alias: {
            '@': './src',
          },
        },
      ],
    ],
  };
};
