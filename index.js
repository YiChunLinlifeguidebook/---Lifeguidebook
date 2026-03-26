const line = require('@line/bot-sdk');
const express = require('express');

const config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: process.env.LINE_CHANNEL_SECRET,
};

if (!config.channelAccessToken || !config.channelSecret) {
  console.error(
    'Missing LINE_CHANNEL_ACCESS_TOKEN or LINE_CHANNEL_SECRET. Copy .env.example to .env and fill in values.'
  );
  process.exit(1);
}

const client = new line.Client(config);
const app = express();

app.post('/callback', line.middleware(config), (req, res) => {
  Promise.all(
    req.body.events.map((event) => {
      if (
        event.type === 'message' &&
        event.message.type === 'text' &&
        event.message.text === '12345'
      ) {
        return client.replyMessage(event.replyToken, {
          type: 'text',
          text: '通電成功！駿哥，這台鋼彈活過來了！',
        });
      }
      return Promise.resolve();
    })
  )
    .then(() => res.json({ status: 'ok' }))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

app.listen(3000, () => console.log('LINE Bot is running on port 3000'));
