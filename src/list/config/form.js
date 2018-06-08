import types from '../../common/types'

const form = {

    ability: ['sortable', 'deleteable'],

    editor: [
        {
            /// 配置类型
            type: types.button,

            title: '新增字段',
    
            /// 描述
            desc: '这里可以修改title',

            submit(node) {
                const item = $('<div class="form-item"><input type="text"></div>')
                node.find('.form-control').before(item)
            }
        }
    ]
}

export default form
