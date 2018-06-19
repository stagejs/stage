<template lang="pug">
.configures
    .ctrl
        a.btn(@click="build") 创建
    .editor

</template>
<script>
import uid from 'uuid'
import bus from 'common/bus'
import ConfigParser from 'class/config-parser'
import stage from 'loader/stage-loader'
import configure from 'loader/configure-loader'
import appTemplate from '../templates/app.js'
import mainTemplate from '../templates/main.js'

export default {

    created() {
        this.bind()
    },
    
    methods: {
        bind() {
            /// 监听渲染事件请求
            bus.$on('configure.render', ({name, uuid}) => {
                const mod = stage.mods.getById(uuid)
                const editor = configure.editors.get(mod)
                $(this.$el).find('.editor').html(editor.create() || '')
            })
        },

        // 构建
        build() {
            bus.$emit('configure.build')
            this.publish()
            // console.log(this.createApp())
            // console.log(this.createMain())
        },

        // create app.vue
        createApp() {
            return appTemplate()
        },

        // create main.js
        createMain() {
            return mainTemplate()
        },

        // 发布服务器，请求构建
        publish() {
            console.group('构建：')
            console.log('发起构建请求')
            console.log('等待构建响应...')
            const data = this.parse()
            // console.log(data)
            $.post('http://stage.com/api/v1/stage/project', data, (data, message, xhr) => {
                console.log('code:', data.code)
                console.log('message:', data.message)
                console.groupEnd()
            })
        },

        // 格式化服务器所需数据格式
        parse() {
            return {
                project: 'demo',
                version: '1.0.0',
                id: 0,
                hash: uid.v4(),
                createdAt: Date.now(),
                updatedAt: Date.now(),
                
                // 可视化平台相关信息
                stage: {
                    version: '1.0.0'
                },

                // 需要的编辑器信息
                compiler: {
                    version: '1.0.0',
                    config: 'default'
                },

                // 可视化平台需要构建的组件信息
                mods: stage.mods.getMods().map(mod => {
                    return {
                        name: mod.$id,
                        main: mod.main,
                        uuid: mod.uuid,
                        version: mod.version,
                        sid: mod.sid,
                        files: mod.files.slice(0),
                        stage: {} // 组件可视化开发跟踪
                    }
                }),

                // 可视化平台创建的文件
                files: [
                    {
                        url: 'app.vue',
                        content: encodeURIComponent(this.createApp())
                    },
                    {
                        url: 'main.js',
                        content: encodeURIComponent(this.createMain())
                    }
                ]
            }
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
