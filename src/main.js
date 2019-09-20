import Vue from 'vue'
import './plugins/axios'
import './plugins/axios/Re-axios'
import App from './App.vue'
import store from './store'
import router from './router'
import './plugins/element.js'
import './utils/filter.js'
import VueCookies from 'vue-cookies'





Vue.config.productionTip = false
Vue.use(VueCookies);
new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')






router.beforeEach((to, from, next) => {

  let isLogin = VueCookies.get('isLogin') === 'true';
  if (isLogin) {
    //如果用户信息存在则往下执行。
    if (to.path === '/login') {
      next(from.path || '/')
    }else{
      next();

    }
  } else {
    //如果用户token不存在则跳转到login页面
    if (to.path === '/login') {
      next()
    } else {
      next('/login')
    }
  }
})

