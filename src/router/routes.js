const Index = () => import('@/views/Index'); //首页
const Login = () => import('@/views/Login'); //登录页面
const Register = () => import('@/views/Register'); //注册界面
const TradAccount = () => import('@/views/TrandAccount'); //交易账户页面
const AddAccount = () => import('@/views/AddAccount'); //添加账户页面
const PersonalCenter = () => import('@/views/PersonalCenter'); //个人中心页面
const AccountInfo = () => import('@/views/AccountInfo'); //个人信息
const TrandAccountInfo = () => import('@/views/TrandAccountInfo'); //交易账户信息

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
  },
  //注册界面
  {
    path: '/reg',
    name: 'reg',
    component: Register,
  },
  //交易账户
  {
    path: '/tradAccount',
    name: 'tradAccount',
    component: TradAccount,
    meta: {
      title: '交易账户',
      isAuth: true
    },
    children: [{
      path: 'add',
      component: AddAccount,
      meta: {
        title: '添加账号',
        isAuth: true
      },
    }]
  },
  //个人中心页面
  {
    path: '/personalCenter',
    name: 'personalCenter',
    component: PersonalCenter,
    redirect: '/personalCenter/info',
    meta: {
      title: '个人中心',
      isAuth: true
    },
    children: [{
      path: 'info',
      component: AccountInfo,
      meta: {
        index: '0',
        title: '个人信息',
        isAuth: true
      },
    }, {
      path: 'trandInfo',
      component: TrandAccountInfo,
      meta: {
        index: '1',
        title: '交易账户信息',
        isAuth: true
      },
    }, ]
  }
]