// 全局
import Vue from 'vue';
import App from './App.vue';

// 引入第三方插件
import axios from './lib/plugin';

// 引入router
import router from './lib/router';

// 引入全局过滤器
import  './lib/filter';

// 引入store
import store from './lib/store';

// 引入ui
import  './lib/ui';

new Vue({
  render: h => h(App),
  // 挂在vue实例上
  router,
  // 把vuex挂载到vue实例上
  store,
  // 页面打开时或者刷新时就判断是否登录
  created() {
    axios.get('site/account/islogin').then(res => {
      // console.log(res);
      if (res.data.code == 'logined') {
        // 说明登录了
        store.commit('chekedLogin', true);
        // console.log(store.state.isLogin);
      } else {
        store.commit('chekedLogin', false)
      }
    });
  },
}).$mount('#app')

//页码加载或者刷新是就把购物车数据保存到本地存储
window.onbeforeunload = () => {
  window.localStorage.setItem('cartData', JSON.stringify(store.state.shopCartData))
}