<template>
    <div class="read-container">
        <header class="ui-position-fixed clearfix read-header">
            <div @click="backPre" class="read-back-pre ui-float-left">
                <i  class="iconfont icon-arrow-back ui-display-inline-lock"></i>
            </div>
            <div class="ui-display-inline-block">
                <p class="ui-display-inline-block ui-text-center ui-position-absolute ui-position-center ui-position-top-0 read-book-name">{{content.bookName}}</p>
            </div>
            <div class="ui-float-right ui-margin-right-20">
                <router-link to="/">
                    <i class="iconfont icon-home"></i>
                </router-link>
            </div>
        </header>
        <div class="read-content" v-html="content.content">
        </div>
        <div class="control-label">
            <button @click="preOne">上一章</button>
            <button @click="nextOne">下一章</button>
        </div>
        <div class="ui-position-fixed read-position-fixed" @click="backTop">
            <i class="iconfont icon-body-top read-back-top"></i>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'
    export default {
        data () {
            return {
                content: '',
                titles: [],
                chrapatar: this.$route.params.ids,
                id: this.$route.params.id || 1
            }
        },
        created () {
            this.getContents(this.chrapatar)
            this.getTitles()
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
                axios.get(`http://localhost:3334/booktitles`, {params: {id: this.id}}).then(res => {
                    let _info = res.data
                    _info.titles = _info.titles.split('-')
                    this.titles = _info
                    console.log(this.titles)
                })
            },
            backPre() {//返回上一层
                console.log('000000')
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
            }
        }
    }
</script>
<style type="text/css">
    .read-back-pre{
        margin-left: 6px;
    }
    .read-container{
        padding: 10px 6px 30px;
        background: #e8dede;
    }
    .read-header{
        width: 100%;
    }
    .read-book-name{
        z-index: -1;
    }
    .read-content{
        padding-top: 30px;
        text-indent: 2em;
        text-align: justify;
    }
    .read-content span{
        display: inline-block;
        width: 2em;
    }
    .read-position-fixed{
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
    .read-position-fixed:active {
        background-color: #353579;
        border-radius: 50%;
    }
    .read-back-top{
        font-size: 30px;
        color: #b1b6d0;
    }
</style>
