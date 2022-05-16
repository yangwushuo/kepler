import Mock from 'mockjs';

//引入json
import contractInventory from './contractInventory.json';

Mock.mock('/mock/getContractInventory',{code:200, data: contractInventory});

