require('dotenv').config();
const { Client, GatewayIntentBits, Events, MessageFlags } = require('discord.js');

const notabot = new Client({ intents: [GatewayIntentBits.Guilds] });

const cmds = [
  {
    name: 'kick',
    desc: 'Kick a member from your server.'
  },
  {
    name: 'timeout',
    desc: 'Timeout a member.'
  },
  {
    name: 'ban',
    desc: 'Ban a member from the server.'
  },
  {
    name: 'help',
    desc: 'View all my commands and how to use them.'
  },
  {
    name: 'jail',
    desc: 'Jail someone.'
  },
  {
    name: 'anti-nuke',
    desc: 'Setup anti-nuke for this server.'
  },
  {
    name: 'logs',
    desc: 'Setup logging in this server.'
  },
  {
    name: 'tempban',
    desc: 'Ban a member for a temporary duration.'
  },
  {
    name: 'cases',
    desc: 'View the moderation cases in this server.'
  },
  {
    name: 'support',
    desc: 'Get an invite to the support server.'
  }
];

notabot.commands = new Map();

notabot.once(Events.ClientReady, async () => {
  console.log('Logged in! :D');

  try {
    const cmds2 = cmds.map(cmd => {
      return {
        name: cmd.name,
        description: cmd.desc,
        contexts: [0],
        integration_types: [0],
        options: []
      };
    });

    const registered = await notabot.application.commands.set(cmds2);

    console.log('registered all 10 commands :3');
  } catch (ohno) {
    console.log(ohno);
  }
});

notabot.on(Events.InteractionCreate, async (interaction) => {
  try {
    if (!interaction.isChatInputCommand()) return;
    
    const cmd = cmds.find(c => c.name === interaction.commandName);
    if (!cmd) return;
    
    const h = require('./handle.js');
    await h(interaction);
  } catch (ohno) {
    console.log(ohno);
    await interaction.reply({
      content: 'Something went wrong! :(',
      flags: MessageFlags.Ephemeral
    });
  }
});

notabot.login(process.env.TOKEN);
