<template lang="pug">
.preview

</template>
<script>
import uid from 'uuid'
import Mod from '../common/mod'
import bus from '../common/bus'

export default {

    data() {
        return {
            page: {
                name: 'demo',
                mods: []
            }
        }
    },
    
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

        dropable() {
            /// 组件进入舞台时的各种操作
            $(this.$el).droppable({
                accept: ".ui-draggable",
                drop: (event, ui) => {
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

                    
                    /// 从平台获得舞台数据
                    const mod = mods.mods.find(mod => mod.name === name)
                    const config = mod.config


                    /// todo 能力列表 应从外部引入 待优化
                    const ability = {
                        sortable(node) {
                            node.sortable()
                        },

                        deleteable(node) {
                            console.log('deleteable', name, uuid)
                        }
                    }


                    /// 解析模块配置
                    config.ability && config.ability.length &&
                    config.ability.forEach(ab => {
                        if (Array.from(Object.keys(ability)).indexOf(ab) >= 0) {
                            ability[ab](target)
                        }
                    })



                    /// 存储舞台数据
                    /// 更新可视化平台全局配置数据
                    /// 存储组件副本
                    mod.cloneMap[uuid] = target

                    /// 存储舞台组件数据
                    // d => this.page.mods
                    this.parseMods(name, uuid)
                }
            })
            .sortable({
                update: (event, ui) => {
                    // mods instance
                    let items = ui.item.parent().find('>')
                    // mods uuid
                    let uuids = Array.from(items).map(item => item.getAttribute('uuid'))
                    // 排序 mods
                    this.page.mods = uuids.map(uuid => {
                        return this.page.mods.find(mod => mod.uuid === uuid)
                    })

                    /// todo
                    /// 临时测试使用 后续需优化
                    /// 更新舞台组件数据到全局数据队列
                    window.mods.page = this.page.mods
                }
            })
            .disableSelection()
        },

        choose(type) {
            bus.$emit('mods.choose', type)
        },

        parseMods(name, uuid) {
            this.page.mods.push({
                name: name,
                uuid: uuid
            })
            window.mods.page = this.page.mods
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
