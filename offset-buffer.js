/*
 * Buffer container that keeps track of the offset during writes and reads.  Includes:
 *   - delegates to classic Node.js buffer methods (most of them anyway).
 *   - 64-bit functionality added automagically by the "ref" dependency
 *   - special 24bit integer buffer reader/writer
 */

module.exports = function(ref, int24, logger) {

    function OffsetBuffer(buffer_param, read_offset, write_offset) {
        if (Buffer.isBuffer(buffer_param)) {
            this.buf = buffer_param;
        } else {
            this.buf = new Buffer(buffer_param);
        }
        this.read_offset = read_offset || 0;
        this.write_offset = write_offset || 0;
    }

    // Basic Buffer functionality ----------------------------

    OffsetBuffer.prototype.writeInt8 = function(value) {
        this.buf.writeInt8(value, this.write_offset);
        this.write_offset += 1;
    };

    OffsetBuffer.prototype.writeInt16BE = function(value) {
        this.buf.writeInt16BE(value, this.write_offset);
        this.write_offset += 2;
    };

    OffsetBuffer.prototype.writeInt16LE = function(value) {
        this.buf.writeInt16LE(value, this.write_offset);
        this.write_offset += 2;
    };

    OffsetBuffer.prototype.writeUInt16BE = function(value) {
        this.buf.writeUInt16BE(value, this.write_offset);
        this.write_offset += 2;
    };

    OffsetBuffer.prototype.writeUInt16LE = function(value) {
        this.buf.writeUInt16LE(value, this.write_offset);
        this.write_offset += 2;
    };

    OffsetBuffer.prototype.writeInt32BE = function(value) {
        this.buf.writeInt32BE(value, this.write_offset);
        this.write_offset += 4;
    };

    OffsetBuffer.prototype.writeInt32LE = function(value) {
        this.buf.writeInt32LE(value, this.write_offset);
        this.write_offset += 4;
    };

    OffsetBuffer.prototype.writeUInt32BE = function(value) {
        this.buf.writeUInt32BE(value, this.write_offset);
        this.write_offset += 4;
    };

    OffsetBuffer.prototype.writeUInt32LE = function(value) {
        this.buf.writeUInt32LE(value, this.write_offset);
        this.write_offset += 4;
    };

    OffsetBuffer.prototype.readInt8 = function() {
        var result = this.buf.readInt8(this.read_offset);
        this.read_offset += 1;
        return result;
    };

    OffsetBuffer.prototype.readInt16BE = function() {
        var result = this.buf.readInt16BE(this.read_offset);
        this.read_offset += 2;
        return result;
    };

    OffsetBuffer.prototype.readInt16LE = function() {
        var result = this.buf.readInt16LE(this.read_offset);
        this.read_offset += 2;
        return result;
    };

    OffsetBuffer.prototype.readUInt16BE = function() {
        var result = this.buf.readUInt16BE(this.read_offset);
        this.read_offset += 2;
        return result;
    };

    OffsetBuffer.prototype.readUInt16LE = function() {
        var result = this.buf.readUInt16LE(this.read_offset);
        this.read_offset += 2;
        return result;
    };

    OffsetBuffer.prototype.readInt32BE = function() {
        var result = this.buf.readInt32BE(this.read_offset);
        this.read_offset += 4;
        return result;
    };

    OffsetBuffer.prototype.readInt32LE = function() {
        var result = this.buf.readInt32LE(this.read_offset);
        this.read_offset += 4;
        return result;
    };

    OffsetBuffer.prototype.readUInt32BE = function() {
        var result = this.buf.readUInt32BE(this.read_offset);
        this.read_offset += 4;
        return result;
    };

    OffsetBuffer.prototype.readUInt32LE = function() {
        var result = this.buf.readUInt32LE(this.read_offset);
        this.read_offset += 4;
        return result;
    };

    OffsetBuffer.prototype.fill = function(value, end) {
        end = end || this.buf.length;
        this.buf.fill(value, this.write_offset, end);
        this.write_offset = end;
    };

    OffsetBuffer.prototype.write = function(str, encoding) {
        encoding = encoding || 'utf8';
        this.buf.write(str, this.write_offset, str.length, encoding);
        this.write_offset += str.length;
    };

    OffsetBuffer.prototype.toString = function() {
        var buf = '[';
        buf += 'buffer: ' + this.buf.toString('hex');
        buf += ', read_offset: ' + this.read_offset;
        buf += ', write_offset: ' + this.write_offset;
        buf += ']';
        return buf;
    };

    OffsetBuffer.prototype.toString = function(val) {
        return this.buf.toString(val);
    };

    // Convenience copy methods ----------------------------------

    OffsetBuffer.prototype.copyFrom = function(source, start, end) {
        start = start || 0;
        end = end || source.length;
        source.copy(this.buf, this.write_offset, start, end);
        this.write_offset += end - start;
    };

    OffsetBuffer.prototype.copyTo = function(buffer) {
        this.buf.copy(buffer, 0, this.read_offset, this.read_offset + buffer.length);
        this.read_offset += buffer.length;
    };

    // 24 bit integer functionality ------------------------------

    OffsetBuffer.prototype.readInt24BE = function() {
        var result = int24.readInt24BE(this.buf, this.read_offset);
        this.read_offset += 3;
        return result;
    };

    OffsetBuffer.prototype.readInt24LE = function() {
        var result = int24.readInt24LE(this.buf, this.read_offset);
        this.read_offset += 3;
        return result;
    };

    OffsetBuffer.prototype.readUInt24BE = function() {
        var result = int24.readUInt24BE(this.buf, this.read_offset);
        this.read_offset += 3;
        return result;
    };

    OffsetBuffer.prototype.readUInt24LE = function() {
        var result = int24.readUInt24LE(this.buf, this.read_offset);
        this.read_offset += 3;
        return result;
    };

    OffsetBuffer.prototype.writeUInt24BE = function(value) {
        int24.writeUInt24BE(this.buf, this.write_offset, value);
        this.write_offset += 3;
    };

    OffsetBuffer.prototype.writeUInt24LE = function(value) {
        int24.writeUInt24LE(this.buf, this.write_offset, value);
        this.write_offset += 3;
    };

    OffsetBuffer.prototype.writeInt24BE = function(value) {
        int24.writeInt24BE(this.buf, this.write_offset, value);
        this.write_offset += 3;
    };

    OffsetBuffer.prototype.writeInt24LE = function(value) {
        int24.writeInt24LE(this.buf, this.write_offset, value);
        this.write_offset += 3;
    };

    // 64-bit functionality.  Pass a string instead of a number for larger values
    // The "ref" module extends the Buffer class automatically

    OffsetBuffer.prototype.writeInt64BE = function(value) {
        this.buf.writeInt64BE(value, this.write_offset);
        this.write_offset += 8;
    };

    OffsetBuffer.prototype.writeInt64LE = function(value) {
        this.buf.writeInt64LE(value, this.write_offset);
        this.write_offset += 8;
    };

    OffsetBuffer.prototype.writeUInt64BE = function(value) {
        this.buf.writeUInt64BE(value, this.write_offset);
        this.write_offset += 8;
    };

    OffsetBuffer.prototype.writeUInt64LE = function(value) {
        this.buf.writeUInt64LE(value, this.write_offset);
        this.write_offset += 8;
    };

    OffsetBuffer.prototype.readInt64BE = function() {
        var result = this.buf.readInt64BE(this.read_offset);
        this.read_offset += 8;
        return result;
    };

    OffsetBuffer.prototype.readInt64LE = function() {
        var result = this.buf.readInt64LE(this.read_offset);
        this.read_offset += 8;
        return result;
    };

    OffsetBuffer.prototype.readUInt64BE = function() {
        var result = this.buf.readUInt64BE(this.read_offset);
        this.read_offset += 8;
        return result;
    };

    OffsetBuffer.prototype.readUInt64LE = function() {
        var result = this.buf.readUInt64LE(this.read_offset);
        this.read_offset += 8;
        return result;
    };

    return OffsetBuffer;
};