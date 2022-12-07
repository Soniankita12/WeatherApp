const wrapper =document.querySelector(".wrapper"),
inputPart = document.querySelector(".input-part"),
infoTxt = inputPart.querySelector(".info-txt"),
inputField = inputPart.querySelector("input"),
locationBtn=inputPart.querySelector("button"),
weatherPart = wrapper.querySelector(".weather-part"),
wIcon = weatherPart.querySelector("img"),
arrowBack = wrapper.querySelector("header i");
let api;

inputField.addEventListener("keyup",e =>{
    if(e.key=="Enter"&& inputField.value != "")
    {
       requestApi(inputField.value);
    }

});
locationBtn.addEventListener("click",()=>{
    if(navigator.geolocation)
    {

    navigator.geolocation.getCurrentPosition(onSuccess,onError);
}
    else {
        alert("your browser not support geolocation api");
    }
});

function requestApi(city){
    
      api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=dc6cea2fce3ffcbb809813b4a44db875`;

     fetchData();
     }
function onSuccess(position)
{
    
    const {latitude, longitude} = position.coords;
     api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=dc6cea2fce3ffcbb809813b4a44db875`;
     
    fetchData(api);
}

function onError(error)
{
   
    
    infoTxt.innerText = error.message;

    infoTxt.classList.add("error");
}

function fetchData(){
    infoTxt.innerText = "Getting weather details...";
    infoTxt.classList.add("pending");
    fetch(api).then(res => res.json()).then(result => weatherDetails(result)).catch(() =>{
        infoTxt.innerText = "Something went wrong";
        infoTxt.classList.replace("pending", "error");
    });
}


function weatherDetails(info){
    if(info.cod == "404"){
        // infoTxt.classList.replace("pending", "error");
        infoTxt.innerText = `${inputField.value} isn't a valid city name`;
        console.log("error");
    }
    else{
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {temp, feels_like, humidity} = info.main;
        if(id == 800){
            wIcon.src = "clear-sky.png";
        }else if(id >= 200 && id <= 232){
            wIcon.src = "thunderstorm.png";  
        }else if(id >= 600 && id <= 622){
            wIcon.src = "snow.png";
        }else if(id >= 701 && id <= 781){
            wIcon.src = "haze.png";
        }else if(id >= 801 && id <= 804){
            wIcon.src = "cloudy (4).png";
        }else if((id >= 500 && id <= 531) || (id >= 300 && id <= 321)){
            wIcon.src = "rain.png";
        }
        weatherPart.querySelector(".temp .numb").innerText = Math.floor(temp)-273;
        weatherPart.querySelector(".weather").innerText = description;
        weatherPart.querySelector(".location span").innerText = `${city}, ${country}`;
        weatherPart.querySelector(".temp .numb-2").innerText = Math.floor(feels_like);
        weatherPart.querySelector(".humidity span").innerText = `${humidity}%`;
        infoTxt.classList.remove("pending", "error");
        infoTxt.innerText = "";
        inputField.value = "";
        wrapper.classList.add("active");
        console.log(info);
    }
}
arrowBack.addEventListener("click", ()=>{
    wrapper.classList.remove("active");
});