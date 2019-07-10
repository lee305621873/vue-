import Vue from 'vue'
import Router from 'vue-router'
import loginvue from '../components/loginvue/login.vue'
import slogin from '../components/system_login/s_login.vue'
import add from '../components/system_login/insert/add.vue'
import updata from '../components/system_login/updata/updata.vue'
import show from '../components/system_login/show/show.vue'
import emlogin from '../components/emlogin/emlogin.vue'
Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'loginvue',
    component: loginvue
  },
  {
    path: '/slogin',
    name: 'slogin',
    component: slogin,
    children: [{
      path: '/slogin/insert',
      name: 'insert',
      component: add},
    {
      path: '/slogin/updata',
      name: 'updata',
      component: updata
    },
    { path: '/slogin/show',
      name: 'show',
      component: show
    },
    {
      path: '/slogin',
      redirect: '/slogin/show'
    }]
  },
  {
    path: '/emlogin',
    name: '/emlogin',
    component: emlogin
  }]
})
