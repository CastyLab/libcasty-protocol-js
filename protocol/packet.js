import {proto} from './../commonjs'
import {Reader} from 'protobufjs'
import {new_protobuf_msg} from './protocol'
const EMsgMask  = 2147483647;

class Packet {
  constructor(emsg, body) {
    this.body = body;
    let data = new_protobuf_msg(emsg, body);
    this.data = Reader.create(Buffer.from(data));
    let rawEMsg = this.data.fixed32() >>> 0;
    this.emsg = rawEMsg & EMsgMask;
    return this;
  }
  payload() {
    return this.body.constructor.decode(this.data)
  }
  is_proto() {
    return this.emsg !== proto.EMSG.INVALID
  }
}

export {Packet}
