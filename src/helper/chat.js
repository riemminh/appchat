import MessageModel from "../model/Message";

export const newMessage = dataMessage => {
  const newmessage = new MessageModel({
    msgFrom: dataMessage.msgFrom,
    msgTo: dataMessage.msgTo,
    msg: dataMessage.message,
    room: dataMessage.roomId
  });
  return newmessage.save().then(newMsg => newMsg);
};
