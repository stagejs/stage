/**
 * 
 * @desc main.js模板
 * @date 2018-06-17
 * @author gavinning gavinning@qq.com
 *
 * @history
 *    created at 2018-06-17 by gavinning
 *
 */

export default function createMainTemplate() {
    return `
        import Vue from 'vue'
        import App from './app.vue'
        // import './assets/css/reset.css'

        Vue.config.productionTip = false

        new Vue({
            el: '#app',
            components: { App },
            template: '<App/>'
        })
    `
}