import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/home/Home.vue'


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      children:[
        {
          path: 'articles',
          component: () => import(/* webpackChunkName: "about" */ './views/article/articles.vue')
        },{
          path: 'addArticle',
          component: () => import(/* webpackChunkName: "about" */ './views/addArticle/addArticle.vue')
        },
        {
          path: 'article/:id',
          name: 'Article',
          component: () => import(/* webpackChunkName: "about" */ './views/article/articleDetail.vue')
        },
      ]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/login/login.vue')
    }
  ]
})

