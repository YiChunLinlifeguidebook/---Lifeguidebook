const test = require("node:test");
const assert = require("node:assert/strict");

const {
  validateToken,
  buildTokenResponse,
  normalizeToken
} = require("./token-gate-core.js");

test("normalizeToken trims whitespace", () => {
  assert.equal(normalizeToken("  Abc123  "), "Abc123");
});

test("validateToken rejects empty token", () => {
  const result = validateToken("");
  assert.equal(result.ok, false);
  assert.equal(result.code, "TOKEN_MISSING");
});

test("validateToken rejects token that is too short", () => {
  const result = validateToken("abc123");
  assert.equal(result.ok, false);
  assert.equal(result.code, "TOKEN_FORMAT_INVALID");
});

test("validateToken rejects token with invalid characters", () => {
  const result = validateToken("Token$NotAllowed123456");
  assert.equal(result.ok, false);
  assert.equal(result.code, "TOKEN_FORMAT_INVALID");
});

test("validateToken accepts compliant token", () => {
  const result = validateToken("Abcdef1234567890");
  assert.equal(result.ok, true);
  assert.equal(result.code, "TOKEN_VALID");
});

test("buildTokenResponse returns blocked response for invalid token", () => {
  const response = buildTokenResponse({
    token: "bad",
    platform: "ios"
  });

  assert.deepEqual(response, {
    ok: false,
    code: "TOKEN_FORMAT_INVALID",
    message: "Token 格式錯誤，需為 16-64 碼英文/數字/底線/減號。",
    platform: "ios",
    downloadUrl: null
  });
});

test("buildTokenResponse returns allowed response for ios", () => {
  const response = buildTokenResponse({
    token: "IOS_VALID_TOKEN_1234",
    platform: "ios"
  });

  assert.equal(response.ok, true);
  assert.equal(response.code, "DOWNLOAD_ALLOWED");
  assert.equal(response.platform, "ios");
  assert.equal(response.downloadUrl, "https://apps.apple.com/");
});

test("buildTokenResponse returns allowed response for android", () => {
  const response = buildTokenResponse({
    token: "ANDROID_VALID_TOKEN_5678",
    platform: "android"
  });

  assert.equal(response.ok, true);
  assert.equal(response.code, "DOWNLOAD_ALLOWED");
  assert.equal(response.platform, "android");
  assert.equal(response.downloadUrl, "https://play.google.com/store");
});

test("buildTokenResponse falls back to safe url for unknown platform", () => {
  const response = buildTokenResponse({
    token: "VALID_TOKEN_FOR_WEB_9999",
    platform: "web"
  });

  assert.equal(response.ok, true);
  assert.equal(response.code, "DOWNLOAD_ALLOWED");
  assert.equal(response.platform, "web");
  assert.equal(response.downloadUrl, "#download");
});
