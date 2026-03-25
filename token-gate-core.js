const TOKEN_PATTERN = /^[A-Za-z0-9_-]{16,64}$/;

const PLATFORM_DOWNLOAD_URL = {
  ios: "https://apps.apple.com/",
  android: "https://play.google.com/store",
  web: "#download"
};

function normalizeToken(rawToken) {
  return String(rawToken ?? "").trim();
}

function normalizePlatform(rawPlatform) {
  const platform = String(rawPlatform ?? "").toLowerCase().trim();
  if (platform === "ios" || platform === "android" || platform === "web") {
    return platform;
  }
  return "web";
}

function validateToken(rawToken) {
  const token = normalizeToken(rawToken);
  if (!token) {
    return {
      ok: false,
      code: "TOKEN_MISSING",
      message: "Token 不可為空。"
    };
  }

  if (!TOKEN_PATTERN.test(token)) {
    return {
      ok: false,
      code: "TOKEN_FORMAT_INVALID",
      message: "Token 格式錯誤，需為 16-64 碼英文/數字/底線/減號。"
    };
  }

  return {
    ok: true,
    code: "TOKEN_VALID",
    message: "Token 驗證成功。"
  };
}

function buildTokenResponse(input) {
  const token = input && "token" in input ? input.token : "";
  const platform = normalizePlatform(input && input.platform);
  const validation = validateToken(token);

  if (!validation.ok) {
    return {
      ok: false,
      code: validation.code,
      message: validation.message,
      platform,
      downloadUrl: null
    };
  }

  return {
    ok: true,
    code: "DOWNLOAD_ALLOWED",
    message: "Token 驗證成功，允許下載導向。",
    platform,
    downloadUrl: PLATFORM_DOWNLOAD_URL[platform]
  };
}

function buildResponseMessage(result) {
  if (!result || typeof result !== "object") {
    return "系統錯誤：回傳資料格式不正確。";
  }

  if (!result.ok) {
    return `[${result.code}] ${result.message}`;
  }

  return `[${result.code}] 驗證通過，已準備導向 ${result.platform}（${result.downloadUrl}）。`;
}

function verifyDownloadToken(rawToken, platform) {
  return buildTokenResponse({
    token: rawToken,
    platform
  });
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = {
    normalizeToken,
    validateToken,
    buildTokenResponse,
    buildResponseMessage,
    verifyDownloadToken
  };
}

if (typeof window !== "undefined") {
  window.TokenGateCore = {
    normalizeToken,
    validateToken,
    buildTokenResponse,
    buildResponseMessage,
    verifyDownloadToken
  };
}
