<template lang="pug">
.lincoapp-form
    .form-item
        label 用户名
        input(type="text" v-model="username" placeholder="请输入用户名")
    .form-item
        label 密码
        input(type="password" v-model="password" placeholder="请输入密码")
    .form-control
        button(@click="submit") 提交
</template>
<script>
export default {
    
    data() {
        return {
            username: '',
            password: ''
        }
    },

    methods: {
        submit() {
            console.log(this.username)
            console.log(this.password)
        }
    }
}
</script>
<style lang="stylus">
.lincoapp-form
    width 100%
    background #eee
    padding 20px 16px

    .form-item
        margin-bottom 10px

    input
        border 1px solid #ddd
        padding 10px 6px
        margin-top 4px
        display block
        width 100%
        outline none
        box-sizing border-box

    button
        border 1px solid #ddd
        width 100%
        height 36px
        border-radius 4px
        box-shadow 0 0 0.5 0 rgba(0,0,0,0.1)
        background-color #fff
        margin-top 20px
        outline none
</style>
