const Index = () => import('@/views/Index'); //首页
const Login = () => import('@/views/Login'); //登录页面
const Register = () => import('@/views/Register'); //注册界面
const TradAccount = () => import('@/views/TrandAccount') //交易账户页面

export default [

  //首页
  {
    path: '/index',
    name: 'index',
    component: Index
  },
  //重定向，在项目跑起来的时候，访问/
  {
    path: '/',
    redirect: '/index'
  },
  //登录界面
  {
    path: '/login',
    name: 'login',
    component: Login,
    children: [
    
    ]
  },
  //注册界面
  {
    path: '/reg',
    name: 'reg',
    component: Register,
    children: [
    
    ]
  },  
  //交易账户
  {
    path: '/tradAccount',
    name: 'tradAccount',
    component: TradAccount,
  }
]