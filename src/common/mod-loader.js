const mods = [
    {
        name: 'lincoapp-form',
        url: 'list/form',
        option: require('../list/form').default,
        config: require('../list/config/form').default
    },
    {
        name: 'lincoapp-header',
        url: 'list/header',
        option: require('../list/header').default,
        config: require('../list/config/header').default
    },
    {
        name: 'lincoapp-footer',
        url: 'list/footer',
        option: require('../list/footer').default,
        config: require('../list/config/footer').default
    }
]

/// 存储所有组件名
const names = mods.map(mod => mod.name)

/// 存储组件列表 => 父级组件
const components = {}

mods.forEach(mod => {
    /// 存储副本
    // {uuid: clone}
    mod.cloneMap = {}
    /// 存储组件map
    components[mod.name]  = mod.option
})

/// 临时测试
const ms = window.mods = {
    mods,
    names,
    components
}

/// todo 此地全局变量需优化
/// 存储舞台所有实例 只允许中央舞台写入 其他模块只有读取权限
window.stage = {

    /// 存储中心舞台所有vm实例
    vms: {
        map: {}, // {uuid: vm}
        list: [] // { vm, uuid, name }
    }
}

export default ms

