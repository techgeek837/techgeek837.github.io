async function showBattery() {
  let response = await navigator.getBattery();
  let status = response.charging ? "Plugged In" : "On Battery";
  battery.innerHTML = `${Math.floor(response.level * 100)}% and ${status}`;
}

showBattery();
setInterval(showBattery, 50000);

let canvas = document.getElementById("mycanvas")
let ctx = canvas.getContext("2d");
// ctx.fillStyle = "#FD0";
// ctx.fillRect(0, 0, 75, 75);
// ctx.fillStyle = "#6C0";
// ctx.fillRect(75, 0, 75, 75);
// ctx.fillStyle = "#09F";
// ctx.fillRect(0, 75, 75, 75);
// ctx.fillStyle = "#F30";
// ctx.fillRect(75, 75, 75, 75);
// ctx.fillStyle = "#FFF";

// // set transparency value
// ctx.globalAlpha = 0.1;

// // Draw semi transparent circles
// for (var i = 0; i < 7; i++) {
//   ctx.beginPath();
//   ctx.arc(75, 75, 10 + 10 * i, 0, Math.PI * 2, true);
//   ctx.fill();
// }
// if (window.PointerEvent) {
//   canvas.addEventListener("pointerdown", start, false);
//   canvas.addEventListener("pointermove", move, false);
// } else {
  canvas.addEventListener("touchstart", start, false);
  canvas.addEventListener("touchmove", move, false);

//canvas.addEventListener('touchend',end,false)
button.addEventListener('click',()=>{
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

function start(e)
{
    e.preventDefault()
    ctx.beginPath()
    ctx.moveTo(e.touches[0].clientX-canvas.offsetLeft,e.touches[0].clientY-canvas.offsetTop)
}
function move(e){
    e.preventDefault()
    ctx.lineTo(e.touches[0].clientX-canvas.offsetLeft,e.touches[0].clientY-canvas.offsetTop)
    ctx.stroke()
}

