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

    group() {
        return this.emmet('div.config-group')
    }

    cell() {
        return this.emmet('div.config-cell')
    }

    title(text) {
        return this.emmet('div.config-title').text(text)
    }

    desc(text) {
        return this.emmet('div.config-desc').text(text)
    }

    cellTitle(text) {
        return this.emmet('div.cell-title').text(text)
    }

    cellDesc(text) {
        return this.emmet('div.cell-desc').text(text)
    }
}