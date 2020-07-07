setTimeout(()=>{
    gsap.from(".container", {
        duration: 1,
        opacity: 0.5,
        x: -100,
        ease: "elastic.out(4,0.3)"
      });
},400)


async function show() {
  let bp = await navigator.getBattery();
  let status = bp.charging ? "Plugged In" : "On Battery";
  batteryInfo.innerHTML = `${Math.floor(bp.level*100)}% and ${status} `  
}
show();
