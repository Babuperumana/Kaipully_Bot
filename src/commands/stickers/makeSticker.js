const fs = require("fs");
const { exec } = require("child_process");
const { getFileBuffer } = require("../../utils/media.js");
const { sendSticker, sendText } = require("../../utils/message.js");
const addStickerMetaData = require("./addStickerMetaData.js");

async function makeSticker(mediaKey, sock, from, quoted, pushName) {
  let mediaType = "image";

  if (mediaKey.seconds) {
    if (mediaKey.seconds <= 10) {
      mediaType = "video";
    } else {
      return sendText(
        sock,
        from,
        quoted,
        "apenas faço figurinhas com 10 segundos ou menos!"
      );
    }
  }

  const buffer = await getFileBuffer(mediaKey, mediaType);

  const randomId = `${Math.random().toString(36).substring(2, 10)}`;

  const tempFolderPath = "./src/temp/";
  const inputFile = `${tempFolderPath}${randomId}.webp`;
  const outputFile = `${tempFolderPath}sticker_${randomId}.webp`;

  const stickerMetaData = {
    packname: "彡🤖 ᴄʀɪᴀᴅᴀ ᴘᴏʀ:\n↳ Anny Bot\n\n彡📱 ɴᴜ́ᴍᴇʀᴏ ᴅᴏ ʙᴏᴛ:\n↳ +55 98 8758-3208",
    author: `彡👑 ᴅᴏɴᴏ:\n↳ mneto_nx\n\n彡👤 ᴜsᴜᴀ́ʀɪᴏ:\n↳ ${pushName}`,
  };

  fs.writeFileSync(inputFile, buffer);

  exec(
    `ffmpeg -i ${inputFile} -c:v libwebp -filter:v fps=fps=15 -loop 0 -an -lossless 1 -preset default -s 200:200 ${outputFile}`,
    async () => {
      const mediaWithMetaDataPath = await addStickerMetaData(
        outputFile,
        stickerMetaData
      );

      const media = fs.readFileSync(mediaWithMetaDataPath);

      sendSticker(sock, from, quoted, media);

      fs.unlinkSync(inputFile);
      fs.unlinkSync(outputFile);
      fs.unlinkSync(`${tempFolderPath}nsticker.webp`);
    }
  );
}

module.exports = makeSticker;
