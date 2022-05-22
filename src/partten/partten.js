//交易所侧栏
export const exchangeSideBar = {
  title: "交易所数据",
  oneItems: [
    {
      id: '1-1',
      name: '交易所持仓量',
      twoItems:[
        {
          id: '1-1-1',
          name: '合约持仓量',
          route: '/exchangeData/contractInventory'
        },
        {
          id: '1-1-2',
          name: '期权持仓量',
          route: '/exchangeData/optionsInventory'
        }
      ]
    },
    {
      id: '1-2',
      name: '多空比与爆仓',
      twoItems:[
        {
          id: '1-2-1',
          name: '多空比',
        },
        {
          id: '1-2-2',
          name: '爆仓数据',
        }
      ]
    },
    {
      id: '1-3',
      name: '市场挂单',
      twoItems:[
        {
          id: '1-3-1',
          name: '币本位',
        },
        {
          id: '1-3-2',
          name: 'U永续',
        },
        {
          id: '1-3-3',
          name: '现货',
        },
      ]
    },
    {
      id: '1-4',
      name: '各项数据',
      twoItems:[
        {
          id: '1-4-1',
          name: '交易所余额',
        },
        {
          id: '1-4-2',
          name: '芝加哥期货数据',
        }  
      ]
    }, 
    {
      id: '1-5',
      name: '稳定币流向',
      twoItems:[
        {
          id: '1-5-1',
          name: '五大交易所',
        },
        {
          id: '1-5-2',
          name: 'Biance',
        },
        {
          id: '1-5-3',
          name: 'Coinbase',
        },
        {
          id: '1-5-4',
          name: 'Okex',
        },
        {
          id: '1-5-5',
          name: 'FTX',
        },
        {
          id: '1-5-6',
          name: 'Bitmex',
        },
      ]
    }, 
    {
      id: '1-6',
      name: '稳定币流向',
      twoItems:[
        {
          id: '1-6-1',
          name: '五大交易所',
        },
        {
          id: '1-6-2',
          name: 'Biance',
        },
        {
          id: '1-6-3',
          name: 'Coinbase',
        },
        {
          id: '1-6-4',
          name: 'Okex',
        },
        {
          id: '1-6-5',
          name: 'FTX',
        },
        {
          id: '1-6-6',
          name: 'Bitmex',
        },
      ]
    }, 
    {
      id: '1-7',
      name: '稳定币流向',
      twoItems:[
        {
          id: '1-7-1',
          name: '五大交易所',
        },
        {
          id: '1-7-2',
          name: 'Biance',
        },
        {
          id: '1-7-3',
          name: 'Coinbase',
        },
        {
          id: '1-7-4',
          name: 'Okex',
        },
        {
          id: '1-7-5',
          name: 'FTX',
        },
        {
          id: '1-7-6',
          name: 'Bitmex',
        },
      ]
    }, 
  ]
};

//交易所选择器
export const exchangeSelect = [
  {
    "icon": "iconfont icon-jiaoyisuo",
    "value": "Binance",
    "label": "Binance"
  },
  {
    "icon": "iconfont icon-jiaoyisuo",
    "value": "FTX",
    "label": "FTX"
  },
  {
    "icon": "iconfont icon-jiaoyisuo",
    "value": "Bitget",
    "label": "Bitget"
  },
  {
    "icon": "iconfont icon-jiaoyisuo",
    "value": "Bybit",
    "label": "Bybit"
  },
  {
    "icon": "iconfont icon-jiaoyisuo",
    "value": "Deribit",
    "label": "Deribit"
  },
  {
    "icon": "iconfont icon-jiaoyisuo",
    "value": "Bitfinex",
    "label": "Bitfinex"
  },
  {
    "icon": "iconfont icon-jiaoyisuo",
    "value": "Okex",
    "label": "Okex"
  },
  {
    "icon": "iconfont icon-jiaoyisuo",
    "value": "Bitmex",
    "label": "Bitmex"
  }
]

//币种选择器
export const tokenSelect = [
  {
    "icon": "iconfont icon-jiaoyisuo",
    "value": "BTC",
    "label": "BTC"
  },
  {
    "icon": "iconfont icon-jiaoyisuo",
    "value": "ETH",
    "label": "ETH"
  },
  {
    "icon": "iconfont icon-jiaoyisuo",
    "value": "XRP",
    "label": "XRP"
  },
  {
    "icon": "iconfont icon-jiaoyisuo",
    "value": "SOL",
    "label": "SOL"
  },
  {
    "icon": "iconfont icon-jiaoyisuo",
    "value": "DOT",
    "label": "DOT"
  },
  {
    "icon": "iconfont icon-jiaoyisuo",
    "value": "ADA",
    "label": "ADA"
  },
  {
    "icon": "iconfont icon-jiaoyisuo",
    "value": "UNI",
    "label": "UNI"
  },
  {
    "icon": "iconfont icon-jiaoyisuo",
    "value": "BNB",
    "label": "BNB"
  }
]

//币种颜色
export const tokeneChartsColor = {
  Binance: '#d5ff00',
  FTX: '#00ff40',
  Bitget: '#00ddff',
  Okex : '#00eaff'
}