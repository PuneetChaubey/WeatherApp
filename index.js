// https://maps.google.com/maps?q=ranchi&t=&z=13&ie=UTF8&iwloc=&output=embed
function getData(){
    console.log("mai andar aa gya")
    let city = document.querySelector("#city").value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=3d462ebf2278877607e76328f94fdf95`;
    fetch(url)
    .then(function(res){
        return res.json();
    })
    .then(function(res){
        console.log("res :", res)
        appendData(res)
    })
    .catch(function(err){
        console.log("err :",err)
    })
}
function getDataLocation(lat,lon){
   
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=3d462ebf2278877607e76328f94fdf95`;
    fetch(url)
    .then(function(res){
        return res.json();
    })
    .then(function(res){
        appendData(res)
    })
    .catch(function(err){
        console.log("err :",err)
    })
}

function appendData(data){
    const container = document.querySelector("#container");
    container.innerHTML=null;
    const day = document.querySelector("#day");
     day.innerHTML=null;
     const next = document.querySelector("#week");
      next.innerHTML=null;
    let map = document.querySelector("#gmap_canvas");
    let city =document.createElement("p");
    city.innerText =`City_Name: ${ data.name}`;
    let  min = document.createElement("p");
    min.innerText = `Min_Temp. : ${Math.round(data.main.temp_min-273)} °C`;
    let max = document.createElement("p");
    max.innerText =`Max_Temp. : ${ Math.round(data.main.temp_max-273)} °C`;
    let current  = document.createElement("p");
    current.innerText= `Current_Temperature : ${Math.round(data.main.temp-273)} °C`;
    let humidity = document.createElement("p");
    humidity.innerText = `Humidity : ${Math.round(data.main.humidity)} %`;
    let pre = document.createElement("p");
    pre.innerText = `Pressure : ${Math.round(data.main.pressure)} mb.`;
  container.append(city, min, max, current,humidity, pre)
  map.src= ` https://maps.google.com/maps?q=${data.name}&t=&z=13&ie=UTF8&iwloc=&output=embed`
}
  function dataFor7day(lat,lon){
      const url =`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude={part}&appid=3d462ebf2278877607e76328f94fdf95`
      fetch(url)
      .then(function(res){
          return res.json();
      })
      .then(function(res){
          console.log("res 2:", res.daily)
          appendDataFor7day(res.daily)
      })
      .catch(function(err){
          console.log("err :",err)
      })
    }

    function appendDataFor7day(daily)
    {  
        let next = document.querySelector("#week");
        let div1 = document.createElement("div");
        let label = document.createElement("p")
        label.innerText = "A Week Extended Forecast For The Current Location";
        div1.append(label)
        next.append(div1);
        let day7div = document.querySelector("#day") 
        console.log("aa gya" ,daily)
           let i=0;
        daily.map(function(el){
            if(i!==0)
            {
                console.log(el.temp.min)
            let div = document.createElement("div");
            let  min = document.createElement("p");
            min.innerText = `Min_Temp. : ${Math.round(el.temp.min-273)} °C`;
            let max = document.createElement("p");
            max.innerText =`Max_Temp. : ${ Math.round(el.temp.max-273)} °C`;
            let days  = document.createElement("p");
            days.innerText= `Day_Temp. : ${Math.round(el.temp.day-273)} °C`;
         let night = document.createElement("p");
         night.innerText = `Night_Temp. :${Math.round(el.temp.night-273)} °C`
         div.append(min, max, days, night);
         day7div.append(div);
         
            }
            i++;
        })
    }

 function getWeather(){
    navigator.geolocation.getCurrentPosition(success)
    function success(position){
        var crd = position.coords;
        console.log('Your current position is:');
        console.log(`Latitude : ${crd.latitude}`);
        console.log(`Longitude: ${crd.longitude}`);
        console.log(`More or less ${crd.accuracy} meters.`);
        getDataLocation(crd.latitude,crd.longitude);
        dataFor7day(crd.latitude,crd.longitude);
    }
    
 }