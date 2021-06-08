import Discord from 'discord.js';
import { config } from 'dotenv';
import { applicationReady, viewWallet } from './wallet';

config();

const client = new Discord.Client();

client.on('ready', () => {
    client.guilds.cache.forEach(async (guild) => {
        const members = await guild.members.fetch();
        const ids = members.map((member) => member.id);
        await applicationReady.handle(ids);
    });
});

client.on('message', async (msg) => {
    const { id } = msg.author;
    const [command, ...params] = msg.content.split(' ');

    if (msg.author.bot) {
        return;
    }

    if (command === '!carteira') {
        const embed = new Discord.MessageEmbed({ title: 'Carteira' });
        try {
            const wallet = await viewWallet.handle(id);
            embed.setDescription(`${wallet.coins} :coin:`);
            embed.setColor('GREEN');
        } catch {
            embed.setDescription('Carteira não encontrada...');
            embed.setColor('RED');
        }
        msg.channel.send(embed);
    }
});

client.login(process.env.DISCORD_TOKEN);
