const { Client } = require("discord.js");

module.exports = {
  name: "ready",
  once: true,
  /**
   * @param {Client} client
   */
  execute(client) {
    console.log("client ready");
    client.user.setActivity("Hello!", { type: "WATCHING" });
  },
};
