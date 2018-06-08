import types from '../../common/types'

const header = {

    editor: [
        {
            /// 配置类型
            type: types.text,
    
            /// 标识符
            title: 'title',
    
            /// 描述
            desc: '这里可以修改title',
    
            /// 设置数据的方法
            set(node, data) {
                node.find('h1').text(data)
            },
    
            /// 获取数据的方法
            get(node) {
                return node.find('h1').text()
            },
            
            data() {
                return {
                    title
                }
            }
        }
    ]
}

export default header
