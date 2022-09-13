const { CommandInteraction } = require("discord.js");

module.exports = {
  name: "ping",
  description: "Pong!",
  permission: "ADMINISTRATOR",
  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction) {
    const { options, member, guild } = interaction;

    interaction.reply({ content: `Poings ${member}` });
  },
};
