# 數據脫敏與編號化（2026-03-26）

## 原則

- **嚴禁在分析資產中存放可識別個人之 PII**（目標）；實務上需搭配流程、存取控管與法遵審查，**非**僅靠程式自動達成「全球最高標準」。
- **假名**：`newSubjectUuid()` 產生與真人無關之 UUID；或 `pseudonymFromExternalId()` 在外部 ID 與內部假名間做 **HMAC**（需 `PSEUDONYM_SECRET`，勿提交至 Git）。
- **洗滌**：`stripPIIFromText()` 以啟發式移除常見 email／電話等樣式，**非完備**，敏感資料應在進入系統前即不收集或已同意。

## 存儲形狀

- `AnonymizedEventRecord`（見 `src/modules/privacy/anonymizedStore.ts`）：**subjectPseudonym + 行為特徵**，可選將 `sourceBucket` 設為 `undisclosed` 以避免在資料層註明細部來源。

## 「全知但無名」

- 分析只能基於**已收集且合法**之資料；匿名化會**降低**可連結性，與「全知」存在張力，無法用技術口號同時保證兩者極大化。

## Root 權限

- **Root 不會自動讓資料庫合規**；合規來自政策、最小權限、稽核與加密等控制。
