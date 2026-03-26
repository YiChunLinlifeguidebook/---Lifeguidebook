import * as line from '@line/bot-sdk';
import express, { Request, Response } from 'express';
import { createConsoleLogger } from './modules/logger';
import { screenWithLlamaGuardStub } from './modules/security';

const log = createConsoleLogger('line-bot');

// 1. 設定憑證（從小西建好的 .env 讀取）
const config: line.Config = {
  channelAccessToken: process.env.LINE_CHANNEL_ACCESS_TOKEN || '',
  channelSecret: process.env.LINE_CHANNEL_SECRET || '',
};

if (!config.channelAccessToken || !config.channelSecret) {
  log.error(
    'Missing LINE_CHANNEL_ACCESS_TOKEN or LINE_CHANNEL_SECRET. Copy .env.example to .env and fill in values.'
  );
  process.exit(1);
}

// 2. 建立 LINE 客戶端
const client = new line.Client(config as line.ClientConfig);
const app = express();

// 3. Webhook 接收點（勿在先前掛 express.json，以免破壞簽章驗證）
app.post('/callback', line.middleware(config as line.MiddlewareConfig), (req: Request, res: Response) => {
  Promise.all(req.body.events.map(handleEvent))
    .then((result) => res.json(result))
    .catch((err) => {
      log.error('callback.handler_failed', { err: String(err) });
      res.status(500).end();
    });
});

// 4. 核心邏輯：辨識「12345」
async function handleEvent(event: line.WebhookEvent) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve(null);
  }

  const guard = await screenWithLlamaGuardStub(event.message.text, log);
  if (!guard.safe) {
    log.warn('message.blocked_by_guard', { reason: guard.reason });
    return client.replyMessage(event.replyToken, {
      type: 'text',
      text: '此訊息無法處理，請調整用語後再試。',
    });
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
const port = process.env.PORT || 3000;
app.listen(port, () => {
  log.info(`LINE Bot 正在 Port ${port} 運作中...`);
});
