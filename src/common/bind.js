/**
 * 
 * @desc Vue.mixin(this) 通用事件处理混入
 * @date 2018-06-14
 * @author gavinning gavinning@qq.com
 *
 * @history
 *    created at 2018-06-14 by gavinning
 *
 */

export default {
    created() {
        const vm = this
        const events = this.$options.events
        $.each(events, (key, value) => {
            const arr = key.split('@')
            const type = arr[1]
            const selecotr = arr[0]
            $(document).on(type, selecotr, function(event) {
                value.call($(this), vm, event)
            })
        })
    }
}