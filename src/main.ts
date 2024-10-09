interface Item {
  name: string;
  price: number;
  skill: number;
}

const availableItems: Item[] = [
  { name: "Dribble", price: 10, skill: 0.1 },
  { name: "Strength", price: 100, skill: 2 },
  { name: "Speed", price: 1000, skill: 50 },
];

import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const display: HTMLDivElement = document.querySelector("#display_kicks")!;
const growthDisplay: HTMLDivElement = document.createElement("div");
const purchasesDisplay: HTMLDivElement = document.createElement("div");

let kicks: number = 0;
let growthRate: number = 0;

const purchases: { [key: string]: number } = {
  Dribble: 0,
  Strength: 0,
  Speed: 0,
};

display.innerText = `Goals: ${kicks.toFixed(2)}`;
growthDisplay.innerText = `Growth Rate: ${growthRate.toFixed(2)} Goals/sec`;
purchasesDisplay.innerHTML = availableItems
  .map(
    (item) => `
  <p>Purchased ${item.name}: ${purchases[item.name]}</p>
`,
  )
  .join("");

const updateDisplays = () => {
  display.innerText = `Goals: ${kicks.toFixed(2)}`;
  growthDisplay.innerText = `Player Stats: ${growthRate.toFixed(2)} Goals/sec`;
  purchasesDisplay.innerHTML = availableItems
    .map(
      (item) => `
    <p>Purchased ${item.name}: ${purchases[item.name]}</p>
  `,
    )
    .join("");
};

const createUpgradeButton = (
  item: Item,
) => {
  const button = document.createElement("button");
  button.innerHTML = `${item.name} (Price: ${item.price.toFixed(2)})`;
  button.disabled = true;

  button.addEventListener("click", () => {
    if (kicks >= item.price) {
      kicks -= item.price;
      growthRate += item.skill;
      purchases[item.name]++;
      item.price *= 1.15;
      updateDisplays();
    }
  });

  app.appendChild(button);
  return button;
};

const upgradeButtons = availableItems.map(createUpgradeButton);

const checkUpgradeAvailability = () => {
  availableItems.forEach((item, index) => {
    upgradeButtons[index].disabled = kicks < item.price;
    upgradeButtons[index].innerHTML =
      `${item.name} (Price: ${item.price.toFixed(2)})`;
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
