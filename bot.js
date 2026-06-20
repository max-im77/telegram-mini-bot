const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const fs = require('fs');
const path = require('path');

const token = '8740657800:AAE_LzVtkZKrbWS6xRcI1FJ81UzLQVKVhrs';
const bot = new TelegramBot(token, { polling: true });

const app = express();
app.use(express.json());

const indexPath = path.join(__dirname, 'public', 'index.html');
const indexHtml = fs.readFileSync(indexPath, 'utf8');

app.get('/', (req, res) => {
  res.setHeader('Content-Type', 'text/html; charset=utf-8');
  res.send(indexHtml);
});

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
