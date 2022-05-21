import { createApp } from 'vue'
import App from './App.vue'

//主题颜色加载 默认暗色主题
import { addColor } from '@/theme/addColor';
addColor(true)

//字体引入
import '@/assets/font/font.css';
//引入icon
import '@/assets/icon/iconfont.css';
//使用mock伪装服务
import '@/mock/mockServe';

const app = createApp(App); 

//注册插件
//使用element
import ElementPlus  from 'element-plus';
import 'element-plus/theme-chalk/index.css';
import zhCn from 'element-plus/es/locale/lang/zh-cn';//ElementPlus 组件内部默认使用英语，使用中文语言
app.use(ElementPlus,{
  zhCn
});

//路由使用
import router from './router'
app.use(router);
//注册组件
import CScrollbar from 'c-scrollbar'; //滚动条
app.use(CScrollbar);
//使用vuex
import store from '@/store';
app.use(store);

app.mount('#app');

