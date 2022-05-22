import Mock from 'mockjs';

//引入json
import contractInventory1 from './contractInventory1.json';

Mock.mock('/mock/getContractInventory/BTC',{code:200, data: contractInventory1});



