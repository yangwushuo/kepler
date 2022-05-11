import { createApp } from 'vue'
import App from './App.vue'

//主题颜色加载 默认暗色主题
import { addColor } from '@/theme/addColor';
addColor(true)

//字体引入
import '@/assets/font/font.css';

//使用element
import {ElButton} from 'element-plus';
import 'element-plus/theme-chalk/index.css';

const app = createApp(App);

//注册插件
app.use(ElButton);
//注册组件

app.mount('#app');

