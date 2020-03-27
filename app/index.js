const Telegraf = require('telegraf');
const bot = new Telegraf('930886942:AAGupiVd3KdVCKsVFCzEdUxbKSAW1xE5d3I');

bot.hears('ping'.toLowerCase(), ctx => {
    return ctx.reply('Pong!');
});


bot.startPolling();
