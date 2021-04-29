import {proto} from './../commonjs'
import {Reader} from 'protobufjs'

const EMsgMask  = 2147483647;

class Packet {

  // return buffer of a packet data and its emsg
  static serialize(emsg, body) {
    let buffer = Buffer.alloc(4)
    buffer.writeInt32LE(emsg, 0, 1);
    if (body !== null) {
      let buff0 = body.constructor.encode(body).finish();
      let buffered = Buffer.from(buff0);
      buffer = Buffer.concat([buffer, buffered])
    }
    return buffer
  }

  // Create a new packet from an array of bytes
  constructor(data) {
    let reader = Reader.create(Buffer.from(data));
    let rawEMsg = reader.fixed32() >>> 0;
    this.emsg = rawEMsg & EMsgMask;
    this.data = reader;
    if (this.is_proto(this.emsg)){
      this.proto = true;
    }
    return this;
  }

  // deserialize a packet to a protobuf object
  deserializeTo(obj) {
    return obj.decode(this.data)
  }

  // check if this packet is a proto packet
  is_proto() {
    return this.emsg !== proto.EMSG.INVALID
  }

}

export {Packet}
