const Telegraf = require('telegraf');
const token = '930886942:AAGupiVd3KdVCKsVFCzEdUxbKSAW1xE5d3I';
const bot = new Telegraf(token, {polling: true});

const notes = [];

bot.onText(/напомни (.+) в (.+)/, function (msg, match) {
    let userId = msg.from.id;
    let text = match[1];
    let time = match[2];

    notes.push({ 'uid': userId, 'time': time, 'text': text });

    bot.sendMessage(userId, 'Отлично! Я обязательно напомню, если не сдохну, хозяин *-*');
});

setInterval(function(){
    for (let i = 0; i < notes.length; i++) {
    const curDate = new Date().getHours() + ':' + new Date().getMinutes();
    if (notes[i]['time'] === curDate) {
        bot.sendMessage(notes[i]['uid'], 'Напоминаю, что вы должны: '+ notes[i]['text'] + ' сейчас.');
        notes.splice(i, 1);
    }
    }
}, 1000);

bot.launch();