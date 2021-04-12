/**
 * 手写new
 * 首先 new这个过程发生了什么
 * 1. 创建一个空的js对象{}
 * 2. 链接到原型，即新对象继承构造函数的原型链
 * 3. 将构造函数的this指向这个对象
 * 4. 根据构造函数的返回值类型返回结果
 */

const create = function (fn, ...args) {

    //let obj = Object.create({})
    //obj.__proto__ = fn.prototype
    let obj = Object.create(fn.prototype)
    let res = fn.apply(obj , args)


    //3. 改变构造函数的上下文(this)，并将剩余的参数传入
    return res instanceof Object ? res : obj
}

const _new = function(fn , ...args){
    let obj = {}
    Object.setPrototypeOf(obj , fn.prototype)
    let res = fn.apply(obj , args)
    return res instanceof Object ? res : obj
}
/********测试用例******* */
function person(name , age){
    this.name = name 
    this.age = age
}
person.prototype.sayInfo = function(str){
    return str
}

let sans = _new(person , 'll' , 20)
console.log(sans)
let chara = create(person,'dd' , 21)
console.log(chara)
let lll = new person('ll' , 20)
console.log(lll)
console.log(lll.sayInfo('开心'))