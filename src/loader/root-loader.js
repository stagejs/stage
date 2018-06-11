// /// 仅供测试调试时使用

import mods from './mods-loader'
import stage from './stage-loader'
import configure from './configure-loader'

const root = window.root = window

Object.assign(root, {
    mods,
    stage,
    configure
})

export default root