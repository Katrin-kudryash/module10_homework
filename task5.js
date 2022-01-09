// Задание5

// Написать приложение, которое выводит прогноз погоды для заданного города.
// Добавить на страницу кнопку, которая будет выводить прогноз погоды для текущего местоположения
// Для получения прогноза использовать OpenWeather 
// API: https://openweathermap.org/current/ 
// Для отправки запроса к API использовать Fetch

// Пример API запроса: https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={your api key}&units=metric&lang=ru
// Иконка: http://openweathermap.org/img/wn/${icon}.png

const apiURL = "https://api.openweathermap.org/data/2.5/weather";
const apiKey = "59aaed6f10d8ae0565183dd571a3b596";


function pageLoaded() {
	const btn = document.getElementById("button"); 
	const output = document.getElementById("output");

	btn.addEventListener("click", getLocation);

	function getLocation() {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition(locationSucces, locationError); 
		} else {
			writeOutput("В вашем браузере недоступна возможность определения местоположения");
		}
	}
		function locationSucces(data) {
			let coords = [data.coords.longitude, data.coords.latitude];
			let url = formatURL(coords);
			fetch(url)
			.then(response => {
				return response.json();
			})
			.then(data => {
				let outputText = formatOutput(data);
				writeOutput(outputText);
			})
		}

		function locationError() {
			writeOutput("При определении местоположения произошла ошибка");
		}

		function formatURL(coords) {
			let url = new URL(apiURL)
			url.searchParams.set("lat", coords[1]);
			url.searchParams.set("lon", coords[0]);
			url.searchParams.set("appid", apiKey);
			url.searchParams.set("units", "metric");
			url.searchParams.set("lang", "ru");
			return url;
		}

		function formatOutput(data) {
			let html = `
				<img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather[0].description}" />
				<p> Город: ${data.name}</p>
				<p>${data.weather[0].description}</p>
				<p>Температура: ${data.main.temp} &deg;C</p>
			`;
			return html;
		}

		function writeOutput(message) {
			output.innerHTML = message;
		}
	}

document.addEventListener("DOMContentLoaded", pageLoaded)

