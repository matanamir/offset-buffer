var test = require('tap').test,
    ref = require('ref'),
    int24 = require('int24'),
    OffsetBuffer = require('../offset-buffer.js')(ref, int24, console);

process.on('uncaughtException', function(err) {
    console.log('Uncaught exception: ' + err);
    process.exit(-1);
});

test('ctor', function(t) {
    t.test('Length param', function(t) {
        var b = new OffsetBuffer(10);
        t.equal(b.buf.length, 10, 'Constructs buffer with the proper length parameter');
        t.equal(b.read_offset, 0, 'Read offset is 0');
        t.equal(b.write_offset, 0, 'Write offset is 0');
        t.end();
    });
    t.test('Existing Buffer', function(t) {
        var existing_b = new Buffer(10);
        var b = new OffsetBuffer(existing_b);
        t.ok(b.buf === existing_b, 'Internal buffer is the same as the existing Buffer');
        t.equal(b.read_offset, 0, 'Read offset is 0');
        t.equal(b.write_offset, 0, 'Write offset is 0');
        t.end();
    });
    t.test('Custom read and write offsets', function(t) {
        var b = new OffsetBuffer(10, 3, 7);
        t.equal(b.read_offset, 3, 'Read offset matches custom');
        t.equal(b.write_offset, 7, 'Write offset matches custom');
        t.end();
    });
    t.end();
});

test('writeInt8', function(t) {
    var b = new OffsetBuffer(1);
    b.writeInt8(0x04);
    t.equal(b.buf[0], 0x04, 'writeInt8: Written data matches');
    t.equal(b.write_offset, 1, 'writeInt8: write offset correct');
    t.end();
});

test('writeInt16BE', function(t) {
    var b = new OffsetBuffer(2);
    b.writeInt16BE(0x04);
    t.equal(b.buf.toString('hex'), '0004', 'writeInt16BE: Written data matches');
    t.equal(b.write_offset, 2, 'writeInt16BE: write offset correct');
    t.end();
});

test('writeInt16LE', function(t) {
    var b = new OffsetBuffer(2);
    b.writeInt16LE(0x04);
    t.equal(b.buf.toString('hex'), '0400', 'writeInt16LE: Written data matches');
    t.equal(b.write_offset, 2, 'writeInt16LE: write offset correct');
    t.end();
});

test('writeUInt16BE', function(t) {
    var b = new OffsetBuffer(2);
    b.writeUInt16BE(0xfff0);
    t.equal(b.buf.toString('hex'), 'fff0', 'writeUInt16BE: Written data matches');
    t.equal(b.write_offset, 2, 'writeUInt16BE: write offset correct');
    t.end();
});

test('writeUInt16LE', function(t) {
    var b = new OffsetBuffer(2);
    b.writeUInt16LE(0xfff0);
    t.equal(b.buf.toString('hex'), 'f0ff', 'writeUInt16LE: Written data matches');
    t.equal(b.write_offset, 2, 'writeUInt16LE: write offset correct');
    t.end();
});

test('writeInt24BE', function(t) {
    var b = new OffsetBuffer(3);
    b.writeInt24BE(0x7fff00);
    t.equal(b.buf.toString('hex'), '7fff00', 'writeInt24BE: Written data matches');
    t.equal(b.write_offset, 3, 'writeInt24BE: write offset correct');
    t.end();
});

test('writeInt24LE', function(t) {
    var b = new OffsetBuffer(3);
    b.writeInt24LE(0x7fff00);
    t.equal(b.buf.toString('hex'), '00ff7f', 'writeInt24LE: Written data matches');
    t.equal(b.write_offset, 3, 'writeInt24LE: write offset correct');
    t.end();
});

test('writeUInt24BE', function(t) {
    var b = new OffsetBuffer(3);
    b.writeUInt24BE(0xffff00);
    t.equal(b.buf.toString('hex'), 'ffff00', 'writeUInt24BE: Written data matches');
    t.equal(b.write_offset, 3, 'writeUInt24BE: write offset correct');
    t.end();
});

test('writeUInt24LE', function(t) {
    var b = new OffsetBuffer(3);
    b.writeUInt24LE(0xffff00);
    t.equal(b.buf.toString('hex'), '00ffff', 'writeUInt24LE: Written data matches');
    t.equal(b.write_offset, 3, 'writeUInt24LE: write offset correct');
    t.end();
});

test('writeInt32BE', function(t) {
    var b = new OffsetBuffer(4);
    b.writeInt32BE(0x7fff0000);
    t.equal(b.buf.toString('hex'), '7fff0000', 'writeInt32BE: Written data matches');
    t.equal(b.write_offset, 4, 'writeInt32BE: write offset correct');
    t.end();
});

test('writeInt32LE', function(t) {
    var b = new OffsetBuffer(4);
    b.writeInt32LE(0x7fff0000);
    t.equal(b.buf.toString('hex'), '0000ff7f', 'writeInt32LE: Written data matches');
    t.equal(b.write_offset, 4, 'writeInt32LE: write offset correct');
    t.end();
});

