<template>
  <div class="container">
    <nav class="nav-header">
      <header>
        <a href="/" class="brand">书</a>
        <a href="/" class="avatar"></a>
      </header>
    </nav>
    <!-- <swipe :auto="2000"> -->
      <!-- <swipe-item>
        <img src="http://www.zwdu.com/files/article/image/8/8634/8634s.jpg">
      </swipe-item>
      <swipe-item>
        <img src="http://www.zwdu.com/files/article/image/7/7718/7718s.jpg">
      </swipe-item>
      <swipe-item>
        <img src="http://www.zwdu.com/files/article/image/22/22104/22104s.jpg">
      </swipe-item> -->
<!--       <swipe-item v-for="item in arr">
        <img :src="item.fmimg">
      </swipe-item> -->
   <!--  </swipe> -->
    <p>玄幻</p>
    <ul class="listPanel clearfix" v-show="isLoading">
      <li v-for="item in arr" @click="toLookDetail(item.id)">
        <img :src="item.fmimg">
        <p>{{item.name}}</p>
      </li>
    </ul>
    <p>都市</p>
    <ul class="listPanel clearfix" v-show="isLoading">
      <li v-for="item in arr1" @click="toLookDetail(item.id)">
        <img :src="item.fmimg">
        <p>{{item.name}}</p>
      </li>
    </ul>
    <p>言情</p>
    <ul class="listPanel clearfix" v-show="isLoading">
      <li v-for="item in arr2" @click="toLookDetail(item.id)">
        <img :src="item.fmimg">
        <p>{{item.name}}</p>
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
        console.log(id)
      }
    },
    components: {
      Swipe,
      SwipeItem
    }
  }
</script>

<style lang="less" type="text/less">
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
      .avatar{
        display: inline-block;
        width: 24px;
        height: 24px;
        background: pink;
      }
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
