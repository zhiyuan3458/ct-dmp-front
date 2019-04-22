// https://eslint.org/docs/user-guide/configuring
module.exports = {
  root: true,
  /**
   * 用来兼容webpack
   * babel-eslint——表示babel处理的这种语法可能对ESLint不是特别的支持，
   * 然后我们使用loader处理ESLint的时候就会出现一些问题，
   * 因此我们使用babel-eslint作处理
   */
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
    "commonjs": true,
    "es6": true,
    "jquery": true
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommend
    //
    //
    // ed` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    // 推荐使用eslint-config-standard这个包进行代码检测
    'standard'
  ],
  // required to lint *.vue files
  plugins: [
    'vue'
  ],
  // define global variable
  globals: {
    "$": true,
    "AMap": true,
    "Vue": true,
    "axios": true
  },
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    // 分号semi
    'semi': ['error', 'always'],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    'vue/no-parsing-error': 0,
    'no-extend-native': 0,
    'no-array-constructor': 0,
    'no-eval': 0,
    'brace-style': ['error', 'allman']
  }
}
