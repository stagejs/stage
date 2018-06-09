import is from 'aimee-is'
import types from './types'
import Creater from '../common/creater'

const create = new Creater()


export default class ConfigParser {
    constructor({vm, clone, config}) {
        this.vm = vm
        this.clone = clone
        this.config = config
    }

    parse() {
        if (!this.config || this.config.length === 0) {
            return
        }
        return this.config.filter(conf => types[conf.type]).map(conf => {
            return createEditor(this.clone, conf)
        })
    }
}

function createEditor(node, config) {
    if (editor[config.type]) {
        return editor[config.type](node, config).wrapper
    }
}

const editor = {
    text(node, config) {
        const wrapper = create.wrapper()
        const title = create.emmet(`label{${config.title}}`)
        const desc = create.desc(config.desc)
        const target = create.emmet('input[type="text"]')

        wrapper.append(title)
        wrapper.append(target)
        wrapper.append(desc)

        target.val(config.get(node))
        target.on('keypress', e => {
            if (e.keyCode === 13) {
                config.set(node, target.val())
            }
        })

        return {
            target,
            wrapper
        }
    },

    button(node, config) {
        const wrapper = create.wrapper()
        const desc = create.desc(config.desc)
        const target = create.emmet('button.btn').text(config.title)

        wrapper.append(target)
        wrapper.append(desc)

        target.on('click', e => {
            config.submit(node)
        })

        return {
            target,
            wrapper
        }
    }
}
