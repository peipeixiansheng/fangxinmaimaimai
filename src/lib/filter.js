import Vue from 'vue';
// 引入moment转换时间
import moment from 'moment';
// 全局过滤器(时间)
Vue.filter('addTime', (value, time) => {
    // console.log(value);
    return moment(value).format(time);
  
  })