test('writeUInt32BE', function(t) {
    var b = new OffsetBuffer(4);
    b.writeUInt32BE(0xffff0000);
    t.equal(b.buf.toString('hex'), 'ffff0000', 'writeUInt32BE: Written data matches');
    t.equal(b.write_offset, 4, 'writeUInt32BE: write offset correct');
    t.end();
});

test('writeUInt32LE', function(t) {
    var b = new OffsetBuffer(4);
    b.writeUInt32LE(0xffff0000);
    t.equal(b.buf.toString('hex'), '0000ffff', 'writeUInt32LE: Written data matches');
    t.equal(b.write_offset, 4, 'writeUInt32LE: write offset correct');
    t.end();
});

test('writeInt64BE', function(t) {
    var b = new OffsetBuffer(8);
    b.writeInt64BE('9223372036854710272'); // pass a string instead of a number
    t.equal(b.buf.toString('hex'), '7fffffffffff0000', 'writeInt64BE: Written data matches');
    t.equal(b.write_offset, 8, 'writeInt64BE: write offset correct');
    t.end();
});

test('writeInt64LE', function(t) {
    var b = new OffsetBuffer(8);
    b.writeInt64LE('9223372036854710272'); // pass a string instead of a number
    t.equal(b.buf.toString('hex'), '0000ffffffffff7f', 'writeInt64LE: Written data matches');
    t.equal(b.write_offset, 8, 'writeInt64LE: write offset correct');
    t.end();
});

test('writeUInt64BE', function(t) {
    var b = new OffsetBuffer(8);
    b.writeUInt64BE('18446744073709486080'); // pass a string instead of a number
    t.equal(b.buf.toString('hex'), 'ffffffffffff0000', 'writeUInt64BE: Written data matches');
    t.equal(b.write_offset, 8, 'writeUInt64BE: write offset correct');
    t.end();
});

test('writeUInt64LE', function(t) {
    var b = new OffsetBuffer(8);
    b.writeUInt64LE('18446744073709486080'); // pass a string instead of a number
    t.equal(b.buf.toString('hex'), '0000ffffffffffff', 'writeUInt64LE: Written data matches');
    t.equal(b.write_offset, 8, 'writeUInt64LE: write offset correct');
    t.end();
});

test('readInt8', function(t) {
    var b = new OffsetBuffer([0x04]);
    t.equal(b.readInt8(), 0x04, 'readInt8: Read data matches');
    t.equal(b.read_offset, 1, 'readInt8: read offset correct');
    t.end();
});

test('readInt16BE', function(t) {
    var b = new OffsetBuffer([0x04, 0x05]);
    t.equal(b.readInt16BE(), 1029, 'readInt16BE: Read data matches');
    t.equal(b.read_offset, 2, 'readInt16BE: read offset correct');
    t.end();
});

test('readInt16LE', function(t) {
    var b = new OffsetBuffer([0x04, 0x05]);
    t.equal(b.readInt16LE(), 1284, 'readInt16LE: Read data matches');
    t.equal(b.read_offset, 2, 'readInt16LE: read offset correct');
    t.end();
});

test('readUInt16BE', function(t) {
    var b = new OffsetBuffer([0xff, 0x05]);
    t.equal(b.readUInt16BE(), 65285, 'readUInt16BE: Read data matches');
    t.equal(b.read_offset, 2, 'readUInt16BE: read offset correct');
    t.end();
});

test('readUInt16LE', function(t) {
    var b = new OffsetBuffer([0xff, 0x05]);
    t.equal(b.readUInt16LE(), 1535, 'readUInt16LE: Read data matches');
    t.equal(b.read_offset, 2, 'readUInt16LE: read offset correct');
    t.end();
});

test('readInt24BE', function(t) {
    var b = new OffsetBuffer([0x04, 0x05, 0x06]);
    t.equal(b.readInt24BE(), 263430, 'readInt24BE: Read data matches');
    t.equal(b.read_offset, 3, 'readInt24BE: read offset correct');
    t.end();
});

test('readInt24LE', function(t) {
    var b = new OffsetBuffer([0x04, 0x05, 0x06]);
    t.equal(b.readInt24LE(), 394500, 'readInt24LE: Read data matches');
    t.equal(b.read_offset, 3, 'readInt24LE: read offset correct');
    t.end();
});

test('readUInt24BE', function(t) {
    var b = new OffsetBuffer([0xff, 0x05, 0x06]);
    t.equal(b.readUInt24BE(), 16712966, 'readUInt24BE: Read data matches');
    t.equal(b.read_offset, 3, 'readUInt24BE: read offset correct');
    t.end();
});

test('readUInt24LE', function(t) {
    var b = new OffsetBuffer([0xff, 0x05, 0x06]);
    t.equal(b.readUInt24LE(), 394751, 'readUInt24LE: Read data matches');
    t.equal(b.read_offset, 3, 'readUInt24LE: read offset correct');
    t.end();
});

