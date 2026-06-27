async function getweather() {
    const city=document.getElementById("city").value.trim();
    const result=document.getElementById("result");

    if(city===""){
        alert("please enter the city")
        return;
    }
    result.innerHTML="Loading..."

    try{
        const geo_response= await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(city)}&count=1`);
        const geo_data= await geo_response.json();

        if(!geo_data.results || geo_data.results.length === 0){
            result.innerHTML=`<p class="error">city not found</p>`;
            return;
        }

        const latitude=geo_data.results[0].latitude;
        const longitude =geo_data.results[0].longitude;
        const city_name=geo_data.results[0].name;
        const country=geo_data.results[0].country;

        const weather_response=await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,wind_speed_10m,wind_direction_10m&timezone=auto`);
        const weather_data=await weather_response.json();

        const weather=weather_data.current;

        const formatted_time=new Date(weather.time).toLocaleString();

        result.innerHTML=`
            <div class="weather">
                <h2>${city_name}, ${country}</h2>

                <p>
                    Temperature: ${weather.temperature_2m}°C
                </p>

                <p>
                    Wind Speed: ${weather.wind_speed_10m} km/h
                </p>

                <p>
                    Wind Direction: ${weather.wind_direction_10m}°
                </p>

                <p>
                    Time: ${formatted_time}
                </p>
            </div>
        `;


    }catch(error){
        result.innerHTML=`
            <p class="error">
                failed to fetch weather data
            </p>
        `;
        console.log(error);
    }
    
}