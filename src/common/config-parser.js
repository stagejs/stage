import types from './types'

function parse(node, config) {
    if (!config || config.length === 0) {
        return
    }
    return config.filter(conf => types[conf.type]).map(conf => {
        return creater[conf.type](node, conf)
    })
}


const creater = {
    text(node, config) {
        const last = editor[config.type](config)

        last.target.val(config.get(node))
        last.target.on('keypress', e => {
            if (e.keyCode === 13) {
                config.set(node, last.target.val())
            }
        })

        return last.wrapper
    },

    button(node, config) {

    }
}


const editor = {
    text(config) {
        const wrapper = $('<div class="config-item"></div>')
        const title = $(`<label>${config.title}</label>`)
        const desc = $(`<div class="desc">${config.desc}</div>`)
        const target = $('<input type="text">')

        wrapper.append(title)
        wrapper.append(target)
        wrapper.append(desc)

        return {
            target,
            wrapper
        }
    }
}

export default parse