import Discord from 'discord.js';
import { config } from 'dotenv';
import { applicationReady, ranking, viewWallet } from './wallet';

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

    const embed = new Discord.MessageEmbed();

    switch (command) {
        case '!carteira':
            embed.setTitle('Carteira');
            try {
                const wallet = await viewWallet.handle(id);
                embed.setDescription(`${wallet.coins} :coin:`);
                embed.setColor('GREEN');
            } catch {
                embed.setDescription('Carteira não encontrada...');
                embed.setColor('RED');
            }
            msg.channel.send(embed);
            break;
        case '!ranking':
            embed.setTitle(':moneybag: Ranking :moneybag:');
            try {
                const wallets = await ranking.handle();
                embed.addFields(
                    wallets.map((wallet) => {
                        return {
                            name: client.users.cache.get(wallet.id)?.username,
                            value: `${wallet.coins} :coin:`
                        };
                    })
                );
                embed.setColor('GREEN');
            } catch {
                embed.setDescription('Erro na realização do ranking...');
                embed.setColor('RED');
            }
            msg.channel.send(embed);
            break;
    }
});

client.login(process.env.DISCORD_TOKEN);
