// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-voiceStateUpdate
const { VoiceState, Client } = require("discord.js");
const LogEmbed = require("../../Components/Embeds/LogEmbed");

module.exports = {
  name: "voiceStateUpdate",

  /**
   *
   * @param {VoiceState} newState
   * @param {VoiceState} oldState
   * @param {Client} client
   */

  async execute(oldState, newState, client) {
    const { member, guild } = newState;
    const oldChannel = oldState.channel;
    const newChannel = newState.channel;
    const joinToCreate = "935601690688782376";

    if (
      oldChannel !== newChannel &&
      newChannel &&
      newChannel.id === joinToCreate
    ) {
      const voiceChannel = await guild.channels.create(
        `📢 ${member.user.tag}`,
        {
          type: "GUILD_VOICE",
          parent: newChannel.parent,
          permissionOverwrites: [
            { id: member.id, allow: ["CONNECT"] },
            { id: guild.id, deny: ["CONNECT"] },
          ],
        }
      );

      LogEmbed({
        channel: client.channels.cache.get("942060027823423538"),
        color: "#FFAC1C",
        description: `${member.user.username} started a stream in ${guild.name}!`,
      });

      client.newVoiceGenerator.set(member.id, voiceChannel.id);

      await newChannel.permissionOverwrites.edit(member, { CONNECT: false });
      setTimeout(
        () => newChannel.permissionOverwrites.delete(member),
        30 * 1000
      );

      return setTimeout(() => member.voice.setChannel(voiceChannel), 500);
    }

    const ownedChannel = client.newVoiceGenerator.get(member.id);

    if (
      ownedChannel &&
      oldChannel.id === ownedChannel &&
      (!newChannel || newChannel.id !== ownedChannel)
    ) {
      client.newVoiceGenerator.set(member.id, null);
      LogEmbed({
        channel: client.channels.cache.get("942060027823423538"),
        color: "#FFAC1C",
        description: `${member.user.username} ended streaming in ${guild.name}!`,
      });
      oldChannel.delete().catch(() => {});
    }
  },
};
