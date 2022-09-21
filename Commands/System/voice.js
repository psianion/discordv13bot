const { CommandInteraction, MessageEmbed, Client } = require("discord.js");

module.exports = {
  name: "stream",
  description: "Control your stream channel",
  options: [
    {
      name: "invite",
      type: "SUB_COMMAND",
      description: "Invite a friend to your stream",
      options: [
        {
          name: "member",
          type: "USER",
          required: true,
          description: "Invite Member",
        },
        {
          name: "member2",
          type: "USER",
          description: "Invite another member",
        },
        {
          name: "member3",
          type: "USER",
          description: "Invite another member",
        },
        {
          name: "member4",
          type: "USER",
          description: "Invite another member",
        },
        {
          name: "member5",
          type: "USER",
          description: "Invite another member",
        },
      ],
    },
    {
      name: "disallow",
      type: "SUB_COMMAND",
      description: "Remove a friend to your stream",
      options: [
        {
          name: "member",
          type: "USER",
          required: true,
          description: "Select member",
        },
        {
          name: "member2",
          type: "USER",
          description: "Select member",
        },
        {
          name: "member3",
          type: "USER",
          description: "Select member",
        },
        {
          name: "member4",
          type: "USER",
          description: "Select member",
        },
        {
          name: "member5",
          type: "USER",
          description: "Select member",
        },
      ],
    },
    {
      name: "name",
      type: "SUB_COMMAND",
      description: "Change name of your stream",
      options: [
        {
          name: "text",
          type: "STRING",
          required: true,
          description: "Provide name",
        },
      ],
    },
    {
      name: "mode",
      type: "SUB_COMMAND",
      description: "Make stream public",
      options: [
        {
          name: "turn",
          type: "STRING",
          required: true,
          description: "Turn full Private or full Public",
          choices: [
            { name: "Public", value: "public" },
            { name: "Private", value: "private" },
          ],
        },
      ],
    },
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   * @param {Client} client
   */
  execute(interaction, client) {
    const { options, member, guild } = interaction;

    const subCommand = options.getSubcommand();
    const voiceChannel = member.voice.channel;
    const Embed = new MessageEmbed().setColor("GREEN");

    const ownedChannel = client.newVoiceGenerator.get(member.id);

    if (!voiceChannel)
      return interaction.reply({
        embeds: [
          Embed.setDescription("You're not in a voice channel.").setColor(
            "RED"
          ),
        ],
        ephemeral: true,
      });

    if (!ownedChannel || voiceChannel.id !== ownedChannel)
      return interaction.reply({
        embeds: [
          Embed.setDescription("You do not own this or any channel.").setColor(
            "RED"
          ),
        ],
        ephemeral: true,
      });

    switch (subCommand) {
      case "name":
        {
          const newName = options.getString("text");
          if (newName.length > 22 || newName.length < 1)
            return interaction.reply({
              embeds: [
                Embed.setDescription(
                  "Cannot exceed 22 characters for name."
                ).setColor("RED"),
              ],
              ephemeral: true,
            });

          voiceChannel.edit({ name: newName });
          interaction.reply({
            embeds: [
              Embed.setDescription(
                `Channel name has been set to ${newName}`
              ).setColor("GREEN"),
            ],
            ephemeral: true,
          });
        }
        break;
      case "invite":
        {
          const sendInvites = async () => {
            for (let option of options._hoistedOptions) {
              const targetMember = options.getMember(option.name);
              voiceChannel.permissionOverwrites.edit(targetMember, {
                CONNECT: true,
                VIEW_CHANNEL: true,
              });

              await targetMember.send({
                embeds: [
                  Embed.setDescription(
                    `${member} invited you to join <#${voiceChannel.id}>`
                  ),
                ],
              });
            }

            interaction.reply({
              embeds: [Embed.setDescription(`Invites sent!`).setColor("GREEN")],
              ephemeral: true,
            });
          };
          sendInvites();
        }
        break;
      case "disallow":
        {
          const removePeople = async () => {
            for (let option of options._hoistedOptions) {
              const targetMember = options.getMember(option.name);
              voiceChannel.permissionOverwrites.edit(targetMember, {
                CONNECT: false,
              });

              if (
                targetMember.voice.channel &&
                targetMember.voice.channel.id == voiceChannel.id
              ) {
                await targetMember.voice.setChannel(null);
              }
            }

            interaction.reply({
              embeds: [
                Embed.setDescription(`Trainers removed!`).setColor("GREEN"),
              ],
              ephemeral: true,
            });
          };
          removePeople();
        }
        break;
      case "mode":
        {
          const turnChoice = options.getString("turn");
          switch (turnChoice) {
            case "public":
              {
                voiceChannel.permissionOverwrites.edit(guild.id, {
                  CONNECT: null,
                });
                interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      `Your channel is now public!`
                    ).setColor("GREEN"),
                  ],
                  ephemeral: true,
                });
              }
              break;
            case "private": {
              voiceChannel.permissionOverwrites.edit(guild.id, {
                VIEW_CHANNEL: false,
              });
              interaction.reply({
                embeds: [
                  Embed.setDescription(`Your channel is now private!`).setColor(
                    "GREEN"
                  ),
                ],
                ephemeral: true,
              });
            }
          }
        }
        break;
    }
  },
};
