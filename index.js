const { Client, GatewayIntentBits, REST, Routes } = require('discord.js');
require('./keep_alive.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ],
});

const commands = [
    { name: 'ping', description: 'Check of de bot nog leeft' },
    { name: 'shatta', description: 'Informatie over de community' },
    { name: 'commands', description: 'Toon alle beschikbare commando\'s' },
];

const rest = new REST({ version: '10' }).setToken('MTUwNDQ3OTU4MjI2OTczNDk4Mg.GuGb2U.64VbX01RGuxgiZO3qd5JyAQrhVU6lEeQbyDcP0');

(async () => {
    try {
        await rest.put(Routes.applicationCommands('1504479582269734982'), { body: commands });
        console.log('✅ Slash commands geregistreerd!');
    } catch (error) {
        console.error(error);
    }
})();

client.once('ready', () => {
    console.log("✅ Ready! Ingelogd als Shatta Bot");
    client.user.setActivity('/commands', { type: 2 });
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand()) return;
    if (interaction.commandName === 'ping') await interaction.reply('🏓 Pong! De Shatta bot is razendsnel.');
    if (interaction.commandName === 'shatta') await interaction.reply('Op zoek naar een discord server? Dan is **The Shatta Community** de juiste plek! 🔥');
    if (interaction.commandName === 'commands') await interaction.reply('**Commands:** /ping, /shatta, /commands');
});

client.login('MTUwNDQ3OTU4MjI2OTczNDk4Mg.GuGb2U.64VbX01RGuxgiZO3qd5JyAQrhVU6lEeQbyDcP0');