test('readInt32BE', function(t) {
    var b = new OffsetBuffer([0x04, 0x05, 0x06, 0x07]);
    t.equal(b.readInt32BE(), 67438087, 'readInt32BE: Read data matches');
    t.equal(b.read_offset, 4, 'readInt32BE: read offset correct');
    t.end();
});

test('readInt32LE', function(t) {
    var b = new OffsetBuffer([0x04, 0x05, 0x06, 0x07]);
    t.equal(b.readInt32LE(), 117835012, 'readInt32LE: Read data matches');
    t.equal(b.read_offset, 4, 'readInt32LE: read offset correct');
    t.end();
});

test('readUInt32BE', function(t) {
    var b = new OffsetBuffer([0xff, 0x05, 0x06, 0x07]);
    t.equal(b.readUInt32BE(), 4278519303, 'readUInt32BE: Read data matches');
    t.equal(b.read_offset, 4, 'readUInt32BE: read offset correct');
    t.end();
});

test('readUInt32LE', function(t) {
    var b = new OffsetBuffer([0xff, 0x05, 0x06, 0x07]);
    t.equal(b.readUInt32LE(), 117835263, 'readUInt32LE: Read data matches');
    t.equal(b.read_offset, 4, 'readUInt32LE: read offset correct');
    t.end();
});

test('readInt64BE', function(t) {
    var b = new OffsetBuffer([0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b]);
    t.equal(b.readInt64BE(), '289644378304612875', 'readInt64BE: Read data matches');
    t.equal(b.read_offset, 8, 'readInt64BE: read offset correct');
    t.end();
});

test('readInt64LE', function(t) {
    var b = new OffsetBuffer([0x04, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b]);
    t.equal(b.readInt64LE(), '795458214266537220', 'readInt64LE: Read data matches');
    t.equal(b.read_offset, 8, 'readInt64LE: read offset correct');
    t.end();
});

test('readUInt64BE', function(t) {
    var b = new OffsetBuffer([0xff, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b]);
    t.equal(b.readUInt64BE(), '18376100481824524811', 'readUInt64BE: Read data matches');
    t.equal(b.read_offset, 8, 'readUInt64BE: read offset correct');
    t.end();
});

test('readUInt64LE', function(t) {
    var b = new OffsetBuffer([0xff, 0x05, 0x06, 0x07, 0x08, 0x09, 0x0a, 0x0b]);
    t.equal(b.readUInt64LE(), '795458214266537471', 'readUInt64LE: Read data matches');
    t.equal(b.read_offset, 8, 'readUInt64LE: read offset correct');
    t.end();
});

test('fill', function(t) {
    t.test('Full buffer', function(t) {
        var b = new OffsetBuffer(5);
        b.fill(0x05);
        t.equal(b.toString('hex'), '0505050505', 'fill: Full string fill matches expected value');
        t.equal(b.write_offset, 5, 'fill: write offset is at end of buffer');
        t.end();
    });
    t.test('Partial', function(t) {
        var b = new OffsetBuffer(5);
        b.fill(0x05, 3);
        t.equal(b.buf.slice(0, 3).toString('hex'), '050505', 'fill: Partial string fill matches expected value');
        t.equal(b.write_offset, 3, 'fill: write offset is at partial end');
        t.end();
    });
    t.end();
});

test('write', function(t) {
    var b = new OffsetBuffer(5);
    b.write('abcde', 'utf8');
    t.equal(b.toString('utf8'), 'abcde', 'write: Buffer matches write string');
    t.equal(b.write_offset, 5, 'write: write offset is at end of encoded string');
    t.end();
});

test('copyFrom', function(t) {
    t.test('Full copy', function(t) {
        var c = new Buffer(5),
            b = new OffsetBuffer(5);
        b.copyFrom(c);
        t.equal(b.toString('utf8'), c.toString('utf8'), 'copyFrom: Full buffers match');
        t.equal(b.write_offset, 5, 'copyFrom: write offset at the end of the buffer');
        t.end();
    });
    t.test('Partial copy', function(t) {
        var c = new Buffer('bbb'),
            b = new OffsetBuffer(new Buffer('aaaaa'));
        b.copyFrom(c, 1, 3);
        t.equal(b.toString('utf8'), 'bbaaa', 'copyFrom: Partial buffers match');
        t.equal(b.write_offset, 2, 'copyFrom: write offset at the end of the buffer');
        t.end();
    });
    t.end();
});

test('copyTo', function(t) {
    var to = new Buffer(5),
        from = new OffsetBuffer(new Buffer('abcde'));
    from.copyTo(to);
    t.equal(from.toString('utf8'), to.toString('utf8'), 'copyTo: Full buffers match');
    t.equal(from.read_offset, 5, 'copyTo: read offset at the end of the buffer');
    t.end();
});










