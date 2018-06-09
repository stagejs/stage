<template lang="pug">
.configures
    a.btn(@click="build") 创建

    .editor

</template>
<script>
import bus from '../common/bus'
import template from '../w/template'
import ConfigParser from '../common/config-parser'

export default {

    created() {
        this.bind()
    },
    
    methods: {
        bind() {
            bus.$on('stage.choose', (name, uuid) => {
                const mod = mods.mods.find(mod => mod.name === name)
                const parser = new ConfigParser({
                    vm: mod.vm,
                    clone: $(mod.cloneMap[uuid]),
                    config: mod.config.editor
                })
                const doms = parser.parse()
                $(this.$el).find('.editor').html(doms || '')
            })

            bus.$on('stage.choose', (name, uuid) => {
                // const mod = mods.mods.find(mod => mod.name === name)
                // const parser = new ConfigParser({
                //     vm: mod.vm,
                //     clone: $(mod.cloneMap[uuid]),
                //     config: mod.config.editor
                // })
                // const doms = parser.parse()

                const vm = window.vm = window.stage.vms.list[0].vm
                const input = $('<input type="text">')

                $(this.$el).find('.editor').append(input)

                input.val(vm.title)

                /// 监听数据的变化
                vm.$watch('title', function(value) {
                    input.val(value)
                })

                input.on('input', e => {
                    vm.title = input.val()
                })
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
<style lang="stylus" scoped>
.configures
    width 100%
    height 100%

    label
        display block

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
    
</style>
