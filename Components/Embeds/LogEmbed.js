const { MessageEmbed } = require("discord.js");

// inside a command, event listener, etc.
module.exports = function LogEmbed({ color, description }) {
  const logEmbed = new MessageEmbed()
    .setColor(color)
    .setDescription(description);
  //958084406998876280
  //942060027823423538
  client.channels.cache.get("942060027823423538").send({ embeds: [logEmbed] });
};
