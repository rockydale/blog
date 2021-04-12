/**
 * 手写calapply和bind
 */

/**
 * 
 * @param {*} context 期望的this指向
 * 后面不传参数主要是因为传入参数第一个是固定的
 * 第二个是不定长的，我们需要遍历arguments参数来获取传入的参数 
 */

Function.prototype.call_self = function (context) {
    context = context || window
    let fn = this //指向的是函数
    //首先保存this的指向
    context.fn = fn
    //存储剩余的参数
    let args = []
    //注意下标要从1开始
    for (let i = 1; i < arguments.length; i++) {
        args.push('arguments[' + i + ']')
    }
    let result = eval('context.fn(' + args + ')')
    // 使用之后删除
    delete context.fn
    return result
}


/**
 * 
 * @param {*} context  期望的this指向
 * @param {*} args  除了this指向以外其他的参数所组成的数组
 */
Function.prototype.apply_self = function(context , args){
    context = context || window
    let fn = this
    context.fn = fn
    //映射成变量的形式
    let argu = args.map((item , idx) => 'args[' + idx +']')
    //执行函数得到结果
    let result = eval('context.fn(' + argu +')')
    delete context.fn
    return result
}

/**
 * 
 * @param {*} context 期待的this指向
 */
Function.prototype.bind_self = function(context){
    context = context || window
    let fn = this
    context.fn = fn
    //保存除了this指向之外其他的参数
    let arg1 = Array.from(arguments).pop()
    return function(){
        let result
        if(arguments.length == 0){
            result = eval('context.fn(' + argu + ')')
            return result
        }
        //把两部分的参数数组拼接起来
        let new_arg = Array.prototype.concat(arg1 , Array.from(arguments))
        //拼接成变量形式
        let argu = new_arg.map((item , idx) =>'new_arg[' + idx +']')
        result = eval('context.fn(' + argu + ')' )
        return result
    }

}



/********测试部分********/
var age = 18
var name = 'char'
let man = {
    name: 'lll',
    age: 20,
    sayIt(str1, str2) {
        return `my name is ${name} , my age is ${age} , ${str1} , ${str2}`
    }
}
let woman = {
    name: 'ddd',
    age: 21
}
console.log(man.sayIt('hi', 'everyone'))
console.log(man.sayIt.call(woman, 'hello', 'word'))
console.log(man.sayIt.call_self(woman, 'hello', 'word'))
console.log(man.sayIt.apply_self(woman, ['hello', 'word']))
let Fn = man.sayIt.bind_self(woman , '123')
console.log(Fn('456'))