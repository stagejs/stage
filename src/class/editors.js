/**
 * 
 * @desc 编辑器父类
 * @date 2018-06-11
 * @author gavinning gavinning@qq.com
 *
 * @history
 *    created at 2018-06-11 by gavinning
 *
 */

import Mod from './mod'
import List from './list'
import Editor from './editor'
import ConfigParser from './config-parser'

export default class Editors extends List {
    constructor() {
        super()
        this.$editors = this.$arr
        this.$map = {} /// { editor.uuid: editor }
    }

    /**
     * 返回匹配的editor
     * @param {Mod | Function} way 查询方式，Mod实例或者是一个回调
     */
    get(way) {
        // 根据Mod实例查询
        if (way instanceof Mod) {
            const mod = way

            // 检查Editor实例是否已创建 已存在则直接返回
            if (this.$map[mod.uuid]) {
                return this.$map[mod.uuid]
            }

            // 自动创建Editor实例并缓存
            // 为每个VM实例单独创建Editor实例
            // 涉及到数据双向绑定问题，所以同类组件也不能共用一个Editor实例
            const parser = new ConfigParser(mod.config.editor)
            const config = parser.parse()
            const editor = new Editor({ vm: mod.vm, config })
            this.add(editor)
            return editor
        }

        if (typeof way === 'function') {
            return super.get(way)
        }
    }

    add(editor) {
        this.$editors.push(editor)
        this.$map[editor.uuid] = editor
    }

    remove(callback) {
        const editor = this.get(callback)
        const index = this.findIndex(item => item === editor)
        if (index >= 0) {
            this.$editors.splice(index, 1)
            delete this.$map[editor.name]
        }
        return this
    }
}