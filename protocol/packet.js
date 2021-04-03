import {proto} from './../commonjs'
import {Reader} from 'protobufjs'
import {new_protobuf_msg} from './protocol'
const EMsgMask  = 2147483647;

class Packet {
  constructor(emsg, body) {
    this.body  = body;
    this.emsg = emsg
    this.bytes = new_protobuf_msg(emsg, body);
    return this;
  }
  payload() {
    const data = Reader.create(Buffer.from(this.bytes));
    let rawEMsg = data.fixed32() >>> 0;
    this.emsg = rawEMsg & EMsgMask;
    return this.body.constructor.decode(data)
  }
  is_proto() {
    return this.emsg !== proto.EMSG.INVALID
  }
}

export {Packet}
