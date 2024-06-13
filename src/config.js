const { EmbedBuilder, GatewayIntentBits } = require('discord.js');

module.exports = {
  app: {
    intents: [
      GatewayIntentBits.Guilds,
      GatewayIntentBits.GuildMessages,
      GatewayIntentBits.MessageContent,
    ]
  },
  roles: [
    {
      name: 'Color-Shuffle-Red',
      color: 0xFF0000
    },
    {
      name: 'Color-Shuffle-Orange',
      color: 0xFFA500
    },
    {
      name: 'Color-Shuffle-Yellow',
      color: 0xFFFF00
    },
    {
      name: 'Color-Shuffle-Green',
      color: 0x008000
    },
    {
      name: 'Color-Shuffle-Blue',
      color: 0x0000FF
    },
    {
      name: 'Color-Shuffle-Indigo',
      color: 0x4B0082
    },
    {
      name: 'Color-Shuffle-Violet',
      color: 0xEE82EE
    }
  ],
  shuffleInterval: 5 * 1000,
  ui: {
    commands: {
      startShuffle: {
        name: 'start-shuffle',
        description: 'starts a rainbow shuffle on your name'
      },
      stopShuffle: {
        name: 'stop-shuffle',
        description: 'stops the rainbow shuffle on your name'
      }
    },
    getEmbed: {
      loading: (username) => (
        new EmbedBuilder()
          .setTitle('Loading...')
          .setDescription(username)
          .setColor(0xFFFF00)
      ),
      started: (username) => (
        new EmbedBuilder()
          .setTitle('Color Shuffle Started!')
          .setDescription(username)
          .setColor(0x00FF00)
      ),
      stopped: (username) => (
        new EmbedBuilder()
          .setTitle('Color Shuffle Stopped!')
          .setDescription(username)
          .setColor(0x00FF00)
      ),
      error: (username) => {
        new EmbedBuilder()
          .setTitle('An Unexpected Error Occurred')
          .setDescription(username)
          .setColor(0xFF0000)
      }
    }
  }
};
