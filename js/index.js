let form = document.getElementById('form')
let input = document.getElementById('input')
let myBtn = document.getElementById('submit')
let ipDisplay = document.getElementById('ip-display')
let locDisplay = document.getElementById('location-display')
let timeZoneDisplay = document.getElementById('timezone-display')
let ispDisplay = document.getElementById('isp-display')
var mymap 

function initializingMap() 
{
var container = L.DomUtil.get('mapid');
if(container != null){
container._leaflet_id = null;
}
}

function showMap(data1, data2, data3) {
    
    mymap = L.map('mapid').setView([data1, data2], 20)
    
        
    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoicGVyZWJvbmlsYWRvIiwiYSI6ImNrdTZ5YmJvczNwcDgybnA4aDl5NzlhcDkifQ._tbgAFgB3lHPJZi5S1db1A', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'your.mapbox.access.token'
    }).addTo(mymap);
    L.marker([data1, data2]).addTo(mymap)
    .bindPopup(`<p>IP address: ${data3}</p>`)
    .openPopup();

    // i think this is useless so check and remove this
    mymap = ''
}

form.addEventListener('submit', (e)=>{

    let newIp = input.value;
    

    async function renderIp() {
        const res = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_zSwP09J9PKbl8q78zrTQ1B2cXrs8a&ipAddress=${newIp}`)
        const data = await res.json()
        
        // console.log(typeof data.ip)
        // this can be refactored into a function
        ipDisplay.textContent = data.ip
        locDisplay.innerHTML = `<div> ${data.location.city}, ${data.location.region}</div> <div> ${data.location.postalCode} </div>`
        timeZoneDisplay.textContent = data.location.timezone
        ispDisplay.textContent = data.isp

        showMap(data.location.lat, data.location.lng, data.ip)
        
        
        
        
        
        
    } 
    
    initializingMap()
    renderIp()

    e.preventDefault()
})




window.addEventListener('DOMContentLoaded', ()=>{
    async function renderIp() {
        const res = await fetch(`https://geo.ipify.org/api/v1?apiKey=at_zSwP09J9PKbl8q78zrTQ1B2cXrs8a&ipAddress=`)
        const data = await res.json()
        
        // console.log(data)
        // refactor into function
        ipDisplay.textContent = data.ip
        locDisplay.innerHTML = `<div> ${data.location.city}, ${data.location.region}</div> <div> ${data.location.postalCode} </div>`
        timeZoneDisplay.textContent = data.location.timezone
        ispDisplay.textContent = data.isp
        
        initializingMap()
        showMap(data.location.lat, data.location.lng, data.ip)

        
    } 
        

    renderIp()
    
})



    
    
 
        
    
    

  





    
    







