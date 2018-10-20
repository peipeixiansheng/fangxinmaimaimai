import Vue from 'vue';
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
export default store;