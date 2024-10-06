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
setInterval(kick_ball, 1000);


app.append(button);
app.append(display);
