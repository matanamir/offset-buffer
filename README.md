# offset-buffer

[![Build Status](https://travis-ci.org/matanamir/offset-buffer.png)](https://travis-ci.org/matanamir/offset-buffer)

Node.js Buffer wrapper that keeps track of your read and write offsets.

It also includes support for reading and writing
24-bit and 64-bit integers (via the int24, and ref libraries respectively).

## Example

```js
var OffsetBuffer = require('offset-buffer'),
    ob = new OffsetBuffer(15),
    val;

// write offsets are managed automatically so you can do this:
ob.writeInt8(1);            // ob.write_offset = 1
ob.writeInt32BE(100;        // ob.write_offset = 5
ob.writeUInt64BE(1000);     // ob.write_offset = 13
ob.writeUInt16BE(10);       // ob.write_offset = 15

// you can also read from the buffer and it keeps track of your read offset:
val = ob.readInt8();        // ob.read_offset = 1
val = ob.readInt32BE();     // ob.read_offset = 5
val = ob.writeUInt64BE();   // ob.read_offset = 13
val = ob.writeUInt16BE();   // ob.read_offset = 15

// some extra convenience copy methods that keep track of your offsets
// (see code for more)
var buffer1 = new Buffer('abc'),
    buffer2 = new Buffer('def'),
    ob = new OffsetBuffer(6);

ob.copyFrom(buffer1);       // ob == 'abc'
ob.copyFrom(buffer2);       // ob == 'abcdef'
```

## Install

```
npm install offset-buffer
```

## Tests

```
npm test
```

## License

MIT License
