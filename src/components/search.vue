<template>
  <div class="container">
    <mt-search v-model="changeValue"
               cancel-text="取消"
               placeholder="搜索书名"
    >
        <mt-cell
            v-for="item in booklist"
            :title="item.title"
            :value="item.value"
            @click.native="toLookDetail(item.id)">
        </mt-cell>
        <p class="search-empty" v-show="empty">没有搜索结果</p>
    </mt-search>
  </div>
</template>

<script>
  import axios from 'axios'
  import { Indicator,Toast } from 'mint-ui';

  export default {
    data () {
      return {
        booklist: [],
        changeValue: '',
        empty: false
      }
    },
    created () {
      
    },
    methods: {
      getData (val) {
        axios.get(`${this.commen.api}/search`,{params: {keyWord: val}}).then(res => {
            Indicator.close();
            if(res.data.code == 404){
                this.empty = true
                Toast({
                  message: '暂无结果',
                  iconClass: 'icon icon-success'
                });
                this.booklist = []
            }else{
                this.empty = false
                this.booklist = res.data
            }
        })
      },
      toLookDetail (id) {
        this.$router.push({name: 'Detail', params: {id: id}})
      }
    },
    components: {},
    watch: {
        changeValue (curVal,oldVal) {
            if(curVal){
                Indicator.open({
                text: '加载中...',
                  spinnerType: 'fading-circle'
                });
                this.getData(curVal)
            }else{
                Indicator.close();
            }
            
        }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
    .search-empty{
        font-size: 20px;
        width: 100%;
        height: 100%;
        text-align: center;
        margin-top: 60px;
    }
</style>
