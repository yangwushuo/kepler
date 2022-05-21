import Mock from 'mockjs';

//引入json
import contractInventory1 from './contractInventory1.json';
import exchangeSelect from './exchangeSelect.json';
import tokenSelect from './tokenSelect.json';


Mock.mock('/mock/getContractInventory/BTC',{code:200, data: contractInventory1});
Mock.mock('/mock/getExchangeSelect',{code:200, data: exchangeSelect});
Mock.mock('/mock/getTokenSelect',{code:200, data: tokenSelect});


