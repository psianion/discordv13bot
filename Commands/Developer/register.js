const {
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const User = require("../../Schemas/User");

module.exports = {
  name: "register",
  description: "Register your user!",
  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction, modal) {
    const { options, member, guild } = interaction;

    const RegisteredEmbed = new MessageEmbed()
      .setDescription("you are registered already")
      .setColor("GREEN");

    const RegisterEmbed = new MessageEmbed()
      .setDescription("login to hq and setup your profile")
      .setColor("GREEN");

    const RegisterRow = new MessageActionRow();
    RegisterRow.addComponents(
      new MessageButton()
        .setURL("https://www.pvphq.in/")
        .setStyle("LINK")
        .setEmoji("🚀")
        .setLabel("Register")
    );

    User.findOne(
      {
        discordId: member.id,
      },
      (err, data) => {
        if (data?.game?.pokemongo.ign) {
          interaction.reply({
            embeds: [RegisteredEmbed],
          });
        } else {
          interaction.reply({
            embeds: [RegisterEmbed],
            components: [RegisterRow],
            ephemeral: true,
          });
        }
      }
    );
  },
};
