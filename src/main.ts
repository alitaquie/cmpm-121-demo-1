import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;
const display: HTMLDivElement = document.querySelector("#display_kicks")!;

const buttonName = "⚽";
const button = document.createElement("button");
const upgradeName = "Upgrade";
const upgrade = document.createElement("button");

button.innerHTML = buttonName;
upgrade.innerHTML = upgradeName;

let kicks: number = 0;
let growthRate: number = 0;


display.innerText = `Kicks: ${kicks}`;

function upgrade_available(kicks: number){
    if(kicks>=10){
        upgrade.disabled = false;
    }else{
        upgrade.disabled = true;
    }
}

const kick_ball = () => {
  kicks += 1;
  display.innerText = `Kicks: ${kicks}`;
  upgrade_available(kicks);
};

button.addEventListener("click", kick_ball);



function purchase(){
    if (kicks >= 10) {
      kicks -= 10; // Deduct 10 kicks
      growthRate += 1; // Increase growth rate by 1
      display.innerText = `Kicks: ${kicks.toFixed(2)}`;
      upgrade_available(kicks); // Recheck if upgrade can be bought again
    }
  };

upgrade.addEventListener("click", purchase);

let lastTimestamp = 0;


const updateKicks = (timestamp: number) => {
  if (lastTimestamp !== 0) {
    const elapsed = (timestamp - lastTimestamp) / 1000; // Convert milliseconds to seconds
    kicks += growthRate * elapsed; // Increase counter by the elapsed time in seconds
    display.innerText = `Kicks: ${kicks.toFixed(2)}`;
    upgrade_available(kicks);
  }
  lastTimestamp = timestamp;
  requestAnimationFrame(updateKicks);
};

requestAnimationFrame(updateKicks);

app.append(button);
app.append(display);
app.append(upgrade);