function sendText(sock, from, quoted, text) {
  sock.sendMessage(from, { text: text }, { quoted });
}

function sendImage(sock, from, quoted, image) {
  sock.sendMessage(from, { image: image }, { quoted });
}

function sendVideo(sock, from, quoted, video) {
  sock.sendMessage(from, { video: video, gifPlayback: true }, { quoted });
}

function sendSticker(sock, from, quoted, sticker) {
  sock.sendMessage(from, { sticker: sticker, gifPlayback: true}, { quoted });
}

function getMessageText(messageInfo, messageType) {
  let textOfMessage = "";

  if (messageType === "conversation") {
    textOfMessage = messageInfo.message.conversation;
  } else if (messageType === "imageMessage") {
    textOfMessage = messageInfo.message.imageMessage.caption;
  } else if (messageType === "videoMessage") {
    textOfMessage = messageInfo.message.videoMessage.caption;
  } else if (messageType === "extendedTextMessage") {
    textOfMessage = messageInfo.message.extendedTextMessage.text;
  }

  return textOfMessage;
}

module.exports = { sendText, sendImage, sendVideo, sendSticker, getMessageText };
