// SDK 読み込み完了時のフック
window.fbAsyncInit = function () {
    const box = document.getElementById('latest');
    if (box && box.getAttribute('data-href')) {
      FB.XFBML.parse(box);
    }
  };
  
  /* ====== ここだけ自分の値に書き換えてください ====== */
  const PAGE_ID   = '100041438419301';
  const TOKEN       = 'EAAjcEBwx4mwBOxUq2bZC3ZBVJICx1hE6uRpVghmaAWSHScp1DWWKSIB33GJyq2YJbPNipPbIlPffuPb48oXUXR37ej7o5gr8pKNArTwaQ3r9DnHWbt9TGGaOUaCgRwix4ETYWoB0opbnMtV65fsBe5CA3WOX1J7CgafGDZBUm1OY3ZASw5ybb8arENTrGtA2FFYz2dYZD';
  /* ================================================= */
  
  let latestHref = '';
  
  async function refreshLatest() {
    try {
      const endpoint =
        `https://graph.facebook.com/v19.0/${PAGE_ID}/posts` +
        `?fields=permalink_url&limit=1&access_token=${TOKEN}`;
      const json = await fetch(endpoint).then(r => r.json());
      const permalink = json.data?.[0]?.permalink_url;
      if (!permalink) return;
  
      const box = document.getElementById('latest');
      if (permalink !== latestHref) {
        latestHref = permalink;
        box.setAttribute('data-href', permalink);
      }
      if (window.FB) FB.XFBML.parse(box);
    } catch (e) {
      console.error('Graph API 取得失敗', e);
    }
  }
  
  // 初回実行＋5分おきに更新
  refreshLatest();
  setInterval(refreshLatest, 300_000);
  