import {proto} from './../commonjs'
import {Reader} from 'protobufjs'

const EMsgMask  = 2147483647;

class Packet {
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
  deserializeTo(obj) {
    return obj.decode(this.data)
  }
  is_proto() {
    return this.emsg !== proto.EMSG.INVALID
  }
}

export {Packet}
