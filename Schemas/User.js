const mongoose = require("mongoose");

const pokemonSchema = mongoose.Schema({
  name: mongoose.SchemaTypes.String,
  sprite: mongoose.SchemaTypes.String,
  isShadow: mongoose.SchemaTypes.Boolean,
});

const userSchema = mongoose.Schema({
  discordName: mongoose.SchemaTypes.String,
  discordId: mongoose.SchemaTypes.String,
  email: mongoose.SchemaTypes.String,
  nationality: mongoose.SchemaTypes.String,
  role: {
    type: mongoose.SchemaTypes.String,
    default: "Trainer",
  },
  region: {
    type: mongoose.SchemaTypes.String,
  },
  sprites: {
    animated: {
      type: mongoose.SchemaTypes.Boolean,
      default: false,
    },
    avatar: {
      type: mongoose.SchemaTypes.Array,
      default: ["red", "leaf"],
    },
    activeAvatar: {
      type: mongoose.SchemaTypes.String,
      default: "red",
    },
    banner: {
      type: mongoose.SchemaTypes.Array,
      default: ["red", "leaf"],
    },
    activeBanner: {
      type: mongoose.SchemaTypes.String,
      default: "redmap",
    },
  },
  game: {
    pokemongo: {
      ign: mongoose.SchemaTypes.String,
      trainerCode: mongoose.SchemaTypes.String,
      trainerLevel: mongoose.SchemaTypes.Number,
      trainerTeam: mongoose.SchemaTypes.String,
      homeCommunity: mongoose.SchemaTypes.String,
      bf: {
        s6: {
          team: mongoose.SchemaTypes.String,
          invite: mongoose.SchemaTypes.String,
          isCaptain: {
            type: mongoose.SchemaTypes.Boolean,
            default: false,
          },
          group: {
            type: mongoose.SchemaTypes.String,
          },
          qf: {
            type: mongoose.SchemaTypes.String,
          },
          sf: {
            type: mongoose.SchemaTypes.String,
          },
          finals: {
            type: mongoose.SchemaTypes.Boolean,
          },
          groupWins: {
            type: mongoose.SchemaTypes.Number,
            default: 0,
          },
          groupMatches: {
            type: mongoose.SchemaTypes.Number,
            default: 0,
          },
          knockoutWins: {
            type: mongoose.SchemaTypes.Number,
            default: 0,
          },
          knockoutMatches: {
            type: mongoose.SchemaTypes.Number,
            default: 0,
          },
          groupPokemon: [pokemonSchema],
          knockoutPokemon: [pokemonSchema],
        },
      },
      gbl: {
        s11: {
          currentMMR: mongoose.SchemaTypes.Number,
          highestMMR: mongoose.SchemaTypes.Number,
          rank: mongoose.SchemaTypes.String,
        },
        s12: {
          currentMMR: mongoose.SchemaTypes.Number,
          highestMMR: mongoose.SchemaTypes.Number,
          rank: mongoose.SchemaTypes.String,
        },
        s13: {
          currentMMR: mongoose.SchemaTypes.Number,
          highestMMR: mongoose.SchemaTypes.Number,
          rank: mongoose.SchemaTypes.String,
        },
      },
    },
  },
});

module.exports = mongoose.model("User", userSchema);
