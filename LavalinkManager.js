const { Manager } = require("erela.js");
const Discord = require("discord.js");

module.exports = (client) => {
    client.music = new Manager({
        nodes: [
            {
                host: `${process.env.host_lavalink}`,
                port: Number(process.env.port_lavalink),
                password: process.env.password_lavalink,
                identifier: "Cod 1"
            }
        ],
        plugins: [],
        autoPlay: true,
        send(id, payload) {
            const guild = client.guilds.cache.get(id);
            if (guild) guild.shard.send(payload);
        }
    })
    .on("nodeConnect", node => console.log(`[LAVALINK]: O node '${node.options.identifier}' foi conectado a lavalink!`))
    .on("nodeError", (node, error) => console.log(`[LAVALINK]: O node '${node.options.identifier}' teve um erro ao conectar na lavalink: ${error.message}`))
    .on("playerMove", (player, currentChannel, newChannel) => {
        player.voiceChannel = client.channels.cache.get(newChannel);
    })
    .on("trackStart", async (player, track) => {
        const channel = client.channels.cache.get(player.textChannel);

        channel.send(new Discord.MessageEmbed()
            .setColor("#B0E0E6")
            .setDescription(`:musical_note: Iniciando o lofi`)
            .setThumbnail(track.displayThumbnail()));
    })
    .on("queueEnd", async (player) => {
        const channel = client.channels.cache.get(player.textChannel);

        channel.send(new Discord.MessageEmbed()
            .setColor("#EE82EE")
            .setDescription(`Eita, o lofi acabou :cry:`));
    });
};