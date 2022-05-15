const Home = () => import('@/views/Home'); //首页
const Exchange = () => import('@/views/Exchange');  //交易所
const ContractInventory = () => import('@/views/ContractInventory'); //合约持仓量

export default [

  //首页
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  //重定向，在项目跑起来的时候，访问/
  {
    path: '/',
    redirect: '/home'
  },
  //交易所
  {
    path: '/exchangeData',
    name: 'exchangeData',
    component: Exchange,
    children: [
      //默认合约持仓量
      {
        path: '',
        redirect: '/exchangeData/contractInventory',
      },  
      //合约持仓量
      {
        path: 'contractInventory',
        name: 'contractInventory',
        component: ContractInventory,
      },
      //期权持仓量
      {
        path: 'optionsInventory',
        name: 'optionsInventory',
        component: ContractInventory,
      },
    ]
  }, 
]