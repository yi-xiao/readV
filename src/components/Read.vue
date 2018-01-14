<template>
    <div class="read-container">
        <header class="ui-position-fixed clearfix read-header">
            <div @click="backPre" class="read-back-pre ui-float-left">
                <i  class="iconfont icon-arrow-back ui-display-inline-lock"></i>
            </div>
            <div class="ui-display-inline-block">
                <p class="ui-display-inline-block ui-text-center ui-position-absolute ui-position-center ui-position-top-0 read-book-name">{{content.title}}</p>
            </div>
            <div class="ui-float-right ui-margin-right-6">
                <router-link to="/">
                    <i class="iconfont icon-home"></i>
                </router-link>
            </div>
        </header>
        <div class="read-content" v-html="content.content">
        </div>
        <div class="read-control-label">
            <mt-button type="default" @click.native="preOne">上一章</mt-button>
            <mt-button type="default" @click.native="nextOne">下一章</mt-button>
        </div>
        <div class="ui-position-fixed read-position-fixed">
            <i class="iconfont icon-body-top read-back-top read-fast-btn" @click="backTop"></i>
            <i class="iconfont icon-to-bottom read-to-bottom read-fast-btn " @click="toBottom"></i>
        </div>
        
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                content: '',
                title: '',
                chrapatar: this.$route.params.ids,
                id: this.$route.params.id || 1
            }
        },
        created () {
            this.getContents(this.chrapatar)
            // this.getTitles()
        },
        methods: {
            getContents() {//章节内容
                axios.get(`${this.commen.api}/bookread`, {params: {chrapatar: this.chrapatar, book_id: this.id }}).then(res => {
                    if(res.data){
                        this.chrapatar++
                        let _info = res.data
                        _info.content = _info.content.replace(/-/g,"<br><span></span>")
                        this.content = _info
                    }else{
                        this.content = {
                            title: '未完待续',
                            content: '别再翻了，没有更多内容了。。。'
                        }
                    }
                })
            },
            getTitles() {//所有标题
                axios.get(`${this.commen.api}/booktitles`, {params: {id: this.id}}).then(res => {
                    let _info = res.data
                    _info.titles = _info.contents
                    this.titles = _info
                    console.log(_info)
                })
            },
            backPre() {//返回上一层
                this.$router.go(-1)
            },
            preOne() {
                if(this.chrapatar>2){
                    this.chrapatar-=2
                    this.getContents()
                    this.backTop()
                }else{

                }
            },
            nextOne() {
                this.getContents()
                this.backTop()
            },
            backTop() {
                document.documentElement.scrollTop = document.body.scrollTop = 0
            },
            toBottom() {
                document.documentElement.scrollTop = document.body.scrollHeight
            }
        }
    }
</script>
<style type="text/css">
    .read-back-pr{
        margin-left: 6px;
    }
    .ui-margin-right-6{
        margin-right: 6px;
    }
    .read-container{
        background: #e8dede;
    }
    .read-header{
        width: 100%;
        height: 30px;
        line-height: 30px;
        background: #e8dede;
    }
    .read-book-name{
        z-index: -1;
    }
    .read-content{
        padding: 30px 6px 30px;
        text-indent: 2em;
        text-align: justify;
    }
    .read-content span{
        display: inline-block;
        width: 2em;
    }
    .read-position-fixed{
        right: 10px;
        top: 40%;
        width: 40px;
        height: 90px;
        text-align: center;
        cursor: pointer;
    }
    .read-fast-btn{
        font-size: 30px;
        color: #b1b6d0;
        width: 40px;
        height: 40px;
        line-height: 40px;
        display: block;
        border-radius: 50%;
        border: 1px solid rgba(255,255,255,.5);
        background: rgba(255,255,255,.5);
    }
    .read-back-top{
        
    }
    .read-to-bottom{
        margin-top: 10px;
    }
    .read-control-label{
        text-align: center;
        height: 100px;
        line-height: 100px;
    }
</style>
