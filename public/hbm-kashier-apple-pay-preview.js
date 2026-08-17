(() => {
  'use strict';

  const HBM_DRAFT_THEME_ID = '187285799218';
  const currentThemeId = String(window.Shopify?.theme?.id || '');
  const previewThemeId = new URLSearchParams(window.location.search).get('preview_theme_id') || '';
  const isHbmDraft = currentThemeId === HBM_DRAFT_THEME_ID || previewThemeId === HBM_DRAFT_THEME_ID;

  if (!isHbmDraft || !location.pathname.startsWith('/products/')) return;

  const KASHIER_SDK_SRC = 'https://payments.kashier.io/kashier-sdk.js';

  function loadKashierSdk() {
    if (document.querySelector(`script[src="${KASHIER_SDK_SRC}"]`)) return;
    const script = document.createElement('script');
    script.src = KASHIER_SDK_SRC;
    script.async = true;
    script.dataset.hbmKashier = 'apple-pay-preview';
    document.head.appendChild(script);
  }

  function mountApplePayPreview() {
    if (document.getElementById('hbm-kashier-apple-pay-preview')) return true;

    const nativePayment = document.querySelector('.shopify-payment-button, shopify-accelerated-checkout');
    if (!nativePayment) return false;

    const wrapper = document.createElement('div');
    wrapper.id = 'hbm-kashier-apple-pay-preview';
    wrapper.setAttribute('data-hbm-kashier-preview', 'true');
    wrapper.innerHTML = `
      <div id="kashier-sdk-id"></div>
      <div id="kashier-success-id" hidden></div>
      <div id="kashier-failure-id" hidden></div>
      <button type="button" class="hbm-apple-pay-preview" aria-label="Buy with Apple Pay">
        <span class="hbm-apple-pay-fallback"> Pay</span>
      </button>
    `;

    const style = document.createElement('style');
    style.id = 'hbm-kashier-apple-pay-preview-style';
    style.textContent = `
      #hbm-kashier-apple-pay-preview{width:100%;margin-top:12px}
      #hbm-kashier-apple-pay-preview .hbm-apple-pay-preview{
        width:100%;min-height:56px;border:0;border-radius:12px;background:#000;color:#fff;
        display:flex;align-items:center;justify-content:center;cursor:default;padding:0 18px;
        font:600 22px/1 -apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;
      }
      @supports (-webkit-appearance: -apple-pay-button) {
        #hbm-kashier-apple-pay-preview .hbm-apple-pay-preview{
          -webkit-appearance:-apple-pay-button;
          -apple-pay-button-type:buy;
          -apple-pay-button-style:black;
          height:56px;
        }
        #hbm-kashier-apple-pay-preview .hbm-apple-pay-fallback{display:none}
      }
    `;

    nativePayment.style.display = 'none';
    nativePayment.insertAdjacentElement('afterend', wrapper);
    document.head.appendChild(style);

    // Preview only: Kashier requires a server-created sessionId before payment can be enabled.
    wrapper.querySelector('.hbm-apple-pay-preview')?.addEventListener('click', (event) => {
      event.preventDefault();
      event.stopPropagation();
      console.info('[HBM Kashier] Apple Pay button mounted. Waiting for Kashier domain certificate and server payment-session endpoint.');
    });

    loadKashierSdk();
    return true;
  }

  function boot() {
    if (mountApplePayPreview()) return;
    const observer = new MutationObserver(() => {
      if (mountApplePayPreview()) observer.disconnect();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    setTimeout(() => observer.disconnect(), 15000);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }
})();
