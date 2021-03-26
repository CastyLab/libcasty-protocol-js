import {proto} from '../commonjs'
import {Packet} from '../protocol/packet'

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

  const packet = new Packet(proto.EMSG.LOGON, message)
  expect(packet.is_proto()).toBe(true)
  expect(packet.emsg).toBe(proto.EMSG.LOGON)

  const event = packet.payload()
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

  const packet = new Packet(proto.EMSG.LOGON, message)
  expect(packet.is_proto()).toBe(true)
  expect(packet.emsg).toBe(proto.EMSG.LOGON)

  const event = packet.payload()
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

  const packet = new Packet(proto.EMSG.NEW_CHAT_MESSAGE, message)
  expect(packet.is_proto()).toBe(true)
  expect(packet.emsg).toBe(proto.EMSG.NEW_CHAT_MESSAGE)

  const event = packet.payload()
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

  const packet = new Packet(proto.EMSG.THEATER_PLAY, message)

  expect(packet.is_proto()).toBe(true)
  expect(packet.emsg).toBe(proto.EMSG.THEATER_PLAY)

  const event = packet.payload()
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

  const packet = new Packet(proto.EMSG.THEATER_PAUSE, message)

  expect(packet.is_proto()).toBe(true)
  expect(packet.emsg).toBe(proto.EMSG.THEATER_PAUSE)

  const event = packet.payload()
  expect(event.theaterId).toBe(payload.theaterId)
  expect(event.userId).toBe(payload.userId)
  expect(event.currentTime).toBe(payload.currentTime)
  expect(event.state).toBe(payload.state)

});


