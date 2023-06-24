'use strict';

// Get Geolocation data
const success = (pos) => {
    ajaxRequest(pos.coords.latitude, pos.coords.longitude);
};

const fail = (err) => {
    console.log(err.code + ' --- ');
};

navigator.geolocation.getCurrentPosition(success, fail);

// utc to milisec
const utcToJSTime = (utcTime) => {
    return utcTime * 1000;
}

const ajaxRequest = (lat, long) => {

    // Weather API Section
    const url = 'https://api.openweathermap.org/data/2.5/forecast';
    const appid = 'fec825f69ead25f480c1d0bdd9bffd5a';

    const params = new URLSearchParams({
        appid: appid,
        lat: lat,
        lon: long,
        units: 'metric',
        lang: 'ja',
    });
    
    // Create Body
    const requestUrl = `${url}?${params}`;

    response().catch((error) => {
        console.error(error);
    });
    // need to run async

    async function response() {
        const response = await fetch(requestUrl);

        if (!response.ok) {
            throw new Error('Request failed');
        }

        const jsonData = await response.json();
        
        jsonData.list.forEach((element,index) => {            
            const dateTime = new Date(utcToJSTime(element.dt));
            const month = dateTime.getMonth() + 1;
            const date = dateTime.getDate();
            const hours = dateTime.getHours();
            const min = String(dateTime.getMinutes()).padStart(2,'0');
            const temperature = Math.round(element.main.temp);
            const description = element.weather[0].description;
            const iconPath = `images/${element.weather[0].icon}.svg`
            
            if(index === 0) {
                // Current Weather info
                const CurrentWeather = 
                `
                <div class="icon"><img src="${iconPath}"></div>
                <div class="info">
                    <p>
                        <span class="description">Current Weather : ${description}</span>
                        <span class="temp">Temp : ${temperature} ℃</span>
                    </p>
                </div>
                `;
                document.getElementById("weather").innerHTML = CurrentWeather;

            } else {
                const tableRow =`
                <tr>
                    <td class='info'>${month}/${date} ${hours}:${min}</td>
                    <td class='icon'><img src="${iconPath}"></td>
                    <td><span class="description">${description}</td>
                    <td><span class="temp">${temperature}</td>
                </tr>
                `;
                document.getElementById("forecast").innerHTML += tableRow; 
            }              
        });
    }
};

