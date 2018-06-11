/**
 * 
 * @desc Protocol 队列通用操作 测试
 * @date 2018-06-11
 * @author gavinning gavinning@qq.com
 *
 * @history
 *    created at 2018-06-11 by gavinning
 *
 * 什么情况需要继承List Protocol？
 * 当类需要管理一个私有数组，并对私有数组对外暴露一系列操作方法的时候
 * 
 * 为什么要继承List Protocol
 * 如果你对Protocol有所了解就应该很容易理解
 * 继承List Protocol，实现其要求的方法之后
 * 就可以自动拥有List Protocol已实现好的一系列对私有数组的操作方法
 * 
 * 继承List注意事项
 * 1.子类需要实现List要求必须实现的方法 通常是 add 和 remove
 * 2.子类需要将私有数组引用指向this.$arr
 */

export default class List {
    constructor(arr) {
        // 这是一个引用
        // 指向子类真正的私有数组
        this.$arr = arr || []
    }

    /// 添加规则，子类必须实现的方法
    add(item) {}

    /// 删除规则，子类必须实现的方法
    remove(callback) {}


    /// 以下所有方法由父类辅助实现
    get(callback) {
        return this.$arr.find(callback)
    }

    find(callback) {
        return this.$arr.find(callback)
    }

    findIndex(callback) {
        return this.$arr.findIndex(callback)
    }

    indexOf(item) {
        return this.$arr.indexOf(item)
    }

    getBy(field, value) {
        return this.find(item => value === item[field])
    }

    getById(id) {
        return this.getBy('id', id)
    }

    getByName(name) {
        return this.getBy('name', name)
    }

    getByIndex(index) {
        return this.find((item, i) => index === i)
    }

    indexOf(index) {
        return this.getByIndex(index)
    }

    push() {
        return this.add.apply(this, arguments)
    }

    removeBy(field, value) {
        return this.remove(item => value === item[field])
    }

    removeById(id) {
        return this.removeBy('id', id)
    }

    removeByName(name) {
        return this.removeBy('name', name)
    }

    removeByIndex(index) {
        return this.remove((item, i) => index === i)
    }
}