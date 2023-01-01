const {
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");
const User = require("../../Schemas/User");
const PokemonList = require("../../Components/assets/data/pointsData");

module.exports = {
  name: "set",
  description: "set your game data to hq",
  options: [
    {
      name: "gbl",
      type: "SUB_COMMAND",
      description: "Set GBL ELO for S13",
      options: [
        {
          name: "elo",
          type: "STRING",
          required: true,
          description: "set your current elo",
        },
      ],
    },
    {
      name: "region",
      type: "SUB_COMMAND",
      description: "set your playing region",
      options: [
        {
          name: "region",
          type: "STRING",
          required: true,
          description: "set your playing region",
          choices: [
            { name: "India", value: "india" },
            { name: "NA", value: "na" },
            { name: "EU", value: "eu" },
            { name: "LATAM", value: "latam" },
            { name: "Africa", value: "africa" },
            { name: "APAC", value: "apac" },
          ],
        },
      ],
    },
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction, client) {
    const { options, member, guild } = interaction;
    const Embed = new MessageEmbed().setColor("GREEN");
    const Row = new MessageActionRow();
    const subCommand = options.getSubcommand();

    switch (subCommand) {
      case "gbl":
        {
          const elo = options.getString("elo");

          const setRank = (highestMMR) => {
            if (highestMMR >= 3000) {
              return "legend";
            } else if (2750 <= highestMMR && highestMMR < 3000) {
              return "expert";
            } else if (2500 <= highestMMR && highestMMR < 2750) {
              return "veteran";
            } else if (highestMMR < 2500) {
              return "ace";
            }
          };

          if (
            elo === NaN ||
            elo < 0 ||
            elo > 4000 ||
            Math.abs(elo) !== parseInt(elo, 10)
          )
            return interaction.reply({
              embeds: [
                Embed.setDescription("Provide a valid ELO").setColor("RED"),
              ],
              ephemeral: true,
            });

          User.findOne({ discordId: member.id }, (err, data) => {
            if (!data || !data.game.pokemongo.ign) {
              interaction.reply({
                embeds: [
                  Embed.setDescription(
                    `your ign is not registered, kindly login to hq and setup profile`
                  ).setColor("RED"),
                ],
                components: [
                  Row.addComponents(
                    new MessageButton()
                      .setURL("https://www.pvphq.in/")
                      .setStyle("LINK")
                      .setEmoji("🚀")
                      .setLabel("Register"),
                    new MessageButton()
                      .setURL("https://www.pvphq.in/lb/gbl")
                      .setStyle("LINK")
                      .setEmoji("🚀")
                      .setLabel("GBL S13 Leaderboards")
                  ),
                ],
                ephemeral: true,
              });
            } else if (!data.game.pokemongo.gbl.s13.currentMMR) {
              data.game.pokemongo.gbl.s13.currentMMR = elo;
              data.game.pokemongo.gbl.s13.highestMMR = elo;
              data.game.pokemongo.gbl.s13.rank = setRank(elo);
              data.save().catch((err) => console.log(err));
              interaction.reply({
                embeds: [
                  Embed.setDescription(
                    `All set ${member}, current ELO set to **${elo}** and your rank is **${setRank(
                      elo
                    )}**.`
                  ).setColor("GREEN"),
                ],
                components: [
                  Row.addComponents(
                    new MessageButton()
                      .setURL("https://www.pvphq.in/lb/gbl")
                      .setStyle("LINK")
                      .setEmoji("🚀")
                      .setLabel("GBL S13 Leaderboards")
                  ),
                ],
              });
            } else {
              if (data.game.pokemongo.gbl.s13.highestMMR > elo) {
                data.game.pokemongo.gbl.s13.currentMMR = elo;
                data.save().catch((err) => console.log(err));
                interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      `GGs ${member}, current ELO set to **${elo}**.`
                    ).setColor("GREEN"),
                  ],
                  components: [
                    Row.addComponents(
                      new MessageButton()
                        .setURL("https://www.pvphq.in/lb/gbl")
                        .setStyle("LINK")
                        .setEmoji("🚀")
                        .setLabel("GBL S13 Leaderboards")
                    ),
                  ],
                });
              } else {
                data.game.pokemongo.gbl.s13.currentMMR = elo;
                data.game.pokemongo.gbl.s13.highestMMR = elo;
                data.game.pokemongo.gbl.s13.rank = setRank(elo);
                data.save().catch((err) => console.log(err));
                interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      `Congrats ${member}, current ELO set to **${elo}** and your rank is **${setRank(
                        elo
                      )}**.`
                    ).setColor("GREEN"),
                  ],
                  components: [
                    Row.addComponents(
                      new MessageButton()
                        .setURL("https://www.pvphq.in/lb/gbl")
                        .setStyle("LINK")
                        .setEmoji("🚀")
                        .setLabel("GBL S13 Leaderboards")
                    ),
                  ],
                });
              }
            }
          });
        }
        break;

      case "region":
        {
          const regionChoice = options.getString("region");

          User.findOne({ discordId: member.id }, (err, data) => {
            if (!data || !data.game.pokemongo.ign) {
              interaction.reply({
                embeds: [
                  Embed.setDescription(
                    `your ign is not registered, kindly login to hq and setup profile`
                  ).setColor("RED"),
                ],
                components: [
                  Row.addComponents(
                    new MessageButton()
                      .setURL("https://www.pvphq.in/")
                      .setStyle("LINK")
                      .setEmoji("🚀")
                      .setLabel("Register")
                  ),
                ],
                ephemeral: true,
              });
            } else {
              if (data.region) {
                interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      `your region is already set to ${data.region}, ping Admin if you want to change it!`
                    ).setColor("RED"),
                  ],
                  ephemeral: true,
                });
              } else {
                (data.region = regionChoice),
                  data.save().catch((err) => console.log(err));
                interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      `your region is set to ${data.region}!`
                    ).setColor("GREEN"),
                  ],
                  ephemeral: true,
                });
              }
            }
          });
        }
        break;
    }
  },
};
