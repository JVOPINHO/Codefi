require("dotenv").config();
const Discord = require("discord.js");

const url = process.env.url;
const channelId = process.env.channelId;
let playing = false;

const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

require("./LavalinkManager")(client)

client.on("ready", async () => {
  console.log(`[CLIENT]: O client do bot fez login no Discord com sucesso!`)
  client.music.init(client.user.id)
});

client.on("message", async (message) => {
  if (message.content.toLocaleLowerCase() === "<3play") {
    //Terminar aqui
  }
});

client.login(process.env.token);
