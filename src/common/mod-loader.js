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

export default ms

