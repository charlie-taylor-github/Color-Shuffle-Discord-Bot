const Client = require('./discord');
const shuffler = require('./shuffler');
const config = require('./config');
const client = new Client({ log: true });

client.setCommands([
  {
    name: config.ui.commands.startShuffle.name,
    description: config.ui.commands.startShuffle.description,
    callback: async (interaction) => {
      const username = interaction.user.username;
      let embed = config.ui.getEmbed.loading(username);
      await interaction.reply({ embeds: [embed], ephemeral: true });

      try {
        await shuffler.start(interaction.guild, interaction.member);

        embed = config.ui.getEmbed.started(username);
        await interaction.editReply({ embeds: [embed] });

      } catch (e) {
        console.error(e);
        embed = config.ui.getEmbed.error(username);
        await interaction.editReply({ embeds: [embed] });
      }
    }
  },
  {
    name: config.ui.commands.stopShuffle.name,
    description: config.ui.commands.stopShuffle.description,
    callback: async (interaction) => {
      const username = interaction.user.username;
      let embed = config.ui.getEmbed.loading(username);
      await interaction.reply({ embeds: [embed], ephemeral: true });

      try {
        await shuffler.stop(interaction.guild, interaction.member);

        embed = config.ui.getEmbed.stopped(username);
        await interaction.editReply({ embeds: [embed] });

      } catch (e) {
        console.error(e);
        embed = config.ui.getEmbed.error(username);
        await interaction.editReply({ embeds: [embed] });
      }
    }
  }
]);


module.exports = client.start;
