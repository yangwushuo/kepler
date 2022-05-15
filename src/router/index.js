import { createRouter, createWebHistory } from 'vue-router';

//引入routes.js路由配置
import routes from './routes';
const router = createRouter({
    //history模式：createWebHistory , hash模式：createWebHashHistory
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
