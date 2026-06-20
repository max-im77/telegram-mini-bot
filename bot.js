const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const path = require('path');

const token = '8740657800:AAE_LzVtkZKrbWS6xRcI1FJ81UzLQVKVhrs';
const bot = new TelegramBot(token, { polling: true });

const app = express();
app.use(express.json());
app.use(express.static('public'));

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  const options = {
    reply_markup: {
      inline_keyboard: [
        [
          {
            text: '🎮 Открыть мини-приложение',
            web_app: { url: 'https://telegram-mini-bot-umvv.onrender.com' }
          }
        ]
      ]
    }
  };
  
  bot.sendMessage(chatId, 'Привет! Нажми кнопку ниже:', options);
});

bot.on('web_app_data', (msg) => {
  const chatId = msg.chat.id;
  const data = msg.web_app_data.data;
  
  bot.sendMessage(chatId, `📊 Ты отправил: ${data}`);
});

app.listen(3000, () => {
  console.log('✅ Сервер запущен на порту 3000');
});

console.log('🤖 Бот запущен!');
