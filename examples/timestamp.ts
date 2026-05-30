import { Timestamp } from '../src';

const timestamp = new Timestamp('1h 30m 20ms');

console.warn('1h 30m 20ms:');
console.warn(` - hour float: ${timestamp.toHour()}`);
console.warn(` - hour ceil: ${timestamp.toHour(true)}`);
console.warn(` - min float: ${timestamp.toMin()}`);
console.warn(` - min ceil: ${timestamp.toMin(true)}`);
console.warn(` - sec float: ${timestamp.toSec()}`);
console.warn(` - sec ceil: ${timestamp.toSec(true)}`);
console.warn(` - ms: ${timestamp.toMs()}`);
