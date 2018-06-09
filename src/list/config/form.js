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

            submit(node) {
                const item = $('<div class="form-item"><label>新增字段</label><input type="text"></div>')
                node.find('.form-control').before(item)
            }
        },
        {
            /// 配置类型
            type: types.button,

            title: '测试',
    
            /// 描述
            desc: '测试',

            submit(node) {
                // const item = $('<div class="form-item"><label>新增字段</label><input type="text"></div>')
                // node.find('.form-control').before(item)
                console.log('test')
            }
        }
    ]
}

export default form
