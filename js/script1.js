/*Скрипт для бургер-меню*/
var menuToggle = document.getElementById('menu-toggle');
var navLinks = document.getElementById('nav-links');

menuToggle.addEventListener('click', function() {
  navLinks.classList.toggle('active');
});

var menuToggle = document.getElementById('menu-toggle');
menuToggle.addEventListener('click', function() {
  menuToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', function(e) {
        // Получаем бургер-меню
        const burgerMenu = document.querySelector('.nav-links a');
        // Удаляем активный класс, если нужно закрыть меню
        burgerMenu.classList.remove('active');
    });
});

// Функция для открытия модального окна
var modal = document.getElementById('modal');
var buttons = document.querySelectorAll('.price-button');
var selectedPlan = document.getElementById('selected-plan');
var selectedPrice = document.getElementById('selected-price');
var form = document.getElementById('form');
var closeModalBtn = document.querySelector('.close-btn');

var hiddenPlanField = document.getElementById('hidden-plan');
var hiddenPriceField = document.getElementById('hidden-price');

let isSubmitting = false;

buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    selectedPlan.textContent = button.getAttribute('data-plan');
	selectedPrice.textContent = button.getAttribute('data-price');
    modal.style.display = 'flex'; // Показываем модальное окно
	document.body.classList.add('no-scroll');
  });
});

// Закрытие модального окна
closeModalBtn.addEventListener('click', closeModal);
modal.addEventListener('click', function (event) {
  if (event.target === modal) closeModal();
  
});

function closeModal() {
  modal.style.display = 'none';
  clearForm();
  document.body.classList.remove('no-scroll');
}

// Очистка формы
function clearForm() {
  form.reset(); 
}

// Автоматическое изменение высоты текстового поля
var textarea = document.getElementById('message');
textarea.addEventListener('input', function () {
  this.style.height = 'auto'; 
  this.style.height = this.scrollHeight + 'px'; 
});

//Авторский надзор и менеджмент
document.querySelectorAll('.card-wrapper').forEach(card => {
        card.addEventListener('click', () => {
            const textWrapper = card.querySelector('.text-wrapper');
            textWrapper.classList.toggle('active');

            // Регулируем высоту
            if (textWrapper.classList.contains('active')) {
                textWrapper.style.maxHeight = textWrapper.scrollHeight + 'px';
            } else {
                textWrapper.style.maxHeight = '0';
            }
        });
    });

document.getElementById('scrollButton').addEventListener('click', function() {
    const targetBlock = document.getElementById('targetBlock');
    targetBlock.scrollIntoView({ behavior: 'smooth' });
  });

// Анимация в конце, зображения для каждой области
const imagesByArea = {
  A: ["Image/Та_самая_интерьер_25.png", "Image/Та_самая_интерьер_26.png", "Image/Та_самая_интерьер_27.png", "Image/Та_самая_интерьер_28.png", "Image/Та_самая_интерьер_29.png", "Image/Та_самая_интерьер_30.png", "Image/Та_самая_интерьер_31.png"],
  B: ["Image/Та_самая_интерьер_16.png", "Image/Та_самая_интерьер_17.png", "Image/Та_самая_интерьер_18.png", 
	  "Image/Та_самая_интерьер_19.png", "Image/Та_самая_интерьер_20.png"],
  C: ["Image/Та_самая_интерьер_10.png", "Image/Та_самая_интерьер_11.png", "Image/Та_самая_интерьер_12.png", 
	  "Image/Та_самая_интерьер_13.png", "Image/Та_самая_интерьер_14.png", "Image/Та_самая_интерьер_15.png"],
  D: ["Image/Та_самая_интерьер_21.png", "Image/Та_самая_интерьер_22.png", "Image/Та_самая_интерьер_23.png", 
	  "Image/Та_самая_интерьер_24.png"],
  E: ["Image/Та_самая_фото_интерьер.png", "Image/Та_самая_фото_интерьер_2.png", "Image/Та_самая_фото_интерьер_3.png"],
  F: ["Image/Та_самая_фото_интерьер_4.png", "Image/Та_самая_фото_интерьер_5.png", "Image/Та_самая_фото_интерьер_6.png"],
  G: ["Image/Та_самая_фото_интерьер_7.png", "Image/Та_самая_фото_интерьер_8.png", 
	  "Image/Та_самая_фото_интерьер_9.png"],};
// Функция для смены изображения в области
function changeImage(areaClass) {
  const areaImages = imagesByArea[areaClass];
  if (!areaImages) {
    console.error(`Нет изображений для области ${areaClass}`);
    return;
  }

  const randomIndex = Math.floor(Math.random() * areaImages.length);
  const newImageSrc = areaImages[randomIndex];
  const imgElement = document.querySelector(`.${areaClass}`);

  if (!imgElement) {
    console.error(`Элемент с классом ${areaClass} не найден`);
    return;
  }

  if (imgElement.src.endsWith(newImageSrc)) {
    return changeImage(areaClass);
  }

  imgElement.classList.add("hidden");
  setTimeout(() => {
    imgElement.src = newImageSrc;
    imgElement.classList.remove("hidden");
  }, 500);
}

// Функция для смены случайной области
function changeRandomArea() {
  const areas = Object.keys(imagesByArea);
  const randomArea = areas[Math.floor(Math.random() * areas.length)];
  changeImage(randomArea);
}

// Запускаем процесс смены изображений
setInterval(changeRandomArea, 3500);

document.getElementById('year').textContent = new Date().getFullYear();
