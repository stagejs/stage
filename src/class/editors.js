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

import List from './list'

export default class Editors extends List {
    constructor() {
        super()
        this.$editors = []
        this.$map = {} /// { editor.name: editor }
    }

    get(callback) {
        return this.$editors.find(callback)
    }

    add(editor) {
        this.$editors.push(editor)
        this.$map[editor.name] = editor.name
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

    findIndex(callback) {
        return this.$editors.findIndex(callback)
    }
}