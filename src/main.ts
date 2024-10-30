interface Item {
  name: string;
  price: number;
  skill: number;
  description: string;
}

const availableItems: Item[] = [
  { name: "Dribble", price: 10, skill: 0.1, description: "Move like Messi!" },
  { name: "Strength", price: 100, skill: 2, description: "Pump iron!" },
  { name: "Speed", price: 1000, skill: 50, description: "Run like Mbappe!" },
  {
    name: "Stamina",
    price: 500,
    skill: 25,
    description: "The most important!",
  },
  { name: "Pass", price: 750, skill: 37, description: "Bend it like Beckham!" },
];

import "./style.css";
const app: HTMLDivElement = document.querySelector("#app")!;
const display: HTMLDivElement = document.querySelector("#display_kicks")!;
const growthDisplay: HTMLDivElement = document.createElement("div");
const purchasesDisplay: HTMLDivElement = document.createElement("div");

const descriptionDisplay: HTMLDivElement = document.createElement("div");
descriptionDisplay.style.padding = "10px";
descriptionDisplay.style.marginTop = "10px";
descriptionDisplay.innerHTML = "Hover over an item to see its description";

let kicks: number = 0;
let growthRate: number = 0;

const purchases: { [key: string]: number } = {
  Dribble: 0,
  Strength: 0,
  Speed: 0,
  Pass: 0,
  Stamina: 0,
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
  
    // Add a kick animation
    display.classList.add("kick-animation");
    setTimeout(() => display.classList.remove("kick-animation"), 300);
  };

const createUpgradeButton = (item: Item) => {
  const button = document.createElement("button");
  button.innerHTML = `${item.name} (Price: ${item.price.toFixed(2)})`;
  button.disabled = true;

  button.addEventListener("mouseover", () => {
    descriptionDisplay.innerHTML = `<strong>${item.name}</strong>: ${item.description}`;
  });

  button.addEventListener("mouseout", () => {
    descriptionDisplay.innerHTML = "Hover over an item to see its description";
  });

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

  // Add subtle animation effect to the button
  kickButton.style.transform = "scale(1.2)";
  setTimeout(() => (kickButton.style.transform = "scale(1)"), 100);

  // Create a soccer ball element
  const soccerBall = document.createElement("div");
  soccerBall.classList.add("soccer-ball");

  // Position the ball near the button
  const buttonRect = kickButton.getBoundingClientRect();
  soccerBall.style.left = `${buttonRect.left + buttonRect.width / 2}px`;
  soccerBall.style.top = `${buttonRect.top}px`;

  // Append ball to the document
  document.body.appendChild(soccerBall);

  // Remove the ball after the animation completes
  soccerBall.addEventListener("animationend", () => {
    soccerBall.remove();
  });
};



const kickButton = document.createElement("button");

kickButton.innerHTML = "⚽ Kick";
kickButton.style.fontSize = "2em";
kickButton.style.padding = "0.5em 1em";
kickButton.style.backgroundColor = "var(--primary-color)";
kickButton.style.color = "white";
kickButton.style.border = "2px solid var(--secondary-color)";
kickButton.style.borderRadius = "50%";
kickButton.style.transition = "transform 0.1s";

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
app.appendChild(descriptionDisplay);
requestAnimationFrame(updateKicks);

app.appendChild(display);
