module.exports = {
    "node": true, // 当代码运行时全局变量使用Node.Js运行里的全局变量
    "browser": true, // 标准浏览器全局变量 如：`window`, `document`
    "es5": false, // 允许ES5语法
    "esnext": true, // 允许下一代ES语法诸如`const`和`let`的特殊功能
    "bitwise": true, // 禁止位操作 (&, |, ^, 等)
    "camelcase": false, // `var`变量名及`object`索引只允许使用驼峰式命名法.
    "curly": true, // 每一个新的代码块或者作用域都需要用{}包围
    "eqeqeq": true, // 使用绝对相等(三个等号) 即：`===`以及`!==`
    "immed": true, // 直接调用的匿名函数需要被括号包围 例如：`( function(){}() );`
    "latedef": true, // 禁止变量在定义前使用
    "newcap": true, // 所有构造函数定义首字母大写 例如：`new F()`
    "noarg": true, // 禁止使用`arguments.caller`和`arguments.callee`
    "quotmark": "single", // 定义字符串使用的引号
    "undef": true, // 所有非全局变量在使用前需要先定义
    "unused": false, // 警告所有未使用的变量
    "strict": false, // 强制使用`strict`模式
    "trailing": true, // 禁止行尾空格
    "smarttabs": false, // 在制表符与空格混合使用时不提示警告
    "globals": { // 全局变量集
        "jQuery": true,
        "requirejs": true,
        "next": true,
        "angular": true,
        "node": true,
        "$": true
    },
    "predef": [ // 其他全局变量
        "define",
        "require",
        "exports",
        "module",
        "describe",
        "before",
        "beforeEach",
        "after",
        "afterEach",
        "it"
    ],
    "asi": false, // 允许省略分号
    "indent": 4, // 指定缩进距离
    "maxlen": 3020, // 行最大长度
    "devel": false, // 允许开发输出 如：`console.log();`
    "noempty": true // 禁止使用空的代码块
}
