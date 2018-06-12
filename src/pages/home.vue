<template lang="pug">
.page.page-home(:style="homeStyle")
    //- header.header demo
    section.main
        .mods
            mods
        .stage
            preview
        .configure
            configure
    footer.footer
</template>
<script>
import Mods from 'mods/mods'
import Preview from 'mods/preview'
import Configure from 'mods/configure'

export default {
    data() {
        return {

        }
    },

    components: {
        Mods,
        Preview,
        Configure
    },

    computed: {

        homeStyle() {
            return {
                height: window.innerHeight + 'px'
            }
        }
    }
}
</script>
<style lang="stylus">
.page-home
    background white

    .header
        height 60px
    
    .main
        display flex
        background #ddd
        height 100%

        .stage
            flex 3
            background #fff

            position relative

        .mods
            flex 1
        
        .configure
            flex 1
</style>
