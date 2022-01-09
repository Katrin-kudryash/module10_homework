// Задание 4
// На странице имеется кнопка. 
// Сделать так, чтобы по нажатию на кнопку определялось местоположение пользователя 
// и на страницу выводилась ссылка на Яндекс.Карты с меткой в месте, определенном Geolocation API

function pageLoaded() {
	let btn = document.getElementById('button');
	let output = document.getElementById('output');

	btn.addEventListener('click', getLocation); 

	function getLocation() {
		if ('geolocation' in navigator) {
			navigator.geolocation.getCurrentPosition(locationSucces, locationError)
		} else {
			writeOutput("Ваш браузер не поддерживает функцию определения местоположения")
		}
	}

	function locationSucces(data) {
		let link = `https://yandex.ru/maps/?pt=${data.coords.longitude},${data.coords.latitude}&z=18&l=map`
		writeOuptup(`<a href="${link}" target="_blank">Вы находитесь здесь</a>`);
	}

	function locationError() {
		writeOuptup('При определении местоположения произошла ошибка')
	}

	function writeOuptup(message) {
		output.innerHTML = `<p>${message}</p>`
	}
}

document.addEventListener('DOMContentLoaded', pageLoaded);