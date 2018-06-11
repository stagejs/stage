<template lang="pug">
.configures
    .ctrl
        a.btn(@click="build") 创建
    .editor

</template>
<script>
import bus from '../common/bus'
import template from '../w/template'
import ConfigParser from '../class/config-parser'
import Editor from '../class/editor'
import stage from '../loader/stage-loader'

export default {

    created() {
        this.bind()
    },
    
    methods: {
        bind() {
            /// 监听渲染事件请求
            bus.$on('configure.render', ({name, uuid}) => {
                const mod = stage.mods.getById(uuid)
                const parser = new ConfigParser(mod.config.editor)
                const config = parser.parse()
                const editor = new Editor({ vm: mod.vm, config })
                $(this.$el).find('.editor').html(editor.create() || '')
            })
        },

        build() {
            bus.$emit('config.build')
            this.createTemplate() 
        },

        createTemplate() {
            const tmp = template()
            console.log(tmp)
        },

        render() {
  
        }
    }
}
</script>
<style lang="stylus">
.configures
    width 100%
    height 100%

    label
        display block

    .ctrl
        border-bottom 1px solid #bbb

    .editor
        width 100%

    .btn
        display block
        margin 20px
        background #fff
        padding 8px 0
        text-align center
        font-size 14px
        appearance none
        border none 
        outline none
        border-radius 4px
        cursor default

    .config-item
        padding 12px 12px
        border-bottom 1px solid #bbb
        border-top 1px solid #fff

        &:last-child
            border-bottom none

    .config-title
        font-size 16px

    .config-desc
        font-size 12px
        color #666
    
    .config-group
        margin-top 16px

    .config-cell
        margin-bottom 6px

    .cell-title
        font-size 14px

    .cell-desc
        font-size 12px
        color #999
</style>
