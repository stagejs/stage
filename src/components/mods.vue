<template lang="pug">
.mods
    nav.tab
        li(v-for="item in tabs" @click="tab(item.name)" :class="{active: item.active}") {{ item.name }}
    .list(ref="list" v-if="tabs[0].active")
        lincoapp-header(name="lincoapp-header")
        lincoapp-form(name="lincoapp-form")
        lincoapp-footer(name="lincoapp-footer")
    .resources(ref="res" v-if="tabs[1].active")
        img(src="../assets/bg.png")
        img(src="../assets/bg2.png")
</template>
<script>
import mods from '../common/mod-loader'

export default {

    data() {
        return {
            tabs: [
                {
                    name: '组件',
                    active: true
                },
                {
                    name: '资源',
                    active: false
                }
            ]
        }
    },
    
    components: mods.components,

    mounted() {
        this.dragableMods()
    },

    methods: {
        tab(name) {
            this.tabs = this.tabs.map(tab => {
                tab.active = tab.name === name
                return tab
            })
            this.$nextTick(() => {
                this.dragableRes()
                this.dragableMods()
            })
        },

        dragableRes() {
            $(this.$refs.res).find('img').draggable({
                appendTo: ".ui-droppable",
                // 处理拖拽区域
                containment: "body",
                // 是否出现滚动条
                scroll: false,
                helper: "clone"
            })
        },

        dragableMods() {
            this.$children.forEach(vm => {
                $(vm.$el).draggable({
                    appendTo: ".ui-droppable",
                    // 处理拖拽区域
                    containment: "body",
                    // 是否出现滚动条
                    scroll: false,
                    helper: "clone"
                })

                /// 更新可视化平台全局配置数据
                const name = vm.$el.getAttribute('name')
                const mod = mods.mods.find(mod => mod.name === name)
                mod.vm = vm
            })
        }
    }
}
</script>
<style scoped lang="stylus">
nav, li
    list-style none

nav
    width 100%
    display flex

    li
        flex 1
        height 30px
        line-height 30px
        text-align center
        background #fff
        cursor pointer

    .active
        color #157ae0
</style>
