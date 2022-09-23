const Discord = require("discord.js");
const config = require("../config.json");
const client = require("../index.js");
const { Koreanbots } = require("koreanbots");
const koreanbots = new Koreanbots({ api: { token: "한디리 토큰(https://koreanbots.dev/developers/applications/bots/봇아이디) 로 확인 가능" }, clientID: "봇 아이디" });

module.exports = {
    name: "하트출첵",
    description: "하루마다 하트 인증을 해 도박돈을 받습니다",
    async execute(interaction) {
        const schema = require("../models/하트")
        const t = new Date()
        const date = "" + t.getFullYear() + t.getMonth() + t.getDate();
        const Schema = require("../models/도박");
        const emdfhr = await Schema.findOne({ userid: interaction.user.id });
        const emdfhr1 = await schema.findOne({ userid: interaction.user.id });
        let newData = new schema({
            userid: interaction.user.id,
            date: date
        })
        koreanbots.mybot.checkVote(interaction.user.id).then(async (voted) => {
            if (voted.voted == true) {
                if (!emdfhr1) {
                    newData.save()
                    return interaction.reply(`${interaction.user} 님, 하트를 눌러주셔서 감사합니다!\n+ 100000원`,
                    )
                } if (emdfhr1.date == date) return interaction.reply("**이미 오늘 하트출첵을 하셨어요!**")
                else {
                    await Schema.findOneAndUpdate(
                        { userid: interaction.user.id },
                        {
                            money: emdfhr.money + 100000,
                            userid: interaction.user.id,
                            date: emdfhr.date,
                        }
                    );
                    await schema.findOneAndUpdate(
                        { userid: interaction.user.id },
                        {
                            userid: interaction.user.id,
                            date: date,
                        })
                    return interaction.reply({
                        content: `${interaction.user} **님, 하트를 눌러주셔서 감사합니다!\n+ 100000원**`,
                    })
                }
            }
            if (voted.voted == false)
                return interaction.reply(
                    `${interaction.user} **님, 하트를 아직 누르지 않으셨어요!**\nhttps://koreanbots.dev/bots/1004740873092862062/vote`
                )
        })

    }
}
