<template>
    <div class="read-container">
        <div class="read-content" v-html="content.content">
        </div>
        <div class="control-label">
            <button @click="nextOne">设置面板</button>
        </div>
        <div class="ui-position-fixed">
            <i class="iconfont icon-body-top"></i>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                content: '',
                chrapatar: this.$route.params.ids
            }
        },
        created () {
            this.getContents(this.chrapatar)
        },
        methods: {
            getContents() {//章节内容
                axios.get(`http://localhost:3334/bookread`, {params: {chrapatar: this.chrapatar}}).then(res => {
                    this.chrapatar++
                    let _info = res.data
                    _info.content = _info.content.replace(/-/g,"<br><span></span>")
                    this.content = _info
                })
            },
            getTitles() {//所有标题

            },
            nextOne() {
                this.getContents();
            }
        }
    }
</script>
<style type="text/less" scope>
    .read-container{
        padding: 10px 6px 30px;
    }
    .read-content{
        text-indent: 2em;
    }
    span{
        display: inline-block;
        width: 2em;
    }
    .ui-position-fixed{
        right: 10px;
        bottom: 10px;
        border: 1px solid #000;
        width: 40px;
        height: 40px;
        border-radius: 50%;
        line-height: 40px;
        background-color: #030331;
        text-align: center;
        cursor: pointer;
    }
    .ui-position-fixed:active {
        background-color: #353579;
        border-radius: 50%;
    }
    .icon-body-top{
        font-size: 30px;
        color: #b1b6d0;
    }
</style>
