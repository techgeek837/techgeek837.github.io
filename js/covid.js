const hamburger = document.querySelector('.hamburger')
const navlinks = document.querySelector('.nav-links')
const links = document.querySelectorAll(".nav-links li")
const c = document.querySelectorAll('.cvalue')
const r = document.querySelectorAll('.rvalue')
const d = document.querySelectorAll('.dvalue')

hamburger.addEventListener('click',()=>{
    navlinks.classList.toggle('open');
    hamburger.classList.toggle('ate');
    links.forEach(link=>{
        link.classList.toggle('fade');
    })
})

let input = document.getElementById("input");
let date =new Date();

document.querySelector('.timedate').innerHTML = date;
document.querySelectorAll('.date')[0].innerHTML = `${date.getDate()}-${date.getMonth()+1}-${date.getFullYear()}`
document.querySelectorAll('.date')[1].innerHTML = `${date.getDate()-1}-${date.getMonth()+1}-${date.getFullYear()}`
document.querySelectorAll('.date')[2].innerHTML = `${date.getDate()-2}-${date.getMonth()+1}-${date.getFullYear()}`
async function stats(){
  let country = input.value
  let apiurl = `https://api.covid19api.com/country/${country}?from=2020-03-01T00:00:00Z&to=${date.getFullYear()}-0${date.getMonth()+1}-${date.getDate()}T00:00:00Z`
  try {
    let response = await fetch(apiurl);
    if(response.status == 404) throw new Error("Invalid Country")
    let arr = await response.json();
    c[0].innerHTML = arr[arr.length - 1].Confirmed;
    c[1].innerHTML = arr[arr.length - 2].Confirmed;
    c[2].innerHTML = arr[arr.length - 3].Confirmed;
    r[0].innerHTML = arr[arr.length - 1].Recovered;
    r[1].innerHTML = arr[arr.length - 2].Recovered;
    r[2].innerHTML = arr[arr.length - 3].Recovered;
    d[0].innerHTML = arr[arr.length - 1].Deaths;
    d[1].innerHTML = arr[arr.length - 2].Deaths;
    d[2].innerHTML = arr[arr.length - 3].Deaths;
    if ("vibrate" in navigator) {
      navigator.vibrate(50);
    }
    showSnack("Fetched");
  } catch (error) {
    showSnack(error.message);
  }
}


function showSnack(msg){
  let bar = document.createElement('div')
  bar.className = "snackBar"
  bar.innerHTML = msg
  document.body.append(bar)
  bar.style.bottom=25+'px'
  setTimeout(()=>bar.remove(),2000)
}



const options = {
  enableHighAccuracy: true, 
};

loc.onclick = () => {
  if ("geolocation" in navigator) {
    navigator.geolocation.getCurrentPosition(
      locationSuccess,
      locationFailure,
      options
    );
  }
};
function locationSuccess(o){
  showSnack("Locations access Granted")
  console.log(o.coords.latitude)
  console.log(o.coords.longitude)
  // alert(o.coords.altitude)
  // alert(o.coords.accuracy)
  // alert(o.coords.alitudeAccuracy) 
  // alert(o.coords.heading)
  // alert(o.coords.speed)  
}
function locationFailure(o){
  if(o.code == 1){
    showSnack("Location access Denied")
    console.log(o.message)
  }
}



async function bluetooth(){
  let support = await navigator.bluetooth.getAvailability()
  if(support){
    let devices = await navigator.bluetooth.requestDevice({ filters: [{ services: ['battery_service'] }] });
    console.log(devices)
  }
}
loc.onclick= ()=>window.bluetooth()


