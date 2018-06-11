Config
___

```sh
1、开放组件配置选项
2、开放配置模块，允许写入插件，用来解析新增的组件配置




```

```js
/// 以下代码仅为流程推导，并非实际可使用代码

/// in Global Public
/// 可视化平台所需要的全局数据
/// 1.Mods 存储所有可用组件信息
/// 2.Stage 存储中心舞台所有信息
/// 3.Configure 存储所有配置中心产生的数据
/// 4.stage = { mods: Mods, stage: Stage, configure: Configure }

// 依赖 Mods类创建mods列表
import Mods from 'mods'
import Stage from 'stage'
import Configure from 'configure'

root.mods = new Mods
root.stage = new Stage
root.configure = new Configure

// 中心舞台实例化的组件列表
// 当前组件列表应该是 root.mods的子集
root.stage.mods = new Mods



/// in Configure
/// 组件实例化到中心舞台之后，配置中心可视化配置渲染流程
/// 1.监听组件可视化配置渲染请求
bus.on('configure.render', desc: {name: String, uuid: String} => {
    // 依赖mods-loader
    import mods from 'mods-loader'


    // 查询组件
    const mod = mods.getBy(name)
    // 查询组件配置文件
    const config = mod.config


    /// 2.初始化配置编译器 编译配置
    import ConfigParser from 'configParser'
    const parser = new ConfigParser(config)
    const result = parser.parse()


    /// 3.初始化编辑器
    import Editor from 'editor'
    const editor = new Editor(result)

    /// 4.渲染到配置中心 并缓存编辑器
    this.renderEditor(editor)
})

```