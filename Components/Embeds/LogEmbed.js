const { MessageEmbed } = require("discord.js");

// inside a command, event listener, etc.
module.exports = function LogEmbed({ channel, color, description }) {
  const logEmbed = new MessageEmbed()
    .setColor(color)
    .setDescription(description);

  channel.send({ embeds: [logEmbed] });
};
