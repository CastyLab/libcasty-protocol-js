const ProtoMask = 0x80000000;
import {proto} from "./../commonjs";

function new_protobuf_msg(eMsg, body) {
  if (eMsg == null){
    eMsg = proto.EMSG.INVALID;
  }
  let header = new MsgHdrProtoBuf(eMsg);
  return new ClientMsgProtobuf({header, body}).serialize(Buffer.alloc(5))
}

class ClientMsgProtobuf {
  constructor(props) {
    this.props = props;
  }
  serialize(buffer) {
    let newBuffer = this.props.header.serialize(buffer);
    let buff0 = this.props.body.constructor.encode(this.props.body).finish();
    let buffered = Buffer.from(buff0);
    return Buffer.concat([newBuffer, buffered]);
  }
}

class MsgHdrProtoBuf {
  constructor(eMsg) {
    this.emsg = eMsg | ProtoMask;
    this.proto = proto.CMsgProtoBufHeader;
  }
  serialize(buffer) {
    let headerEntry = {
      SessionClientId: 0,
      IpAddr: "",
    };
    let body = this.proto.create(headerEntry);
    let buffered = new Int32Array(this.proto.encode(body).finish());
    let headerBuffer = Buffer.alloc(5);
    headerBuffer.writeInt32LE(buffered.length, 0, 1);
    let hBuffer = Buffer.concat([headerBuffer, Buffer.from(buffered)]);
    buffer.writeInt32LE(this.emsg, 0, 1);
    return Buffer.concat([buffer, hBuffer])
  }
}

export {
  MsgHdrProtoBuf,
  ClientMsgProtobuf,
  new_protobuf_msg,
};
