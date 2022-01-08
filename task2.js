const btnScreen = document.querySelector('.j-btn-test');

btnScreen.addEventListener('click', () => {
	let widthScreen = window.screen.availWidth;
	let heightScreen = window.screen.availHeight;
	alert(`Высота экрана: ${widthScreen}; Ширина экрана: ${heightScreen}`)
});