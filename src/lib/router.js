import Vue from 'vue';
import axios from './plugin';

// 路由相关的
import VueRouter from 'vue-router';
Vue.use(VueRouter);

// 路由懒加载
// 引入主页组件
const index = () => import('../components/index.vue');
// 引入商品详情的组件
const detail=()=>import('../components/detail.vue');
// 购物车组件
// import shopCart from '../components/shopCart.vue';
const shopCart=()=>import('../components/shopCart.vue');
// 下订单页
// import order from '../components/order.vue';
const order=()=>import('../components/order.vue');
// 登录页
// import login from '../components/login.vue';
const login=()=>import('../components/login.vue');
// 订单详情
// import payOrder from '../components/payOrder.vue';
const payOrder=()=>import('../components/payOrder.vue');
// 支付成功页
// import paySuccess from "../components/paySuccess.vue";
const paySuccess=()=>import('../components/paySuccess.vue');
// 会员中心
// import userInfo from "../components/userInfo.vue";
const userInfo=()=>import('../components/userInfo.vue');
// 会员中心（个人中心）
// import orderInfo from '../components/user/orderInfo.vue';
const orderInfo=()=>import('../components/user/orderInfo.vue');
// 会员中心（订单详情）
// import orderDetail from "../components/user/orderDetail.vue";
const orderDetail=()=>import('../components/user/orderDetail.vue');
// 会员中心（订单列表）
// import orderList from "../components/user/orderList.vue";
const orderList=()=>import('../components/user/orderList.vue');

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
});
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
  });
//   把router暴露出去
export default router;