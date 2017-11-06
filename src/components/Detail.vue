<template>
	<div class="detail-container">
        <div class="header clearfix">
            <div class="header-left">
                <img :src="infos.fmimg">
            </div>
            <div class="header-right">
                <p class="name">{{infos.name}}</p>
                <p class="author">{{infos.author}}</p>
                <p class="status">{{infos.status}}</p>
            </div>
        </div>

        <!-- 转义字符不要直接渲染，经由v-html输入到页面 -->
        <p v-html="infos.primary"></p>
        <p>{{infos.latest_time}}</p>
	</div>
</template>

<script>
	import axios from 'axios'
	export default {
      data () {
        return {
          infos: ''
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
              this.infos = _info
            })
        }
      }
	}
</script>
<style lang="less" type="text/less">
    .detail-container{
        padding: 10px;
    }
    .header-left{
        float: left;
     }
    .header-right{
        float: right;
        line-height: 60px;
        text-align: center;
        width: 120px;
        margin-top: 30px;
    }
    .name{
        font-size: 30px;
    }
    .author{
        font-size: 26px;
    }
    .status{
        font-size: 20px;
    }
    .clearfix{
        content: '';
        display: block;
        clear: both;
    }
</style>
