import { ByteSize } from '../src';

const bytesize = new ByteSize('50mb 10b');

console.warn('50mb 10b:');
console.warn(` - gb float: ${bytesize.toGb()}`);
console.warn(` - gb ceil: ${bytesize.toGb(true)}`);
console.warn(` - mb float: ${bytesize.toMb()}`);
console.warn(` - mb ceil: ${bytesize.toMb(true)}`);
console.warn(` - kb float: ${bytesize.toKb()}`);
console.warn(` - kb ceil: ${bytesize.toKb(true)}`);
console.warn(` - b: ${bytesize.toBytes()}`);
