<template>
  <div class="container">
    <nav class="nav-header">
      <header>
        <a href="/" class="brand">书</a>
        <a href="/" class="avatar">
            <i class="iconfont icon-logout ui-color-fff ui-display-inline-lock ui-float-left ui-font-24"></i>
        </a>
      </header>
    </nav>
    <p>玄幻</p>
    <ul class="listPanel clearfix" v-show="isLoading">
      <li v-for="item in arr" @click="toLookDetail(item.id)">
        <img :src="item.headimg">
        <p>{{item.title}}</p>
      </li>
    </ul>
    <p>都市</p>
    <ul class="listPanel clearfix" v-show="isLoading">
      <li v-for="item in arr1" @click="toLookDetail(item.id)">
        <img :src="item.headimg">
        <p>{{item.title}}</p>
      </li>
    </ul>
    <p>言情</p>
    <ul class="listPanel clearfix" v-show="isLoading">
      <li v-for="item in arr2" @click="toLookDetail(item.id)">
        <img :src="item.headimg">
        <p>{{item.title}}</p>
      </li>
    </ul>
  </div>
</template>

<script>
  import axios from 'axios'
  import { Swipe, SwipeItem } from 'mint-ui'

  export default {
    data () {
      return {
        booklist: [],
        arr: [],
        arr1: [],
        arr2: [],
        isLoading: false
      }
    },
    created () {
      this.getData()
    },
    methods: {
      getData () {
        axios.get(`http://localhost:3334/booklist`).then(res => {
          this.booklist = res.data
          this.limitData()
          this.isLoading = true
        })
      },
      limitData () {
        this.booklist.forEach((item, index) => {
          if (index < 6) {
            this.arr.push(item)
          }
          if (index > 6 && index < 13) {
            this.arr1.push(item)
          }
          if (index > 13 && index < 20) {
            this.arr2.push(item)
          }
        })
      },
      toLookDetail (id) {
        this.$router.push({name: 'Detail', params: {id: id}})
      }
    },
    components: {
      Swipe,
      SwipeItem
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  .container{
    position: relative;
  }
  .nav-header{
    background: #000;
    header {
      display: flex;
      height: 45px;
      padding: 0 15px;
      justify-content: space-between;
      align-items: center;
      font-size: 20px;
      .brand{
        color: #fff;
        display: inline-block;
        width: 100px;
        flex: 3;
        text-align: center;
      }
      .avatar{}
    }
  }
  .mint-swipe{
    height: 200px;
    img{
      width: 150px;
      background-size: cover;
    }
  }
  .listPanel{
    margin-top: 10px;
    width: 100%;
    height: 280px;
    white-space: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    li{
      display: inline-block;
      width: 150px;
      height: 250px;
      padding: 10px;
      img{
        width: 100%;
        height: 90%;
      }
      p{
        text-align: center;
      }
    }
  }
  .clearfix{
    content: '';
    display: block;
    clear: both;
  }
</style>
