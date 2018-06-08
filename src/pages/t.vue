<template lang="pug">
.page.page-${pageName}
</template>
<script>
${loadMods}

export default {

    name: ${pageName},
    
    data() {
        return ${data}
    },

    components: ${components}
}
</script>
<style lang="stylus">
${style}
</style>
