import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const display: HTMLDivElement = document.querySelector("#display_kicks")!;
const growthDisplay: HTMLDivElement = document.createElement("div");
const purchasesDisplay: HTMLDivElement = document.createElement("div");

let kicks: number = 0;
let growthRate: number = 0;

const purchases: { A: number; B: number; C: number } = {
  A: 0,
  B: 0,
  C: 0,
};


const upgrades = [
  { name: "Upgrade A", cost: 10, rate: 0.1, purchased: 0 },
  { name: "Upgrade B", cost: 100, rate: 2.0, purchased: 0 },
  { name: "Upgrade C", cost: 1000, rate: 50.0, purchased: 0 },
];

display.innerText = `Kicks: ${kicks.toFixed(2)}`;
growthDisplay.innerText = `Growth Rate: ${growthRate.toFixed(2)} kicks/sec`;
purchasesDisplay.innerHTML = `
  <p>Purchased A: ${purchases.A}</p>
  <p>Purchased B: ${purchases.B}</p>
  <p>Purchased C: ${purchases.C}</p>
`;

const updateDisplays = () => {
  display.innerText = `Kicks: ${kicks.toFixed(2)}`;
  growthDisplay.innerText = `Growth Rate: ${growthRate.toFixed(2)} kicks/sec`;
  purchasesDisplay.innerHTML = `
    <p>Purchased A: ${purchases.A}</p>
    <p>Purchased B: ${purchases.B}</p>
    <p>Purchased C: ${purchases.C}</p>
  `;
};

const createUpgradeButton = (
  upgrade: { name: string; cost: number; rate: number; purchased: number },
  index: number,
) => {
  const button = document.createElement("button");
  button.innerHTML = `${upgrade.name} (Cost: ${upgrade.cost.toFixed(2)})`;
  button.disabled = true;

  button.addEventListener("click", () => {
    if (kicks >= upgrade.cost) {
      kicks -= upgrade.cost;
      growthRate += upgrade.rate;
      if (index === 0) {
        purchases.A++;
      } else if (index === 1) {
        purchases.B++;
      } else if (index === 2) {
        purchases.C++;
      }
      upgrade.purchased++;
      upgrade.cost *= 1.15; 
      updateDisplays();
    }
  });

  app.appendChild(button);
  return button;
};

const upgradeButtons = upgrades.map(createUpgradeButton);

const checkUpgradeAvailability = () => {
  upgrades.forEach((upgrade, index) => {
    upgradeButtons[index].disabled = kicks < upgrade.cost;
    upgradeButtons[index].innerHTML = `${upgrade.name} (Cost: ${upgrade.cost.toFixed(2)})`;
  });
};

const kick_ball = () => {
  kicks += 1;
  updateDisplays();
  checkUpgradeAvailability();
};

const kickButton = document.createElement("button");
kickButton.innerHTML = "⚽ Kick";
kickButton.addEventListener("click", kick_ball);
app.appendChild(kickButton);

let lastTimestamp = 0;
const updateKicks = (timestamp: number) => {
  if (lastTimestamp !== 0) {
    const elapsed = (timestamp - lastTimestamp) / 1000;
    kicks += growthRate * elapsed;
    updateDisplays();
    checkUpgradeAvailability();
  }
  lastTimestamp = timestamp;
  requestAnimationFrame(updateKicks);
};

app.appendChild(growthDisplay);
app.appendChild(purchasesDisplay);
requestAnimationFrame(updateKicks);

app.appendChild(display);
