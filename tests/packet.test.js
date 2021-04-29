import {proto} from '../commonjs'
import {Packet} from '../protocol/packet'
import {new_protobuf_msg} from '../protocol/protocol';

test('TestPingPongBytesToPacket', () => {

  let pingBytes = Buffer.from([ 1, 0, 0, 0 ]);
  let pingPacket = new Packet(pingBytes)
  expect(pingPacket.emsg).toBe(proto.EMSG.PING);

  let pongBytes = Buffer.from([ 2, 0, 0, 0 ]);
  let pongPacket = new Packet(pongBytes)
  expect(pongPacket.emsg).toBe(proto.EMSG.PONG);

});

test('TestLogOnEventBytesToPacket', () => {

  let packetBytes = Buffer.from([
    3, 0, 0, 0, 26, 18, 115, 117,
    112, 101, 114, 45, 115, 101, 99,
    117, 114, 101, 45, 116, 111, 107, 101, 110,
  ]);
  let packet = new Packet(packetBytes)
  expect(packet.emsg).toBe(proto.EMSG.LOGON);

  let logonEvent = packet.deserializeTo(proto.LogOnEvent)
  expect(logonEvent.token.toString('utf-8')).toBe("super-secure-token");

});

test('LogOnEvent', () => {

  const invalidPayload = "invalid (not an object)";
  expect(proto.LogOnEvent.verify(invalidPayload)).toBe("object expected")

  const payload = {
    username: Buffer.from("user"),
    password: Buffer.from("password"),
    token:    Buffer.from("Bearer random-token-here"),
  };
  expect(proto.LogOnEvent.verify(payload)).toBe(null)

  const message = new proto.LogOnEvent(payload)
  expect(message.username).toBe(payload.username);
  expect(message.password).toBe(payload.password);
  expect(message.token).toBe(payload.token);

  const bytes = new_protobuf_msg(proto.EMSG.LOGON, message)
  const packet = new Packet(bytes)
  expect(packet.is_proto()).toBe(true)
  expect(packet.emsg).toBe(proto.EMSG.LOGON)

  let event = packet.deserializeTo(proto.LogOnEvent)
  expect(event.username.toString('utf-8')).toBe(payload.username.toString('utf-8'))
  expect(event.password.toString('utf-8')).toBe(payload.password.toString('utf-8'))
  expect(event.token.toString('utf-8')).toBe(payload.token.toString('utf-8'))

});

test('TheaterLogOnEvent', () => {

  const invalidPayload = "invalid (not an object)";
  expect(proto.TheaterLogOnEvent.verify(invalidPayload)).toBe("object expected")

  const payload = {
    room:  Buffer.from("a-room-name"),
    token: Buffer.from("Bearer random-token-here"),
  };
  expect(proto.TheaterLogOnEvent.verify(payload)).toBe(null)

  const message = new proto.TheaterLogOnEvent(payload)
  expect(message.room).toBe(payload.room);
  expect(message.token).toBe(payload.token);

  const bytes = new_protobuf_msg(proto.EMSG.LOGON, message)
  const packet = new Packet(bytes)
  expect(packet.is_proto()).toBe(true)
  expect(packet.emsg).toBe(proto.EMSG.LOGON)

  let event = packet.deserializeTo(proto.TheaterLogOnEvent)
  expect(event.room.toString('utf-8')).toBe(payload.room.toString('utf-8'))
  expect(event.token.toString('utf-8')).toBe(payload.token.toString('utf-8'))

});

function random_number() {
  const min = 100000;
  const max = 999999;
  return Math.floor(Math.abs(Math.random() * (min - max) )) + min;
}

function mock_new_user() {
  return new proto.User({id: random_number().toString()})
}

test('ChatMsgEvent', () => {

  const invalidPayload = "invalid (not an object)";
  expect(proto.ChatMsgEvent.verify(invalidPayload)).toBe("object expected")

  const payload = {
    message:  Buffer.from("test-message"),
    reciever: mock_new_user(),
  };
  expect(proto.ChatMsgEvent.verify(payload)).toBe(null)

  const message = new proto.ChatMsgEvent(payload)
  expect(message.message).toBe(payload.message);
  expect(message.reciever).toBe(payload.reciever);

  const bytes = new_protobuf_msg(proto.EMSG.NEW_CHAT_MESSAGE, message)
  const packet = new Packet(bytes)
  expect(packet.is_proto()).toBe(true)
  expect(packet.emsg).toBe(proto.EMSG.NEW_CHAT_MESSAGE)

  let event = packet.deserializeTo(proto.ChatMsgEvent)
  expect(event.message.toString('utf-8')).toBe(payload.message.toString('utf-8'))
  expect(event.reciever.id).toBe(payload.reciever.id)

});

test('TheaterPlay', () => {

  const invalidPayload = "invalid (not an object)";
  expect(proto.TheaterVideoPlayer.verify(invalidPayload)).toBe("object expected")

  const payload = {
    theaterId:     random_number().toString(),
    userId:        random_number().toString(),
    currentTime:   random_number(),
    state:         proto.TheaterVideoPlayer.State.PLAYING,
  };
  expect(proto.TheaterVideoPlayer.verify(payload)).toBe(null)

  const message = new proto.TheaterVideoPlayer(payload)
  expect(message.theaterId).toBe(payload.theaterId);
  expect(message.userId).toBe(payload.userId);
  expect(message.currentTime).toBe(payload.currentTime);
  expect(message.state).toBe(payload.state);

  const bytes = new_protobuf_msg(proto.EMSG.THEATER_PLAY, message)
  const packet = new Packet(bytes)

  expect(packet.is_proto()).toBe(true)
  expect(packet.emsg).toBe(proto.EMSG.THEATER_PLAY)

  let event = packet.deserializeTo(proto.TheaterVideoPlayer)
  expect(event.theaterId).toBe(payload.theaterId)
  expect(event.userId).toBe(payload.userId)
  expect(event.currentTime).toBe(payload.currentTime)
  expect(event.state).toBe(payload.state)

});

test('TheaterPause', () => {

  const invalidPayload = "invalid (not an object)";
  expect(proto.TheaterVideoPlayer.verify(invalidPayload)).toBe("object expected")

  const payload = {
    theaterId:     random_number().toString(),
    userId:        random_number().toString(),
    currentTime:   random_number(),
    state:         proto.TheaterVideoPlayer.State.PAUSED,
  };
  expect(proto.TheaterVideoPlayer.verify(payload)).toBe(null)

  const message = new proto.TheaterVideoPlayer(payload)
  expect(message.theaterId).toBe(payload.theaterId);
  expect(message.userId).toBe(payload.userId);
  expect(message.currentTime).toBe(payload.currentTime);
  expect(message.state).toBe(payload.state);

  const bytes = new_protobuf_msg(proto.EMSG.THEATER_PAUSE, message)
  const packet = new Packet(bytes)

  expect(packet.is_proto()).toBe(true)
  expect(packet.emsg).toBe(proto.EMSG.THEATER_PAUSE)

  let event = packet.deserializeTo(proto.TheaterVideoPlayer)
  expect(event.theaterId).toBe(payload.theaterId)
  expect(event.userId).toBe(payload.userId)
  expect(event.currentTime).toBe(payload.currentTime)
  expect(event.state).toBe(payload.state)

});
