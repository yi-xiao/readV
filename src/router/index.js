import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/Index'
import Detail from '@/components/Detail'
import Read from '@/components/Read'
import Search from '@/components/Search'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'index',
            component: Index
        },
        {
            path: '/detail/:id',
            name: 'Detail',
            component: Detail
        },
        {
            path: '/read/:ids',
            name: 'Read',
            component: Read
        },
        {
            path: '/search',
            name: 'Search',
            component: Search
        },
    ]
})
