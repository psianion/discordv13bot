require("dotenv").config();
const { Client, Collection } = require("discord.js");
const client = new Client({ intents: 32767 });
const discordModals = require("discord-modals");
discordModals(client);
const { promisify } = require("util");
const { glob } = require("glob");
const Ascii = require("ascii-table");
const PG = promisify(glob);

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((m) => {
    console.log("Database Connected");
  })
  .catch((err) => {
    console.log(err);
  });

client.commands = new Collection();
client.newVoiceGenerator = new Collection();

["Events", "Commands"].forEach((handler) => {
  require(`./Handlers/${handler}`)(client, PG, Ascii);
});

client.login(process.env.DISCORD_TOKEN);
