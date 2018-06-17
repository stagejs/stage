/**
 * 
 * @desc 描述一个可视化组件
 * @date 2018-06-11
 * @author gavinning gavinning@qq.com
 *
 * @history
 *    created at 2018-06-11 by gavinning
 *
 */

export default class Mod {
    constructor({$id, name, main, version, sid, uri, files, vm, uuid, option, config}) {
        this.$id = $id              // 组件真名 组件唯一id 非数据库id [For Stage]
        this.name = name            // 组件名，组件id，[For Vue]
        this.main = main            // 组件入口文件
        this.version = version      // 组件版本号
        this.sid = sid              // 组件sid 加载模块时的key 防止与HTML tag重复
        this.uri = uri              // 组件资源路径 用于 webpack require
        this.files = files          // 组件内所有资源uri
        this.vm = vm                // 组件在可视化平台vm实例
        this.uuid = uuid            // 组件在可视化平台实例id
        this.option = option        // 组件对象 = require(uri)
        this.config = config        // 组件可视化配置
    }
}
