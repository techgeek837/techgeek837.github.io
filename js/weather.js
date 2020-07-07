const apikey = `c2e9af3de639633e88ca49bd442d3401`

function getLocation(){
    navigator.geolocation.getCurrentPosition((pos)=>{
        getWeather(pos.coords.longitude,pos.coords.latitude)
    })
}

async function getWeather(longitude,latitude){
    longitude = longitude
    latitude = latitude  
    const apiURL = `http://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apikey}`
    let response = await fetch(apiURL)
    if(response.ok){
        let data = await response.json()
        //console.log(data)
        place.innerHTML = data.name
        lat.innerHTML = data.coord.lat
        lon.innerHTML = data.coord.lon
        country.innerHTML = data.sys.country
        sunrise.innerHTML = `${new Date(data.sys.sunrise).getHours()}:${new Date(data.sys.sunrise).getMinutes()}`
        sunset.innerHTML = `${new Date(data.sys.sunset).getHours()}:${new Date(data.sys.sunset).getMinutes()}`
    }
}



submit.onclick = getLocation