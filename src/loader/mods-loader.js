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

const list = base.map(mod => {
    return new Mod(Object.assign({}, mod, {
        option: getOption(mod.uri),
        config: getConfig(mod.config)
    }))
})

function getOption(uri) {
    return require(`../../reps/src/${uri}`).default
}

function getConfig(uri) {
    return getOption(uri)
}

export default new Mods(list)
