import { createRouter, createWebHistory } from 'vue-router';

const Exchange = () =>  import('@/views/Exchange');

const routes = [
    {
        path: '/exchangeData',
        name: 'exchangeData',
        component: Exchange,
        children: [
            
        ]
    },
]

const router = createRouter({
    //history模式：createWebHistory , hash模式：createWebHashHistory
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
