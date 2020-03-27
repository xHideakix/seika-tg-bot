const Telegraf = require('telegraf');
const app = new Telegraf('930886942:AAGupiVd3KdVCKsVFCzEdUxbKSAW1xE5d3I');

app.hears('hi', ctx => {
    return ctx.reply('Hey!');
});

app.startPolling();
