import Discord from 'discord.js';
import { config } from 'dotenv';
import { applicationReady } from './wallet';

config();

const client = new Discord.Client();

client.on('ready', () => {
    client.guilds.cache.forEach(async (guild) => {
        const members = await guild.members.fetch();
        const ids = members.map((member) => member.id);
        await applicationReady.handle(ids);
    });
});

client.login(process.env.DISCORD_TOKEN);
