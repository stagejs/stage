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
    name: ${data.pageName},
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

    console.log(data)

    return `
        ${html(data.html)}
        ${scripts(data.scripts)}
        ${style(data.style)}
    `
}

function parse() {
    const pageName = 'home'
    
    /// 当前页面所需要的数据
    const myMods = {}

    myMods.components = {}
    // => namse
    myMods.names = mods.mods.map(mod => mod.name)
    // => mods
    myMods.mods = mods.mods.filter(item => {
        return mods.mods.map(mod => mod.name).indexOf(item.name) >= 0
    })
    // => components
    myMods.names.forEach(name => {
        myMods.components[name] = myMods.mods.find(mod => mod.name === name).vm
    })

    /// parse html
    const html = {
        pageName: pageName,
        mods: (() => {
            const dom = document.createElement('div')
            myMods.names.forEach(name => {
                dom.appendChild(
                    document.createElement(name)
                )
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
        components: `{${myMods.names.toString()}}`,
        loadMods: (() => {
            return myMods.names.map(name => {
                return `import ${name} from '${myMods.mods.find(mod => mod.name === name).url}'`
            }).join('\n')
        })()
    }

    return {
        html,
        style,
        scripts
    }
}