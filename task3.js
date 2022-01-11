// Задание 3

// 1. Реализовать чат на основе эхо-сервера wss://echo-ws-service.herokuapp.com.
// Интерфейс состоит из input, куда вводится текст сообщения, и кнопки «Отправить».
// При клике на кнопку «Отправить» сообщение должно появляться в окне переписки.
// Эхо-сервер будет отвечать вам тем же сообщением, его также необходимо выводить в чат
// 2. Добавить в чат механизм отправки гео-локации

// При клике на кнопку «Гео-локация» необходимо отправить данные серверу 
// и в чат вывести ссылку на https://www.openstreetmap.org/ с вашей гео-локацией. 
// Сообщение, которое отправит обратно эхо-сервер, не выводить.

const wsUrl = "wss://echo-ws-service.herokuapp.com";

function pageLoaded() {
	const infoOutput = document.querySelector(".info_output");
	const chatOutput = document.querySelector(".chat_output");
	const input = document.querySelector("input");
	const sendBtn = document.querySelector(".btn_send");

	let socket = new WebSocket(wsUrl);

	socket.onopen = () => {
		infoOutput.innerText = "Соединение установлено";
	}

	socket.onmessage = (event) => {
		writeToChat(event.data, true);
	}

	socket.onerror = () => {
		infoOutput.innerText =  "При передаче данных произошла ошибка"
	}

	sendBtn.addEventListener('click', sendMessage); 

	function sendMessage() {
		if (!input.value) return;
		//  или if (!input.value ==="") return;
		socket.send(input.value);
		writeToChat(input.value, false);
		input.value === "";
	}

	function writeToChat(message, isRecieved) {
		let messageHTML = `<div class="${isRecieved? "recieved" : "sent" }">${message}</div>`;
		chatOutput.innerHTML += messageHTML;
	}
}

document.addEventListener("DOMContentLoaded", pageLoaded)