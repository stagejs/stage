/**
 * 
 * @desc 页面VUE模板
 * @date 2018-06-17
 * @author gavinning gavinning@qq.com
 *
 * @history
 *    created at 2018-06-17 by gavinning
 *
 */

import stage from 'loader/stage-loader'

function html(data) {
    return `
<template lang="html">
    <div class="page page-${data.pageName}">
        ${data.mods}
    </div>
</template>
    `
}

function scripts(data) {
    return `
<script>
${data.loadMods}

export default {
    name: '${data.pageName}',
    data() {
        return ${data.data}
    },
    components: ${data.components}
}
</script>
    `
}

function style(data) {
    return `
<style lang="stylus">
${data.style}
</style>
    `
}

export default function() {
    let data = parse()
    return `
        ${html(data.html)}
        ${scripts(data.scripts)}
        ${style(data.style)}
    `
}

function parse() {
    const pageName = 'App'
    const mods = stage.mods.getMods()
    const uuids = mods.map(mod => mod.uuid.replace(/-/g, ''))

    /// parse html
    const html = {
        pageName: pageName,
        mods: (() => {
            const dom = document.createElement('div')
            mods.forEach(mod => {
                dom.appendChild(document.createElement(mod.uuid.replace(/-/g, '')))
            })
            return dom.innerHTML
        })()
    }

    const style = {
        style: ''
    }

    const scripts = {
        pageName: pageName,
        data: JSON.stringify({}),
        components: `{${uuids.join(',\n')}}`,
        loadMods: (() => {
            return mods.map(mod => {
                return `import ${mod.uuid.replace(/-/g, '')} from './${[mod.$id, mod.uuid].join('-')}/${mod.main}'`
            }).join('\n')
        })()
    }

    return {
        html,
        style,
        scripts
    }
}