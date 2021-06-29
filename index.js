require("dotenv").config();
const Discord = require("discord.js");

const url = process.env.url;
const channelId = process.env.channelId;
let playing = false;

const client = new Discord.Client({
  partials: ["MESSAGE", "CHANNEL", "REACTION"]
});

require("./LavalinkManager")(client);

client.on("ready", async () => {
  console.log(`[CLIENT]: O client do bot fez login no Discord com sucesso!`);
  client.music.init(client.user.id);
});

client.on("message", async (message) => {
  if (message.content.toLocaleLowerCase() === "<3play") {
    let checkNode = client.music.nodes.get("Cod 1");
    if(!checkNode) return message.channel.send(":x: **| Estou sem conecxão com minha instancia lavalink! Vote mais tarde, ok?**");
    let player = client.music.players.get(message.guild.id);
    if(player) return message.channel.send(`:octagonal_sign: **| Eu já tenho um plyaer ativo!**\n> Player ativo em: <#${player.voiceChannel}>`);
    if(message.member.voice.channel.id != process.env.channelId) return message.channel.send(`:octagonal_sign: **| Que tal irmos para o canal <#${process.env.channelId}>?**`);

    player = client.music.create({
      guild: message.guild.id,
      voiceChannel: message.member.voice.channel.id,
      textChannel: message.channel.id,
      selfDeafen: true
    });

    player.connect();

    let results = await player.search(process.env.url, message.author);

    if(["NO_MATCHES", "LOAD_FAILED"].includes(results.loadType)) return message.channel.send(":x: **| Desculpa, aconteceu um erro ao carregar a música!**");
    player.queue.add(results.tracks[0]);
    player.play();
  };
});

client.login(process.env.token);
