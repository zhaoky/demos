module.exports = {
  presets: [
    [
      '@babel/env',
      {
        useBuiltIns: false, // usage-按需引入 entry-入口引入（整体引入） false-不引入polyfill
        corejs: 3 // 2-corejs@2  3-corejs@3
      }
    ]
  ],
  plugins: [
    [
      '@babel/plugin-transform-runtime',
      {
        corejs: 3
      }
    ]
  ]
};
