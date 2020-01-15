module.exports = {
  presets: [
    [
      '@babel/env',
      {
        targets: '> 1%, not dead'
      }
    ],
    '@babel/preset-typescript'
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3
      }
    ],
    '@babel/plugin-proposal-class-properties'
  ]
};
