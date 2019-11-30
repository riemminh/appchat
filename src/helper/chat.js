import MessageModel from "../model/Message";

export const saveMessage = dataMessage => {
  let newmessage;
  if (dataMessage.typeRoom) {
    newmessage = new MessageModel({
      msgFrom: dataMessage.msgFrom,
      msgTo: dataMessage.msgTo,
      msg: dataMessage.message,
      unreadMessage: true,
      room: dataMessage.roomId,
      listUserRead: [dataMessage.idUserActive]
    });
  } else {
    newmessage = new MessageModel({
      msgFrom: dataMessage.msgFrom,
      msgTo: dataMessage.msgTo,
      msg: dataMessage.message,
      room: dataMessage.roomId
    });
  }

  return newmessage
    .save()
    .then(newMsg => newMsg)
    .catch(err => err);
};
