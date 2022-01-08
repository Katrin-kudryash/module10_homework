// Задание 1.

// Сверстайте кнопку, которая будет содержать в себе icon_01. 
// При клике на кнопку иконка должна меняться на icon_02. 
// Повторный клик меняет иконку обратно.


const btn = document.querySelector('.j-btn-test');

btn.addEventListener('click', () => {
	btn.classList.toggle('btn--magic');
});