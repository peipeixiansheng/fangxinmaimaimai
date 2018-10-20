
import Vue from 'vue';
// 引入element-ui
// import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// Vue.use(ElementUI);
// 按需引入element-ui
import {  Carousel,
    CarouselItem,
    InputNumber,
    Switch,
    Input,
    Form,
  FormItem,
  Radio,
  Message,
  MessageBox,
  Pagination,
 } from 'element-ui';
 Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(InputNumber);
Vue.use(Switch);
Vue.use(Form);
Vue.use(FormItem);
Vue.use(Input); 
Vue.use(Radio); 
Vue.use(Pagination,); 
Vue.prototype.$message = Message;
Vue.prototype.$confirm = MessageBox.confirm;
// 引入iview-ui
import iView from 'iview';
import 'iview/dist/styles/iview.css';
Vue.use(iView);
Vue.config.productionTip = false;