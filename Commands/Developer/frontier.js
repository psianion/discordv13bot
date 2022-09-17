const { CommandInteraction, Client } = require("discord.js");
const User = require("../../Schemas/User");
const PokemonList = require("../../Components/assets/data/pointsData");

module.exports = {
  name: "frontier",
  description: "Frontier Commands for Admins",
  permission: "ADMINISTRATOR",
  options: [
    {
      name: "groupteam",
      type: "SUB_COMMAND",
      description: "Add Group Stage teams",
      options: [
        {
          name: "member",
          type: "USER",
          required: true,
          description: "Who's team <tag> him",
        },
        {
          name: "pokemon1",
          type: "STRING",
          required: true,
          description: "Pokemon 1",
        },
        {
          name: "pokemon2",
          required: true,
          type: "STRING",
          description: "Pokemon 2",
        },
        {
          name: "pokemon3",
          type: "STRING",
          required: true,
          description: "Pokemon 3",
        },
        {
          name: "pokemon4",
          type: "STRING",
          required: true,
          description: "Pokemon 4",
        },
        {
          name: "pokemon5",
          type: "STRING",
          required: true,
          description: "Pokemon 5",
        },
        {
          name: "pokemon6",
          type: "STRING",
          required: true,
          description: "Pokemon 6",
        },
      ],
    },
    {
      name: "groupadd",
      type: "SUB_COMMAND",
      description: "Add Group to Players",
      options: [
        {
          name: "role",
          type: "ROLE",
          required: true,
          description: "Which group?",
        },
        {
          name: "member1",
          type: "USER",
          required: true,
          description: "Member 1",
        },
        {
          name: "member2",
          type: "USER",
          required: true,
          description: "Member 2",
        },
        {
          name: "member3",
          type: "USER",
          required: true,
          description: "Member 3",
        },
        {
          name: "member4",
          type: "USER",
          required: true,
          description: "Member 4",
        },
        {
          name: "member5",
          type: "USER",
          required: true,
          description: "Member 5",
        },
        {
          name: "member6",
          type: "USER",
          required: true,
          description: "Member 6",
        },
        {
          name: "member7",
          type: "USER",
          required: true,
          description: "Member 7",
        },
        {
          name: "member8",
          type: "USER",
          required: true,
          description: "Member 8",
        },
        {
          name: "member9",
          type: "USER",
          required: true,
          description: "Member 9",
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

    switch (subCommand) {
      case "groupteam":
        {
          const addGroupPokemon = async () => {
            const player = options.getMember("member");

            User.findOne({ discordId: player.user.id }, (err, data) => {
              if (!data) {
                return interaction.reply({
                  content: `This <@${player.user.id}> is not registered?`,
                });
              } else if (data.game.pokemongo.bf.s6.groupPokemon.length === 6) {
                return interaction.reply({
                  content: `This <@${player.user.id}> already has 6 Pokemon registered`,
                });
              } else {
                for (let option of options._hoistedOptions.filter(function (
                  el
                ) {
                  return el.type === "STRING";
                })) {
                  const pokemonArray = option.value.split("/");
                  let isShadow = false;
                  if (pokemonArray[1] === "shadow") {
                    isShadow = true;
                  }
                  let foundPokemon = PokemonList.find(
                    (p) => p.pokemonName === pokemonArray[0]
                  );
                  data.game.pokemongo.bf.s6.groupPokemon.push({
                    name: foundPokemon.pokemonName,
                    sprite: foundPokemon.pokemonSprite,
                    isShadow: isShadow,
                  });
                }
                data.save().catch((err) => console.log(err));
                interaction.reply({
                  content: `<@${player.user.id}>'s Pokemon are registered now!`,
                });
              }
            });
          };
          addGroupPokemon();
        }
        break;
      case "groupadd": {
        const addGroup = async () => {
          const group = options.getRole("role");

          for (let option of options._hoistedOptions.filter(function (el) {
            return el.type === "USER";
          })) {
            option.member.roles.add(group);
            User.findOne({ discordId: option.value }, (err, data) => {
              data.game.pokemongo.bf.s6.group = group.name;
              data.save().catch((err) => console.log(err));
            });
          }

          interaction.reply({
            content: `**${group.name}** assigned!`,
            ephemeral: true,
          });
        };
        addGroup();
      }
    }
  },
};
