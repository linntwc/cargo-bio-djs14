const { ButtonBuilder, ButtonStyle, ActionRowBuilder } = require('discord.js');

module.exports = {
  name: "checar",

  run: async (client, message, argsBot) => {

    const rowTest = new ActionRowBuilder().addComponents(
    new ButtonBuilder()
    .setCustomId('checarBio')
    .setLabel('Checar bio')
    .setStyle(ButtonStyle.Primary)
    )

    message.reply({ content: `Clique aqui para resgatar o cargo <@&${process.env.cargoId}>.\nVocê precisa ter \`${process.env.bioN}\` na sua bio para isso.`, components: [rowTest]})
  }
}
