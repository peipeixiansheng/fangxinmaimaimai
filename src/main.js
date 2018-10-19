// 全局
import Vue from 'vue';

import App from './App.vue';

// 引入axios
import axios from 'axios';
Vue.prototype.$axios = axios;
// axios设置基地址
axios.defaults.baseURL = 'http://111.230.232.110:8899';
axios.defaults.withCredentials = true; //让ajax携带cookie

// 引入moment转换时间
import moment from 'moment';
// 引入二维码
import VueQriously from 'vue-qriously'
Vue.use(VueQriously)

// 引入懒加载
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  // 加载高度
  preLoad: 1.3,
  // 请求失败时图片
  error: 'dist/error.png',
  // 成功时图片
  loading: require('./assets/img/1.gif'),
  // 请求次数
  attempt: 3
})

// 路由相关的
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 引入主页组件
import index from './components/index.vue';

// 引入商品详情的组件
import detail from './components/detail.vue';

// 购物车组件
import shopCart from './components/shopCart.vue';
// 下订单页
import order from './components/order.vue';
// 登录页
import login from './components/login.vue';
// 订单详情
import payOrder from './components/payOrder.vue';
// 支付成功页
import paySuccess from "./components/paySuccess.vue";
// 会员中心
import userInfo from "./components/userInfo.vue";
// 会员中心（个人中心）
import orderInfo from './components/user/orderInfo.vue';
// 会员中心（订单详情）
import orderDetail from "./components/user/orderDetail.vue";
// 会员中心（订单列表）
import orderList from "./components/user/orderList.vue";

// 引入放大镜
import ProductZoomer from 'vue-product-zoomer';
Vue.use(ProductZoomer);

// 引入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
// 实例化一个vuex
const store = new Vuex.Store({
  state: {
    // count: 0
    // 购物车数据
    // 格式是id：购买数量
    // 从本地存储中提取出来数据
    shopCartData: JSON.parse(window.localStorage.getItem('cartData')) || {},
    // 判断是否登录
    isLogin: false
  },
  mutations: {
    // 加入购物车数据
    addCart(state, shop) {
      // console.log(state);
      // console.log(shop);      
      // 判断shopCartData是否有这个id
      if (state.shopCartData[shop.id] == undefined) {
        // 没有就添加这个id：购买数量
        // state.shopCartData[shop.id]=shop.shopNum;
        // vuex数据要同步就要使用Vue.set(obj, 'newProp', 123)方式
        Vue.set(state.shopCartData, shop.id, shop.shopNum)
      } else {
        // 有就在原有的基础上添加数量
        state.shopCartData[shop.id] += shop.shopNum;

      }
    },
    // 购物车数量更改({id:'',newcount:''})
    upCartDated(state, opt) {
      state.shopCartData[opt.id] = opt.newcount
    },
    // 删除购物车商品的更改
    upDelete(state, id) {
      // delete state.shopCartData[id]
      // 用vue.delete来实现数据同步更新
      Vue.delete(state.shopCartData, id)
    },
    // 判断是否登录了没
    chekedLogin(state, newLogin) {
      state.isLogin = newLogin;
    }
  },
  // 计算购物车总数
  getters: {
    cartNum(state) {
      // 声明一个变量来存储商品总数量
      let cartNums = 0;
      // 遍历购物车商品的对象，把数量相加
      for (const key in state.shopCartData) {
        cartNums += state.shopCartData[key]
      }
      return cartNums;
    }
  }
})

// 引入element-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入iview-ui
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);

Vue.config.productionTip = false;

// 写规则
const routes = [{
    path: '/',
    component: index,
    meta: {
      zhName: '主页'
    }
  },
  {
    path: '/index',
    component: index,
    meta: {
      zhName: '主页'
    }
  },
  {
    path: '/detail/:ID',
    component: detail,
    meta: {
      zhName: '商品详情'
    }
  }, {
    path: '/shopCart',
    component: shopCart,
    meta: {
      zhName: '购物车'
    }
  },
  {
    path: '/order/:ids',
    component: order,
    meta: {
      zhName: '订单详情',
      // 判断路由是否要登录
      login:true
    }
  }, {
    path: '/login',
    component: login,
    meta: {
      zhName: '登录'
    }
  }
  , {
    path: '/payOrder/:orderid',
    component: payOrder,
    meta: {
      zhName: '订单详情',
      login:true
    }
  },
   {
    path: '/paySuccess',
    component: paySuccess,
    meta: {
      zhName: '支付成功',
      login:true
    }
  },
  {
    path:'/userInfo',
    component:userInfo,
    meta:{
      zhName:'会员中心',
      login:true
    },
    // 嵌套路由
    children:[{
      path:'',
      component:orderInfo,
      meta:{
        zhName:'个人中心',
        login:true
      }
    },
    {
      path:'orderDetail/:orderid',
      component:orderDetail,
      meta:{
        zhName:'订单详情',
        login:true
      }
    },
    {
      path:'orderList',
      component:orderList,
      meta:{
        zhName:'订单列表',
        login:true
      }
    },
  ]
  },
]
// 实例化路由对象
const router = new VueRouter({
  routes
})
// 导航守卫
router.beforeEach((to, from, next) => {
  // console.log(to);
  window.document.title = to.meta.zhName;
  //   console.log(from);
  // 判断用户是否登录了
  if (to.meta.login==true) {
    axios.get('site/account/islogin').then(res => {
      if (res.data.code == 'nologin') {
        Vue.prototype.$message.error('还没登录呢，先登录哦！');
        // 没有登录，打回登录页
        router.push('/login')
      } else {
        // 登录了就留在本页
        next();
      }
    })
  } else {
    next();
  }
})
// 后置钩子(跳转完成之后)
router.afterEach(() => {
  window.scroll(0, 0);
})

// 全局过滤器(时间)
Vue.filter('addTime', (value, time) => {
  // console.log(value);
  return moment(value).format(time);

})

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