// 构建之前先行创建组件列表 必须，否则可视化平台将读不到最新的组件列表

const path = require('path')
const glob = require('glob')
const fs = require('fs-extra')
const chalk = require('chalk')
const JSONFormat = require('json-format')

const preSid = 'Lincoapp'
const repsURL = path.resolve(__dirname, '../reps')
const configURL = path.resolve(__dirname, '../src')
const target = path.join(configURL, 'config/mods.config.json')

function getMods() {
    const urls = glob.sync('src/*/', { cwd: repsURL })
    const names = urls.map(src => path.basename(src))

    return names.map(name => {
        let dir = path.join(repsURL, 'src', name, 'last')
        let files = glob.sync('src/**.*', { cwd: dir })
        let sid = getSid(name)
        let conf = require(path.join(dir, 'package.json'))

        return {
            dir,
            sid,
            name,
            files,
            main: conf.main,
            version: conf.version,
            config: conf.stageconfig || path.join(dir, 'config.js')
        }
    })
}

function getSid(name) {
    return preSid + name[0].toUpperCase() + name.slice(1)
}

const maps = getMods().map(mod => {
    return {
        $id: mod.name,
        name: mod.sid,
        main: mod.main,
        version: mod.version,
        sid: mod.sid,
        uri: path.join(mod.name, 'last', mod.main),
        config: path.relative(path.join(__dirname, '../reps/src'), mod.config),
        files: mod.files
    }
})

fs.writeFile(target, JSONFormat(maps), err => {
    if (err) {
        throw err
    }
    console.log(chalk.cyan('Mods list updated.'), chalk.gray('target: src/config/mods.config.json'))
})
