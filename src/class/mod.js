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
    /**
     * 
     * @param {String} name* 组件名，组件id
     * @param {String} uri* 组件资源id
     * @param {Object} option* vue组件的option
     * @param {Object} config* 组件可视化配置 为空则不提供任何可视化配置
     * @param {String} uuid 组件实例唯一id 仅中心舞台需要
     * @param {Vue} vm 组件Vue实例 仅中心舞台需要
     */
    constructor({vm, name, uuid, uri, option, config}) {
        this.vm = vm
        this.uri = uri
        this.name = name
        this.uuid = uuid
        this.option = option
        this.config = config
    }
}