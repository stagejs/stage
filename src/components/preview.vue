<template lang="pug">
.preview
    component(
        :is="mod.name"
        :key="mod.name"
        :name="mod.name"
        :uuid="mod.uuid"
        :class="mod.className"
        v-for="mod in items"
    )

</template>
<script>
import uid from 'uuid'
import Mod from '../common/mod'
import bus from '../common/bus'
import mods from '../common/mod-loader'

export default {

    data() {
        return {
            items: []
        }
    },

    /// 注册所有组件
    components: mods.components,
    
    mounted() {
        this.bind()
        this.dropable()
    },

    methods: {
        bind() {
            bus.$on('config.build', () => {
                // console.log(this.page.mods)
            })

            $(this.$el).delegate('.lincoapp', 'click', function(){
                bus.$emit('stage.choose', this.getAttribute('name'), this.getAttribute('uuid'))
            })
        },

        /// 为组件注入其申请的能力列表
        regAbility(vm, config) {
            /// todo 能力列表 应从外部引入 待优化
            const ability = {
                sortable(node) {
                    node.sortable()
                },

                deleteable(node) {
                    console.log('deleteable is not ready')
                }
            }

            const target = $(vm.$el)

            /// 解析模块配置
            config.ability && config.ability.length &&
            config.ability.forEach(ab => {
                if (Array.from(Object.keys(ability)).indexOf(ab) >= 0) {
                    ability[ab](target)
                }
            })
        },

        dropable() {
            /// 组件进入舞台时的各种操作
            $(this.$el).droppable({
                accept: ".ui-draggable",
                drop: (event, ui) => {
                    /// 创建组件页面渲染副本UUID 作为操作副本的唯一id
                    const uuid = uid.v4()

                    /// 查询组件name 作为组件识别id
                    const name = ui.draggable.attr('name')

                    /// 从平台获得舞台数据
                    const mod = mods.mods.find(mod => mod.name === name)

                    /// 动态加载组件到中心舞台
                    this.items.push({
                        uuid: uuid,
                        name: name,
                        /// 注入操作需要的类
                        className: 'lincoapp'
                    })

                    


                    /// 查找当前组件的vm实例
                    this.$nextTick(() => {
                        const vm = this.$children.find(vm => uuid === vm.$attrs.uuid)
                        /// 实例信息注入到舞台数据中
                        window.stage.vms.map[uuid] = vm
                        window.stage.vms.list.push({
                            vm: vm,
                            name: name,
                            uuid: uuid,
                        })

                        /// 为组件注入能力列表
                        this.regAbility(vm, mod.config)
                    })
                },
                drops: (event, ui) => {
                    const uuid = uid.v4()
                    /// 查询组件名
                    const name = ui.draggable.attr('name')
                    /// 创建组件文档副本
                    const target = ui.draggable.clone()
                    /// 注入uuid
                    target.attr('uuid', uuid)
                    /// 注入标记类 后续需要删除
                    target.addClass('lincoapp')
                    /// 删除拖动附加的类
                    target.removeClass('ui-draggable ui-draggable-handle')
                    /// 添加副本到舞台
                    $(event.target).append(target)
                }
            })
            .sortable({
                update: (event, ui) => {
                    // mods instance
                    let items = ui.item.parent().find('>')
                    // mods uuid
                    let uuids = Array.from(items).map(item => item.getAttribute('uuid'))


                    /// window.stage.vms.list 进行排序
                    /// 始终保证与舞台上组件顺序相同
                    window.stage.vms.list = uuids.map(uuid => {
                        return window.stage.vms.list.find(mod => mod.uuid === uuid)
                    })
                }
            })
            .disableSelection()
        },

        choose(type) {
            bus.$emit('mods.choose', type)
        }
    }
}
</script>


<style lang="stylus" scoped>
.preview
    width 375px
    height 667px
    background #dddddd
    position absolute 
    left 50%
    top 50%
    margin (-667/2)px 0 0 (-375/2)px
</style>
