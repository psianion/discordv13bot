const { Client } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {Client} client
   */
  execute(client) {
    console.log("client ready");
    setInterval(() => {
      const targetGuild = client.guilds.cache.get("706571213941637191");
      if (targetGuild) {
        client.user.setActivity(
          "with " + targetGuild.memberCount + " trainer's brains!"
        );
      }
    }, 1800000);
  },
};
