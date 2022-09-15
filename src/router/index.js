import store from '@/store';
import {
    statusCode
} from '@/utils';
import {
    createRouter,
    createWebHistory
} from 'vue-router';


//引入routes.js路由配置
import routes from './routes';
const router = createRouter({
    //history模式：createWebHistory , hash模式：createWebHashHistory
    history: createWebHistory(process.env.BASE_URL),
    routes
})

//白名单
const whiteList = [
    '/index',
    '/login',
    '/reg'
]


router.beforeEach((to, from, next) => {
    var token = localStorage.getItem('qp-token'); //获取本地token
    var isAuth = to.meta.isAuth; //获取路由是否需要权限
    var userId = store.state.userInfoStore.userInfo.id; //获取用户id
    //判断本地是否含有token如果没有token则只限于访问白名单中路由
    if (!token) {
        //如果前往登录页面直接放行
        if (whiteList.indexOf(to.path) != -1) {
            next();
        } else {
            //如果不是前往登录页面，辅助跳转登录页面
            router.push(`/login?redirect=${to.path}`);
        }
    } else {
        if (whiteList.indexOf(to.path) != -1) {
            next();
        } else {
            if (userId) {
                next();
            } else if (isAuth) {
                //同步获取用户信息
                a(to, next);
            }
        }
    }
});

async function a(to, next) {
    store.dispatch('userInfoStore/getUserInfo')
        .then((res) => {
            next();
        })
        .catch((err) => {
            router.push(`/login?redirect=${to.path}`);
        })
}



export default router