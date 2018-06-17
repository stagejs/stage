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
import bus from 'common/bus'
import Mod from 'class/mod'
import mods from 'loader/mods-loader'
import stage from 'loader/stage-loader'
import create from 'loader/creater-loader'
import preview from 'config/preview'

export default {

    data() {
        return {
            items: []
        }
    },

    /// 注册所有组件 可以考虑只加载当前舞台实例化组件 后续优化点
    components: mods.getComponents(),

    events: {
        '.lincoapp@click' (vm) {
            vm.renderModConfig({
                name: this.attr('name'),
                uuid: this.attr('uuid')
            })
            this.addClass(preview.className.active)
            this.siblings(preview.className._sign).removeClass(preview.className.active)
        }
    },
    
    mounted() {
        this.dropable()
    },

    methods: {
        renderModConfig({name, uuid}) {
            // 请求配置中心渲染当前组件配置
            bus.$emit('configure.render', {name, uuid})
        },

        // 选中指定的组件
        select(vm) {
            $(vm.$el ? vm.$el : vm).click()
        },

        /// todo 此处待确定
        /// 为组件注入其申请的能力列表
        regAbility(vm, config) {
            /// todo 能力列表 应从外部引入 待优化
            const ability = {
                sortable(node) {
                    // node.sortable()
                },

                deleteable(node) {
                    return /// 待完善 改为在configure实现 实现方式改为面对数据操作
                    const items = node.find('>')

                    items.each((index, item) => {
                        item = $(item).addClass('ap ui-deleteable-handle')

                        const close = create.emmet('div.iclose')
                        const pos = {left: item.width() - 16, top: 0}

                        close.css({
                            position: 'absolute',
                            left: pos.left,
                            top: pos.top,
                            zIndex: 800,
                            width: 16,
                            height: 16,
                            borderRadius: 16
                        })

                        close.click(() => {
                            let index = items.index(item)
                        })

                        item.append(close.hide().attr('title', 'delete'))
                    })

                    items.hover(function() {
                        $(this).find('.iclose').show()
                    }, function() {
                        $(this).find('.iclose').hide()
                    })
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

        // 组件进入舞台时的各种操作
        dropable() {
            $(this.$el).droppable({
                accept: ".ui-draggable",
                drop: (event, ui) => {
                    // 创建组件页面渲染副本UUID 作为操作副本的唯一id
                    const uuid =  'stage-' + uid.v4()

                    // 查询组件name 作为组件识别id
                    const name = ui.draggable.attr('name')

                    // from Mods-list
                    const mod = mods.getByName(name)

                    // 动态加载组件到中心舞台
                    this.items.push({
                        name,
                        uuid,
                        /// 注入操作需要的类
                        className: preview.className.sign
                    })

                    /// 查找当前组件的vm实例
                    this.$nextTick(() => {
                        const vm = this.$children.find(vm => uuid === vm.$attrs.uuid)
                        const pod = Object.assign({}, mod, { vm, uuid })

                        // 可视化组件数据注入到舞台组件列表
                        stage.mods.push(new Mod(pod))

                        /// 为组件注入能力列表
                        this.regAbility(vm, mod.config)

                        /// 选中组件 渲染组件配置
                        this.select(vm)
                    })
                }
            })
            .sortable({
                update: (event, ui) => {
                    // mods instance
                    let items = ui.item.parent().find('>')
                    // mods uuid
                    let uuids = Array.from(items).map(item => item.getAttribute('uuid'))

                    // 获取中心舞台组件列表
                    let stageMods = stage.mods.getMods(true)

                    /// 当舞台组件被排序后 对stageMods进行排序 始终保证与舞台上组件顺序相同
                    stageMods = uuids.map(uuid => stage.mods.getById(uuid))
                }
            })
            .disableSelection()
        },

        // choose(type) {
        //     bus.$emit('mods.choose', type)
        // }
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
