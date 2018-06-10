import types from '../../common/types'

const form = {

    ability: ['sortable', 'deleteable'],

    editor: [
        {
            /// 配置类型
            type: types.button,

            title: '新增字段',
    
            /// 描述
            desc: '点击新增字段',

            submit(vm) {
                vm.items.push({
                    type: 'text',
                    title: '新增字段',
                    key: 'field',
                    value:  '',
                    placeholder: 'placeholder'
                })

                /// 请求渲染配置
                vm.$nextTick(() => {
                    /// 此时vm.$parent是中心舞台vm实例
                    /// 虽然组件配置独立于可视化平台之外，但当组件被实例化到中心舞台之后
                    /// 就可以通过当前vm实例桥接到可视化平台请求组件配置渲染
                    vm.$parent.renderModConfig({
                        name: vm.$attrs.name,
                        uuid: vm.$attrs.uuid
                    })
                })
            }
        },
        {
            /// 配置类型
            type: types.group,

            title: '表单修改测试',
    
            /// 描述
            desc: '表单修改测试',

            uri: 'items',

            /// 这里group内的所有配置 是对一个组件可重复item单位的配置描述
            /// 当前例子是一个表单，表单内会有很多字段，每一个字段都应该是一个可重复的item
            /// 所以，表单内所有的字段都会应用group内的配置
            /// 并不是要在group内配置所有的字段，只需要配置一个通用的即可
            /// 配置中心对当前配置的解析是: 
            /// items.forEach(item => configure.build(item).by(group))
            /// item1 => group
            /// item2 => group
            /// itemN => group
            group: [
                {
                    type: types.text,
                    title: '字段名称',
                    uri: 'title'
                },
                {
                    type: types.text,
                    title: '字段Key',
                    uri: 'key'
                },
                {
                    type: types.text,
                    title: '修改placeholder',
                    uri: 'placeholder'
                }
            ]
        }
    ]
}

export default form
