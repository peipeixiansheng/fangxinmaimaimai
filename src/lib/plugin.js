// 引入vue
import Vue from 'vue';
// 引入axios
import axios from 'axios';
Vue.prototype.$axios = axios;
// axios设置基地址
axios.defaults.baseURL = 'http://111.230.232.110:8899';
axios.defaults.withCredentials = true; //让ajax携带cookie
// 引入二维码
import VueQriously from 'vue-qriously'
Vue.use(VueQriously);

// 引入放大镜
import ProductZoomer from 'vue-product-zoomer';
Vue.use(ProductZoomer);

// 引入懒加载
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  // 加载高度
  preLoad: 1.3,
  // 请求失败时图片
  error: 'dist/error.png',
  // 成功时图片
  loading: require('../assets/img/1.gif'),
  // 请求次数
  attempt: 3
})
// 把axios暴露出去
export default axios;