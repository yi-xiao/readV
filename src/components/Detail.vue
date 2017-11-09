<template>
    <div>
        <header>
            <div>
                <router-link to="/">
                    <i class="iconfont icon-arrow-back ui-color-fff ui-display-inline-lock ui-float-left"></i>
                </router-link>
            </div>
            <div class="ui-float-right ui-margin-right-20">书架
                <i class="iconfont icon-home"></i>
            </div>
        </header>
        <div class="detail-container">
            <div class="header clearfix">
                <div class="header-left">
                    <img :src="infos.fmimg">
                </div>
                <div class="header-right">
                    <p class="name">{{infos.name}}</p>
                    <p class="author">{{infos.author}}</p>
                    <p class="status">{{infos.status}}</p>
                    <p class="time">{{infos.latest_time}}</p>
                </div>
            </div>
            <div class="read-container">
                <button class="read" @click="readyRead">
                    开始阅读
                </button>
                <button class="all">
                    离线全本
                </button>
            </div>
            <!-- 转义字符不要直接渲染，经由v-html输入到页面 -->
            <p class="primary" v-html="infos.primary"></p>

        </div>
    </div>

</template>

<script>
	import axios from 'axios'
    export default {
        data () {
            return {
                infos: '',
                chrapatar: 1
            }
        },
        created () {
            let id = this.$route.params.id
            this.getData(id)
        },
        methods: {
            getData (id) {
                axios.get(`http://localhost:3334/booklist`, {params: {id: id}}).then(res => {
                    let _info = res.data
                    _info.primary = _info.primary.replace(/\n/g,"<br>")
                    _info.latest_time = _info.latest_time.slice(0,15)
                    this.infos = _info
                })
            },
            readyRead () {
                this.$router.push({name: 'Read', params: {ids: this.$route.params.id}})
            }
        }
    }
</script>
<style lang="less" type="text/less" scoped>
    body{
        font-size: 14px;
    }
    button{
        border: none;
        outline-style: none;
        height: 30px;
        width: 120px;
        margin: 20px 20px 0;
        border-radius: 2px;
        border: 1px solid red;
    }

    /*按钮*/
    .read{
        background: #f44336;
        color: #fff;
    }
    .read:active {
        background-color: #f44000;
    }
    .all{
        background: #fff;
        color: #f44336;
    }

    header{
        position: fixed;
        background-color: #000;
        width: 100%;
        color: #fff;
        height: 40px;
        line-height: 40px;
        padding: 0 10px;
    }

    .header{
        height: 246px;
        padding: 20px 10px 10px;
        color: #fff;
        background: rgba(197, 197, 197, 0.1);
        background-image: url("../assets/images/bg.png");
        background-position: center;
        background-size: cover;
    }
    .detail-container{
        background: #fff;
        padding: 40px 0;
    }
    .header-left{
        float: left;
        img{
            width: 180px;
            height: 240px;
            border: none;
        }
     }
    .header-right{
        float: right;
        line-height: 30px;
        width: 160px;
        margin-top: 80px;
    }
    .name{
        font-size: 16px;
    }
    .author{
        font-size: 14px;
    }
    .status{
        font-size: 14px;
    }
    .time{
        font-size: 14px;
        margin-top: 46px;
    }
    .primary{
        padding: 0 10px;
    }
    .read-container{
        text-align: center;
    }
</style>
