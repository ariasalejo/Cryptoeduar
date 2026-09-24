const COINS = ['bitcoin','ethereum','binancecoin','solana','ripple','cardano','dogecoin','tron','polkadot','matic-network','litecoin','chainlink'];
async function fetchPrices(){
  try{
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&ids=${COINS.join(',')}&order=market_cap_desc&sparkline=false&price_change_percentage=24h`;
    const r = await fetch(url);
    if(!r.ok) throw new Error('API error');
    return await r.json();
  }catch(e){ console.error(e); return null; }
}
function renderPrices(coins){
  const tbody = document.getElementById('prices-body');
  if(!tbody) return;
  tbody.innerHTML = coins.map(c => {
    const ch = c.price_change_percentage_24h || 0;
    const cls = ch >= 0 ? 'price-up' : 'price-down';
    const arrow = ch >= 0 ? '▲' : '▼';
    return `<tr><td>${c.name} <span style="color:var(--text-dim)">${c.symbol.toUpperCase()}</span></td><td>$${c.current_price.toLocaleString()}</td><td class="${cls}">${arrow} ${Math.abs(ch).toFixed(2)}%</td><td>$${(c.market_cap/1e9).toFixed(2)}B</td></tr>`;
  }).join('');
}
async function init(){
  const coins = await fetchPrices();
  const el = document.getElementById('prices-body');
  if(coins) renderPrices(coins);
  else if(el) el.innerHTML = '<tr><td colspan="4" style="text-align:center;color:var(--text-muted)">Error cargando precios. Reintenta.</td></tr>';
}
document.addEventListener('DOMContentLoaded', init);
setInterval(init, 60000);
