import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const display: HTMLDivElement = document.querySelector("#display_kicks")!;

const buttonName = "⚽";
const button = document.createElement("button");
button.innerHTML = buttonName;

let kicks: number = 0;
display.innerText = `Kicks: ${kicks}`;

const kick_ball = () => {
  kicks += 1;
  display.innerText = `Kicks: ${kicks}`;
};

button.addEventListener("click", kick_ball);

let lastTimestamp = 0;

const updateKicks = (timestamp: number) => {
  if (lastTimestamp !== 0) {
    const elapsed = (timestamp - lastTimestamp) / 1000;  // Convert milliseconds to seconds
    kicks += elapsed;  // Increase counter by the elapsed time in seconds
    display.innerText = `Kicks: ${kicks.toFixed(2)}`;
  }
  lastTimestamp = timestamp;
  requestAnimationFrame(updateKicks);
};

requestAnimationFrame(updateKicks);


app.append(button);
app.append(display);
