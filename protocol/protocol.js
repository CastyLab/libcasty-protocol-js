import {proto} from "./../commonjs";

function new_protobuf_msg(emsg, body) {
  if (emsg == null){
    emsg = proto.EMSG.INVALID;
  }
  return new ClientMsgProtobuf({emsg, body}).serialize()
}

class ClientMsgProtobuf {
  constructor(props) {
    this.props = props;
  }
  serialize() {
    let buffer = Buffer.alloc(4)
    buffer.writeInt32LE(this.props.emsg, 0, 1);
    if (this.props.body !== null) {
      let buff0 = this.props.body.constructor.encode(this.props.body).finish();
      let buffered = Buffer.from(buff0);
      buffer = Buffer.concat([buffer, buffered])
    }
    return buffer
  }
}

export {
  ClientMsgProtobuf,
  new_protobuf_msg,
};
