import { Timespan } from '../src';

const timespan = new Timespan('1h 30m 20ms');

console.warn('1h 30m 20ms:');
console.warn(` - hour float: ${timespan.toHour()}`);
console.warn(` - hour ceil: ${timespan.toHour(true)}`);
console.warn(` - min float: ${timespan.toMin()}`);
console.warn(` - min ceil: ${timespan.toMin(true)}`);
console.warn(` - sec float: ${timespan.toSec()}`);
console.warn(` - sec ceil: ${timespan.toSec(true)}`);
console.warn(` - ms: ${timespan.toMs()}`);
