/**
 * 
 * @desc mods-loader
 * @date 2018-06-11
 * @author gavinning gavinning@qq.com
 *
 * @history
 *    created at 2018-06-11 by gavinning
 *
 */

import Mod from 'class/mod'
import Mods from 'class/mods'
import base from 'config/mods.config'

const list = base.map(rule => {
    const arr = rule.split(' ')
    const name = arr[0]
    const uri = arr[1]
    return new Mod({
        name,
        uri,
        option: getOption(uri),
        config: getConfig(uri)
    })
})

function getOption(uri) {
    return require(`../${uri}`).default
}

function getConfig(uri) {
    const arr = uri.split('/')
    arr[2] = arr[1]
    arr[1] = 'config'
    return require(`../${arr.join('/')}`).default
}

export default new Mods(list)
