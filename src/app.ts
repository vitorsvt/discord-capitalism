import Discord from 'discord.js';
import { config } from 'dotenv';
import { applicationReady, ranking, transfer, viewWallet } from './wallet';

config();

const client = new Discord.Client();

function getUserFromMention(mention: string): Discord.User | undefined {
    if (!mention) return;

    if (mention.startsWith('<@') && mention.endsWith('>')) {
        mention = mention.slice(2, -1);

        if (mention.startsWith('!')) {
            mention = mention.slice(1);
        }

        return client.users.cache.get(mention);
    }
}

client.on('ready', () => {
    client.guilds.cache.forEach(async (guild) => {
        let members = await guild.members.fetch();
        members = members.filter((member) => !member.user.bot);
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
            embed.setTitle(`Carteira de ${msg.author.username}`);
            try {
                const wallet = await viewWallet.handle(id);
                embed.setDescription(`${wallet.coins.toFixed(3)} :coin:`);
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
                            value: `${wallet.coins.toFixed(3)} :coin:`
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
        case '!transferir':
            embed.setTitle(':arrow_right: Transferência');
            const [target, value] = params;
            const toUser = getUserFromMention(target);
            const coins = parseFloat(value);
            console.log(coins);
            if (toUser === undefined) {
                embed.setDescription('Usuário não encontrado...');
                embed.setColor('RED');
            } else if (coins < 0.1) {
                embed.setDescription('Transfira um valor decente!');
                embed.setColor('RED');
            } else {
                try {
                    await transfer.handle({
                        from: msg.author.id,
                        to: toUser.id,
                        value: coins
                    });
                    embed.setDescription(
                        `Transferência feita no valor de ${coins} :coin: para ${toUser.username} :white_check_mark:`
                    );
                    embed.setColor('GREEN');
                } catch {
                    embed.setDescription('Erro ao realizar a transferência...');
                    embed.setColor('RED');
                }
            }
            msg.channel.send(embed);
            break;
    }
});

client.login(process.env.DISCORD_TOKEN);
