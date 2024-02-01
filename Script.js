function getWeatherAndSendSMS() {
    const location = document.getElementById('locationInput').value;
    if (!location) {
        alert("Please enter a location.");
        return;
    }

    const apiKey = 'a2ef3421d90e6fc83c412991cb13f32a'; // Replace with your weather API key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;

    fetch(url)
    .then(response => response.json())
    .then(data => {
        const weatherBox = document.getElementById('weatherBox');
        const weatherContent = document.getElementById('weatherContent');
        weatherContent.innerHTML = `
            Weather Forecast for ${data.name}, ${data.sys.country}:
            Temperature: ${data.main.temp} °C
            Humidity: ${data.main.humidity} %
            Weather: ${data.weather[0].description}
        `;

        weatherBox.style.display = 'block';
        displayWindyMap(data.coord.lat, data.coord.lon);

        // Send SMS
        sendMessage(weatherContent.innerText);
    })
    .catch(error => console.error('Error:', error));
}

function sendMessage() {
    const weatherContent = document.getElementById('weatherContent').innerText;
    const phoneNumber = '+94767621978'; // Ensure correct format

    const username = 'NilhaamKing';
    const password = 'Nilhaamking@2003';
    const apiKey = 'df72098d35fd27d2df52ac39d06a65d7-96ef9a3f-f908-4fa0-82f4-4b0a8c4ffb67';

    // Sending a request to your server endpoint
    fetch('https://y3k5j9.api.infobip.com/sms/2/text/single', {
        method: 'POST',
        headers: {
            'Authorization': 'Basic ' + btoa(`${username}:${password}`),
            'Content-Type': 'application/json',
            'x-api-key': apiKey
        },
         body: JSON.stringify({
            from: 'Alert',
            to: phoneNumber,
            text: weatherContent
        })
    })
    .then(response => response.json())
    .then(data => console.log('SMS sent successfully:', data))
    .catch(error => console.error('Error sending SMS:', error));
}



function displayWindyMap(latitude, longitude) {
    const windyMap = document.getElementById('windyMap');
    windyMap.innerHTML = `
        <iframe
            width="100%"
            height="100%"
            frameborder="0"
            src="https://embed.windy.com/embed2.html?lat=${latitude}&lon=${longitude}&zoom=5&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
        ></iframe>
    `;
}

// Additional event listeners or initialization code can be added here if necessary.
