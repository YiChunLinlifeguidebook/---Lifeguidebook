"use strict";

(function initTokenGate() {
  const tokenInput = document.getElementById("token-input");
  const responseEl = document.getElementById("token-response");
  const downloadButtons = document.querySelectorAll("[data-download-action='true']");

  if (!tokenInput || !responseEl || downloadButtons.length === 0) {
    return;
  }

  const { buildTokenResponse } = window.TokenGateCore || {};
  if (typeof buildTokenResponse !== "function") {
    responseEl.textContent = "系統錯誤：Token 驗證模組未載入。";
    responseEl.classList.add("is-error");
    return;
  }

  downloadButtons.forEach(function bindDownloadAction(button) {
    button.addEventListener("click", function onDownloadClick(event) {
      event.preventDefault();

      const platform = button.dataset.platform || "unknown";
      const result = buildTokenResponse({
        token: tokenInput.value,
        platform
      });

      responseEl.textContent = result.message;
      responseEl.classList.toggle("is-success", result.ok);
      responseEl.classList.toggle("is-error", !result.ok);
    });
  });
})();
