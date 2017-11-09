import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Detail from '@/components/Detail'
import Read from '@/components/Read'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Hello',
            component: HelloWorld
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
        }
    ]
})
