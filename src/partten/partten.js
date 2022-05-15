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
  ]
};