import { createApp } from 'vue'
import App from './App.vue'

//主题颜色加载 默认暗色主题
import { addColor } from '@/theme/addColor';
addColor(true)

//字体引入
import '@/assets/font/font.css';
import "@fontsource/bebas-neue";
import "font-awesome-animation/css/font-awesome-animation.min.css";
//引入icon
import '@/assets/icon/iconfont.css';
import 'material-symbols';
// //使用mock伪装服务
// import '@/mock/mockServe';
//引入loading
import '@/assets/css/loading.css';
//按钮css
import '@/assets/css/buttons.css';
import '@/assets/css/buttons1.css';
import '@/assets/css/bttn.min.css';


const app = createApp(App); 

import * as ElIcons from "@element-plus/icons-vue";
for (const iconName in ElIcons) {
  app.component(iconName, ElIcons[iconName]);
}

//注册插件
//使用element
import ElementPlus from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn'
app.use(ElementPlus, {
  locale: zhCn,
})
//路由使用
import router from './router'
app.use(router);
//注册组件
import CScrollbar from 'c-scrollbar'; //滚动条
app.use(CScrollbar);

//创建校验规则
import Schema from 'async-validator';
import {regular} from '@/utils/index'
const descriptor = {
  name: [
    {pattern: regular.cnEnSpace2to100, message: regular.cnEnSpace2to100Msg, trigger: 'blur'}
  ],
  mobile: [
    {pattern: regular.mobile, message: '请输入正确的手机号码', trigger: 'blur'}
  ],
  telephone: [
    {pattern: regular.telephone, message: regular.telephoneMsg, trigger: 'blur'}
  ],
  email: [
    {type: 'email', message: '请输入正确的邮箱', trigger: 'blur'}
  ],
  idcard: [
    {pattern: regular.IDNumber, message: '请输入正确的证件号码', trigger: 'blur'}
  ],
  bankCard: [ 
    {pattern: regular.bankCard, message: '请输入正确的银行卡号码', trigger: 'blur'}
   ]
};
const validator = new Schema(descriptor);
app.provide('validator',validator);

//使用vuex
import store from '@/store';
app.use(store);

import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'
app.use(FloatingVue)

import VuePluload from 'vue-plupload'
app.use(VuePluload);

app.mount('#app');

