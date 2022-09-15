const { CommandInteraction } = require("discord.js");
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
  ],
  /**
   *
   * @param {CommandInteraction} interaction
   */
  execute(interaction) {
    const { options, member, guild } = interaction;
    const subCommand = options.getSubcommand();

    switch (subCommand) {
      case "groupteam": {
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
              for (let option of options._hoistedOptions.filter(function (el) {
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
    }
  },
};
