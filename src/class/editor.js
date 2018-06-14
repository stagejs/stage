/**
 * 
 * @desc Editor
 * @date 2018-06-11
 * @author gavinning gavinning@qq.com
 *
 * @history
 *    created at 2018-06-11 by gavinning
 *
 */

import Config from 'vpm-config'
import types from 'common/types'
import create from 'loader/creater-loader'

export default class Editor {
    constructor({ vm, config }) {
        this.vm = vm
        this.uuid = vm.$attrs.uuid
        this.name = vm.$attrs.name
        this.config = config
    }

    create() {
        return this.config.filter(conf => types[conf.type]).map(conf => {
            return this[`$${conf.type}`](this.vm, conf)
        })
    }

    $text(vm, config) {
        /// FIXME
        // 这里是假设所有字段都存在的情况
        // 后续需要检查可选字段是否存在，做出相应处理
        const wrapper = create.wrapper()
        const title = create.emmet(`label{${config.title}}`)
        const desc = create.desc(config.desc)
        const target = create.emmet('input[type="text"]')

        wrapper.append(title)
        wrapper.append(target)
        wrapper.append(desc)

        const uri = config.uri
        // 为什么要用Config进行包装？
        // 因为uri是一个字符串路径，可能是 'a.b.c'
        // 这时候直接取值会有问题 data['a.b.c']
        // Config包装过后
        // 允许以字符串路径的形式进行取值 data.get('a.b.c')
        // 同时也允许以字符串路径的形式进行赋值 data.set('a.b.c', value)
        const data = new Config(vm.$data)

        // 1.初始化绑定target的值
        target.val(data.get(uri))

        // 2.数据双向绑定
        // data => view.input
        vm.$watch(uri, value => target.val(value))
        // view.input => data
        target.on('input', e => data.set(uri, target.val()))

        return wrapper
    }

    $button(vm, config) {
        const wrapper = create.wrapper()
        const desc = create.desc(config.desc)
        const target = create.emmet('button').text(config.title)

        wrapper.append(target)
        wrapper.append(desc)

        target.click(e => {
            config.submit(vm)
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
        })

        return wrapper
    }

    $group(vm, config) {
        const data = new Config(vm.$data)
        const items = data.get(config.uri)
        const wrapper = create.wrapper()
        const desc = create.desc(config.desc)
        const title = create.title(config.title)

        /// todo 此处为插件处理机制，后续优化中此处代码应被替换
        /// 用于处理一些当前编译器并未支持的能力
        function nodeDemoPlugin(vm, config, data) {
            const node = $(vm.$el)

            node.find('.form-item').each((index, item) => {

                // 细化到每一个item内部去检查
                // 这样才能保障新增字段也会应用此规则
                if ($(item).find('.field-from-plugin').length) {
                    return
                }

                const dataItem = data[index]
                const field = create
                    .emmet('span.field-from-plugin')
                    .text(dataItem.key)
                    .css({
                        color: '#666',
                        fontSize: '12px',
                        marginLeft: '10px'
                    })
                $(item).find('label').after(field)
            })

            /// 监听items|item.key的变化
            /// MARK 插件要十分注意，应避免重复监听的问题
            if (vm.$itemsWatched !== true) {
                vm.$itemsWatched = true
                vm.$watch(
                    function() {
                        return this.items.map(item => item.key)
                    },
                    function(value) {
                        const keys = node.find('.field-from-plugin')
                        value.forEach((key, index) => {
                            const keyElement = keys[index]
                            if (keyElement && keyElement.nodeType === 1) {
                                keys[index].innerText = key
                            }
                        })
                    }
                )
            }
        }
        nodeDemoPlugin(vm, config, items)

        wrapper.append(title)
        wrapper.append(desc)

        // 遍历可重复item的数组
        items.forEach((dataItem, index) => {
            const item = create.group()
            
            if (config.deleteable) {
                const iconDelete = create.emmet('button{删除字段}')

                item.append(iconDelete)

                /// 删除子项
                iconDelete.click(() => {
                    items.splice(index, 1)
                    vm.$parent.renderModConfig({
                        name: vm.$attrs.name,
                        uuid: vm.$attrs.uuid
                    })
                })
            }

            // 对每一个item应用group配置
            config.group.forEach(conf => {
                const cell = create.cell()
                const title = create.cellTitle(conf.title)
                const desc = create.cellDesc(conf.desc)
                const target = create.emmet('input[type="text"]')


                cell.append(title)
                cell.append(target)
                cell.append(desc)

                const citem = new Config(dataItem)

                // 初始化target的值
                // 组装路径
                target.val(citem.get(conf.uri))

                // 数据双向绑定
                // todo 缺少数据获取，后续优化
                target.on('input', e => {
                    let value = target.val()
                    citem.set(conf.uri, value)
                })

                item.append(cell)
            })

            wrapper.append(item)
        })

        return wrapper
    }
}