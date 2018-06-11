<template lang="pug">
.preview
    component(
        :is="mod.name"
        :key="mod.uuid"
        :name="mod.name"
        :uuid="mod.uuid"
        :class="mod.className"
        v-for="mod in items"
    )

</template>
<script>
import uid from 'uuid'
import bus from '../common/bus'
import Mod from '../class/mod'
import mods from '../loader/mods-loader'
import stage from '../loader/stage-loader'

export default {

    data() {
        return {
            items: []
        }
    },

    /// 注册所有组件 可以考虑只加载当前舞台实例化组件 后续优化点
    components: mods.getComponents(),
    
    mounted() {
        this.bind()
        this.dropable()
    },

    methods: {
        bind() {
            const vm = this

            bus.$on('config.build', () => {
                // console.log(this.page.mods)
            })

            $(this.$el).delegate('.lincoapp', 'click', function(){
                vm.renderModConfig({
                    name: this.getAttribute('name'),
                    uuid: this.getAttribute('uuid')
                })
            })
        },

        renderModConfig({name, uuid}) {
            // 请求配置中心渲染当前组件配置
            bus.$emit('configure.render', {name, uuid})
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

                    /// from Mods-list
                    const mod = mods.getByName(name)

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
                        const pod = Object.assign({}, mod, { vm, uuid })

                        // 可视化组件数据注入到舞台组件列表
                        stage.mods.push(new Mod(pod))

                        /// 为组件注入能力列表
                        this.regAbility(vm, mod.config)

                        /// 渲染组件配置
                        this.renderModConfig({name, uuid})
                    })
                }
            })
            .sortable({
                update: (event, ui) => {
                    // mods instance
                    let items = ui.item.parent().find('>')
                    // mods uuid
                    let uuids = Array.from(items).map(item => item.getAttribute('uuid'))

                    let stageMods = stage.mods.getMods(true)

                    /// 当舞台组件被排序后 对stageMods进行排序 始终保证与舞台上组件顺序相同
                    stageMods = uuids.map(uuid => stage.mods.getById(uuid))
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
