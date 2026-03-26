import * as line from '@line/bot-sdk';
import express, { Request, Response } from 'express';

const channelAccessToken = process.env.LINE_CHANNEL_ACCESS_TOKEN ?? '';
const channelSecret = process.env.LINE_CHANNEL_SECRET ?? '';

if (!channelAccessToken || !channelSecret) {
  console.error(
    'Missing LINE_CHANNEL_ACCESS_TOKEN or LINE_CHANNEL_SECRET. Copy .env.example to .env and fill in values.'
  );
  process.exit(1);
}

// 1. 設定憑證（從 .env 讀取）
const clientConfig: line.ClientConfig = {
  channelAccessToken,
  channelSecret,
};

const middlewareConfig: line.MiddlewareConfig = {
  channelSecret,
};

// 2. 建立 LINE 客戶端
const client = new line.Client(clientConfig);
const app = express();

// 3. Webhook 接收點（LINE middleware 會自行解析 raw body，勿在先前掛 express.json）
app.post('/callback', line.middleware(middlewareConfig), (req: Request, res: Response) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      console.error(err);
      res.status(500).end();
    });
});

// 4. 核心邏輯：辨識「12345」
async function handleEvent(event: line.WebhookEvent) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  if (event.message.text === '12345') {
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: '🔋 報告駿哥：鋼彈 1.0 號通電成功！目前已接通 VPS 與 Docker 環境。',
    });
  }

  return client.replyMessage(event.replyToken, {
    type: 'text',
    text: `收到訊息：${event.message.text}。請輸入「12345」進行系統測試。`,
  });
}

// 5. 啟動伺服器
const port = Number(process.env.PORT) || 3000;
app.listen(port, () => {
  console.log(`LINE Bot 正在 Port ${port} 運作中...`);
});
