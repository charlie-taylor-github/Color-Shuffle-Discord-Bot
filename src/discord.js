const { Client: DiscordClient } = require('discord.js');
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const config = require('./config');

const TOKEN = process.env.DISCORD_APP_TOKEN;
const CLIENT_ID = process.env.DISCORD_APP_CLIENT_ID;

class Client {
  #client;
  #options;

  constructor(options = {}) {
    this.#options = options;
    this.#client = new DiscordClient({ intents: config.app.intents });
  }

  #log = (message) => {
    if (this.#options.log) console.log(message);
  }

  setCommands = async (commands) => {
    const rest = new REST({ version: '9' }).setToken(TOKEN);
    const discordCommands = commands.map(c => ({
      name: c.name,
      description: c.description,
    }));
    await rest.put(
      Routes.applicationCommands(CLIENT_ID),
      { body: discordCommands },
    );

    this.#client.on('interactionCreate', async interaction => {
      if (!interaction.isCommand()) return;
      for (const command of commands) {
        if (interaction.commandName === command.name) {
          command.callback(interaction);
          break;
        }
      }
    });
  }

  start = () => {
    this.#client.once('ready', () => {
      this.#log(`[${this.#client.user.tag}] is running...`);
    });

    this.#client.login(TOKEN);
  }
}


module.exports = Client;
