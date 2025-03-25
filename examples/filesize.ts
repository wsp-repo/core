import { FileSize } from '../src';

const fileSize = new FileSize('50mb 10b');

console.warn('50mb 10b:');
console.warn(` - gb float: ${fileSize.toGb()}`);
console.warn(` - gb ceil: ${fileSize.toGb(true)}`);
console.warn(` - mb float: ${fileSize.toMb()}`);
console.warn(` - mb ceil: ${fileSize.toMb(true)}`);
console.warn(` - kb float: ${fileSize.toKb()}`);
console.warn(` - kb ceil: ${fileSize.toKb(true)}`);
console.warn(` - b: ${fileSize.toBytes()}`);
