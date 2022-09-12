// https://discord.js.org/#/docs/main/stable/class/Client?scrollTo=e-voiceStateUpdate
const { VoiceState } = require("discord.js");
const LogEmbed = require("../../Components/Embeds/LogEmbed");

module.exports = {
  name: "voiceStateUpdate",

  /**
   *
   * @param {VoiceState} newState
   * @param {VoiceState} oldState
   */

  async execute(oldState, newState, client) {
    const { member, guild } = newState;
    const oldChannel = oldState.channel;
    const newChannel = newState.channel;
    const joinToCreate = "1002065516007014480";

    if (
      oldChannel !== newChannel &&
      newChannel &&
      newChannel.id === joinToCreate
    ) {
      const voiceChannel = await guild.channels.create(member.user.tag, {
        type: "GUILD_VOICE",
        parent: newChannel.parent,
        permissionOverwrites: [
          { id: member.id, allow: ["CONNECT"] },
          { id: guild.id, deny: ["CONNECT"] },
        ],
      });

      LogEmbed({
        channel: client.channels.cache.get("958084406998876280"),
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
      oldChannel.delete().catch(() => {});
    }
  },
};
