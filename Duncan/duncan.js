const events = [
  { id:1, home:'Real Madrid', away:'Manchester City', odds:{home:1.9, draw:3.4, away:2.1}, minute:"45'" },
  { id:2, home:'PSG', away:'Bayern Munich', odds:{home:2.2, draw:3.5, away:2.8}, minute:"30'" },
  { id:3, home:'Barcelona', away:'Chelsea', odds:{home:1.8, draw:3.3, away:2.5}, minute:"20'" },
  { id:4, home:'Liverpool', away:'Juventus', odds:{home:2.0, draw:3.2, away:2.7}, minute:"50'" },
  { id:5, home:'AC Milan', away:'Atletico Madrid', odds:{home:2.1, draw:3.1, away:2.9}, minute:"10'" },
  { id:6, home:'Inter Milan', away:'Dortmund', odds:{home:1.7, draw:3.5, away:2.4}, minute:"40'" }
];

const bets = [];
const liveDiv = document.getElementById('live-games');
const betsDiv = document.getElementById('bets');
const totalDiv = document.getElementById('total');

function init() {
  events.forEach((g, index) => {
    const d = document.createElement('div');
    d.className = 'game-card';
    d.style.animationDelay = `${index * 0.1}s`;
    d.innerHTML = `
      <h3>${g.home} vs ${g.away} <span style="font-size:0.9em;color:#888">(${g.minute})</span></h3>
      <div class="odds">
        <button onclick="addBet(${g.id}, 'home', ${g.odds.home})">1: ${g.odds.home}</button>
        <button onclick="addBet(${g.id}, 'draw', ${g.odds.draw})">X: ${g.odds.draw}</button>
        <button onclick="addBet(${g.id}, 'away', ${g.odds.away})">2: ${g.odds.away}</button>
      </div>`;
    liveDiv.appendChild(d);
  });
}

function addBet(id, sel, odds) {
  const game = events.find(x => x.id === id);
  bets.push({ game, sel, odds, stake:0 });
  renderBets();
}

function updateStake(i, v) {
  bets[i].stake = parseFloat(v)||0;
  renderBets();
}

function removeBet(i) {
  bets.splice(i,1);
  renderBets();
}

function renderBets() {
  betsDiv.innerHTML = '';
  let total=0;
  bets.forEach((b,i)=>{
    const ret=(b.stake*b.odds).toFixed(2);
    total += parseFloat(ret);
    const div = document.createElement('div');
    div.className = 'bet-item';
    div.style.animationDelay = `${i * 0.1}s`;
    div.innerHTML = `
      <p>${b.game.home} vs ${b.game.away} — ${b.sel.toUpperCase()} @ ${b.odds}</p>
      <input type="number" min="0" onchange="updateStake(${i},this.value)" value="${b.stake}" />
      <p>Return: ${ret}</p>
      <button onclick="removeBet(${i})">Remove</button>`;
    betsDiv.appendChild(div);
  });
  totalDiv.textContent = `Total Return: ${total.toFixed(2)}`;
}

init();