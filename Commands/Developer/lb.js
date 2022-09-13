const {
  CommandInteraction,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  MessageAttachment,
} = require("discord.js");
const LogEmbed = require("../../Components/Embeds/LogEmbed");
const User = require("../../Schemas/User");
const { createCanvas, registerFont, loadImage } = require("canvas");

module.exports = {
  name: "lb",
  description: "leaderboards",
  options: [
    {
      name: "gbl",
      type: "SUB_COMMAND",
      description: "GBL S12 Leaderboards",
      options: [
        {
          name: "page",
          type: "INTEGER",
          required: false,
          description: "set a specific page",
        },
      ],
    },
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  async execute(interaction, client) {
    const { options, member, guild } = interaction;
    const Embed = new MessageEmbed().setColor("GREEN");
    const subCommand = options.getSubcommand();

    registerFont("./Components/fonts/Montserrat-SemiBold.ttf", {
      family: "Montserrat",
    });

    switch (subCommand) {
      case "gbl":
        {
          const hqlogo = new MessageAttachment("./Components/assets/logo.png");

          const LeaderboardEmbed = new MessageEmbed()
            .setColor("#9147ff")
            .setAuthor({
              name: "GBL Leaderboard (ಠ_ಠ)",
              iconURL: member.avatarURL({ dynamic: true, size: 512 }),
            })
            .setDescription("`Season 12 Rankings`");

          const canvas = createCanvas(1000, 900);
          const context = canvas.getContext("2d");

          const background = await loadImage("./Components/assets/bg.png");
          context.drawImage(background, 0, 0, canvas.width, canvas.height);

          context.font = "36.45px Montserrat";

          var pg = options.getInteger("page");
          // Select the style that will be used to fill the text in

          User.find({ "game.pokemongo.gbl.s12.currentMMR": { $exists: true } })
            .sort([["game.pokemongo.gbl.s12.currentMMR", "descending"]])
            .exec((err, res) => {
              var page = Math.ceil(res.length / 10);

              if (pg != Math.floor(pg)) pg = 1;
              if (pg <= 0) {
                return interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      `${member}, use a number between 1 and ${page} for page number.`
                    ).setColor("RED"),
                  ],
                  ephemeral: true,
                });
              }

              if (!pg) pg = 1;
              let end = pg * 10;
              let start = pg * 10 - 10;

              if (res.length === 0) {
                console.log("no user for leaderboard?");
              } else if (res.length <= start) {
                interaction.reply({
                  embeds: [
                    Embed.setDescription(
                      `${member}, use a number between 1 and ${page} for page number.`
                    ).setColor("RED"),
                  ],
                  ephemeral: true,
                });
              } else if (res.length <= end) {
                LeaderboardEmbed.setFooter({
                  text: `Page ${pg} of ${page}.`,
                  iconURL: "attachment://logo.png",
                });

                for (let i = start; i < res.length; i++) {
                  context.fillStyle = "#ececec";
                  context.fillText(`#${i + 1}`, 82.75, 92 + (i - start) * 83);
                  context.fillText(
                    `${
                      res[i].game.pokemongo.ign
                        ? res[i].game.pokemongo.ign
                        : res[i].discordName
                    }`,
                    225.6,
                    92 + (i - start) * 83
                  );
                  context.fillText(
                    `${res[i].game.pokemongo.gbl.s12.currentMMR}`,
                    827.2,
                    92 + (i - start) * 83
                  );
                }
              } else {
                LeaderboardEmbed.setFooter({
                  text: `Page ${pg} of ${page} · Use /lb gbl for next page.`,
                  iconURL: "attachment://logo.png",
                });

                for (let i = start; i < end; i++) {
                  if (i == 0) {
                    context.fillStyle = "#ffe400";
                    context.fillText(`#${i + 1}`, 82.75, 92 + (i - start) * 83);
                    context.fillStyle = "#ececec";
                    context.fillText(
                      `${
                        res[i].game.pokemongo.ign
                          ? res[i].game.pokemongo.ign
                          : res[i].discordName
                      }`,
                      225.6,
                      92 + (i - start) * 83
                    );
                    context.fillText(
                      `${res[
                        i
                      ].game.pokemongo.gbl.s12.currentMMR.toLocaleString()}`,
                      827.2,
                      92 + (i - start) * 83
                    );
                  } else if (i == 1) {
                    context.fillStyle = "#ffffff";
                    context.fillText(`#${i + 1}`, 82.75, 92 + (i - start) * 83);
                    context.fillStyle = "#ececec";
                    context.fillText(
                      `${
                        res[i].game.pokemongo.ign
                          ? res[i].game.pokemongo.ign
                          : res[i].discordName
                      }`,
                      225.6,
                      92 + (i - start) * 83
                    );
                    context.fillText(
                      `${res[
                        i
                      ].game.pokemongo.gbl.s12.currentMMR.toLocaleString()}`,
                      827.2,
                      92 + (i - start) * 83
                    );
                  } else if (i == 2) {
                    context.fillStyle = "#ff9703";
                    context.fillText(`#${i + 1}`, 82.75, 92 + (i - start) * 83);
                    context.fillStyle = "#ececec";
                    context.fillText(
                      `${
                        res[i].game.pokemongo.ign
                          ? res[i].game.pokemongo.ign
                          : res[i].discordName
                      }`,
                      225.6,
                      92 + (i - start) * 83
                    );
                    context.fillText(
                      `${res[i].game.pokemongo.gbl.s12.currentMMR}`,
                      827.2,
                      92 + (i - start) * 83
                    );
                  } else {
                    context.fillStyle = "#ececec";
                    context.fillText(`#${i + 1}`, 82.75, 92 + (i - start) * 83);
                    context.fillText(
                      `${
                        res[i].game.pokemongo.ign
                          ? res[i].game.pokemongo.ign
                          : res[i].discordName
                      }`,
                      225.6,
                      92 + (i - start) * 83
                    );
                    context.fillText(
                      `${res[i].game.pokemongo.gbl.s12.currentMMR}`,
                      827.2,
                      92 + (i - start) * 83
                    );
                  }
                }
              }
              const attachment = new MessageAttachment(
                canvas.toBuffer(),
                "gbl-lb.png"
              );
              LeaderboardEmbed.setImage("attachment://gbl-lb.png");

              interaction.reply({
                content: `**Viewing GBL S12 Rankings** • [${member}] • <:pogo:941787322624667668> `,
                embeds: [LeaderboardEmbed],
                files: [attachment, hqlogo],
              });
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
