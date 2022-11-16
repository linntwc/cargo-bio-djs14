const { get } = require('axios');

module.exports = async (client, interaction) => {

   const dbGuild = await client.db.guilds.findOne({_id: interaction.guild.id,});
   const dbUser = await client.db.users.findOne({_id: interaction.user.id,});
  
   if (!dbGuild) await client.db.guilds.create({ _id: interaction.guild.id });
   if (!dbUser) await client.db.users.create({ _id: interaction.user.id });
    
   if (interaction.isCommand()) {
    const slashCmd = client.slash.get(interaction.commandName);
    if (!slashCmd) return interaction.reply({ content: 'Ocorreu um erro.'});
    
    const argsCmd = [];
    
    for (let optionCmd of interaction.options.data) {
        if (optionCmd.type === 'SUB_COMMAND') {
            if (optionCmd.name) argsCmd.push(optionCmd.name);
            optionCmd.options?.forEach(x => {
                if (x.value) argsCmd.push(x.value);
            });
        } else if (optionCmd.value) argsCmd.push(optionCmd.value);
    }
    
    try {
        slashCmd.run(client, interaction, argsCmd);
    } catch (err) {
        console.error("🚨 | [Erro] " + err);
    }

  }

  if(interaction.isButton()) {
    if(interaction.customId === 'checarBio') {
        let cargoAdd = interaction.guild.roles.cache.get(process.env.cargoId)

        let userFetch = await get(`https://discord.com/api/v9/users/${interaction.user.id}/profile?with_mutual_guilds=false`, { headers: { Authorization: process.env.selfToken }})
        if(userFetch.data.user.bio.includes(process.env.bioN)) {
            interaction.member.roles.add(cargoAdd, 'Tem texto na bio.')

            interaction.reply({ content: `Você resgatou o cargo com sucesso.`, ephemeral: true})
        } else {
           interaction.reply({ content: `Você precisa ter \`${process.env.bioN}\` na sua bio para resgatar esse cargo.`, ephemeral: true})
        }
    }
  }
}
