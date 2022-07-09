import {
  getArray,
  getBoolean,
  getNumber,
  getObject,
  getString,
} from '../index';

process.env.NUMBER_KEY1 = '1342';
process.env.STRING_KEY1 = 'String';
process.env.BOOLEAN_KEY1 = '1';
process.env.ARRAY_KEY1 = 'dfdf 3gebwrs adfgasg';
process.env.OBJECT_KEY1 = 'prop value1';
process.env.OBJECT_KEY2_dfsdf = '';
process.env.OBJECT_KEY3__34werg = 'prop 3';
process.env.OBJECT__KEY5_ds4werg = 'prop 3';

console.info(getArray('ARRAY_KEY1'));
console.info(getBoolean('BOOLEAN_KEY1'));
console.info(getNumber('NUMBER_KEY1'));
console.info(getObject('OBJECT'));
console.info(getString('STRING_KEY1'));
