/**
 * 
 * @desc 描述可视化组件列表
 * @date 2018-06-11
 * @author gavinning gavinning@qq.com
 *
 * @history
 *    created at 2018-06-11 by gavinning
 *
 */

export default class Mods {
    /**
     * 
     * @param {Array<Mod | Pod>} arr Mod实例数组
     */
    constructor(arr) {
        this.$mods = [] /// [ Mod ]
        this.$nmap = {} /// { mod.name: Mod }
        this.$umap = {} /// { mod.uuid: Mod }
 
        if (arr && arr.length) {
            arr.forEach(mod => this.push(mod))
        }
    }

    /**
     * 根据自定义规则查询mod
     * @param {Function} callback 
     * @return {Mod}
     */
    get(callback) {
        return this.$mods.find(callback)
    }

    /// 请求Mods所存储数据结构
    /// 默认给出副本，防止意外更改
    /// 可以指定isNotClone请求原件
    getAll(isNotClone = false) {
        return isNotClone ? {
            mods: this.$mods,
            nmap: this.$nmap,
            umap: this.$umap
        }:
        {
            mods: this.$mods.slice(0),
            nmap: Object.assign({}, this.$nmap),
            umap: Object.assign({}, this.$umap)
        }
    }

    /// 请求当前实例所有mods
    getMods(isNotClone = false) {
        return isNotClone ? this.$mods : this.$mods.slice(0)
    }

    /// 获取vue所需要的names序列
    getNames() {
        return this.$mods.map(mod => mod.name)
    }

    /// 获取vue需要的components结构
    getComponents() {
        let components = {}
        this.$mods.forEach(mod => {
            components[mod.name] = mod.option
        })
        return components
    }

    /**
     * 根据name查询mod
     * @param {String} name 组件id 组件名
     * @return {Mod}
     */
    getByName(name) {
        return this.$nmap[name]
    }

    /**
     * 根据uuid查询组件
     * @param {String} uuid 组件实例uuid
     * @return {Mod}
     */
    getById(uuid) {
        return this.$umap[uuid]
    }

    /// 同 this.get
    find(callback) {
        return this.get(callback)
    }

    /**
     * 新增一个组件
     * @param {Mod} mod 可视化组件实例
     * @return {Mods}
     */
    push(mod) {
        return this.add(mod)
    }

    /// 同 this.push
    add(mod) {
        this.$mods.push(mod)
        this.$nmap[mod.name] = mod
        this.$umap[mod.uuid] = mod
        return this
    }

    /**
     * 删除一个可视化组件
     * @param {Function | Mod} callback 
     * @return {Mods}
     */
    remove(callback) {
        let mod, index

        if (typeof callback === 'object') {
            mod = callback
            index = this.$mods.indexOf(mod)
            callback = null
        }

        if (typeof callback === 'function') {
            mod = this.$mods.find(callback)
            index = this.$mods.indexOf(mod)
        }

        if (index >= 0) {
            this.$mods.splice(index, 1)
            delete this.$nmap[mod.name]
            delete this.$umap[mod.uuid]
        }
        return this
    }

    /**
     * 通过uuid删除一个可视化组件实例
     * @param {String} uuid 可视化组件实例uuid
     * @return {Mods}
     */
    removeById(uuid) {
        return this.remove(mod => mod.uuid === uuid)
    }

    /**
     * 通过name删除一个可视化组件实例
     * @param {String} name 可视化组件实例name
     * @return {Mods}
     */
    removeByName(name) {
        return this.remove(mod => mod.name === name)
    }
}