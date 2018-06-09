import emmet from '@gavinning/emmet.js'

export default class Creater {
    constructor() {

    }

    emmet(abbr) {
        return $(emmet(abbr))
    }

    wrapper() {
        return this.emmet('div.config-item')
    }

    desc(text) {
        return this.emmet('div.desc').text(text)
    }
}