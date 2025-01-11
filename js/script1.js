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
var form = document.getElementById('modal-form');
var closeModalBtn = document.querySelector('.close-btn');

var hiddenPlanField = document.getElementById('hidden-plan');
var hiddenPriceField = document.getElementById('hidden-price');

let isSubmitting = false;

buttons.forEach(function (button) {
  button.addEventListener('click', function () {
    selectedPlan.textContent = button.getAttribute('data-plan');
	selectedPrice.textContent = button.getAttribute('data-price');
	hiddenPlanField.value = button.getAttribute('data-plan');
    hiddenPriceField.value = button.getAttribute('data-price');
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
  hiddenPlanField.value = '';
  hiddenPriceField.value = '';
}

// Автоматическое изменение высоты текстового поля
var textarea = document.getElementById('message');
textarea.addEventListener('input', function () {
  this.style.height = 'auto'; 
  this.style.height = this.scrollHeight + 'px'; 
});

// Очистка формы после успешной отправки
form.addEventListener('submit', function (event) {
  event.preventDefault(); // Предотвращаем стандартное поведение
	
  if (isSubmitting) return;
  isSubmitting = true;
	
  const formData = new FormData(form);

  fetch(form.action, {
    method: 'POST',
    body: formData,
  })
    .then((response) => {
      if (response.ok || response.redirected) {
        alert('Форма успешно отправлена!');
        closeModal(); // Закрываем модальное окно
        form.reset(); // Очищаем форму
        window.location.href = 'Thank.html';
      } else {
        alert('Произошла ошибка. Попробуйте еще раз.');
      }
    })
    .catch((error) => {
      console.error('Ошибка сети:', error);
      alert('Ошибка сети. Проверьте подключение.');
    });
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
  A: ["Image/24.png", "Image/25.png", "Image/27.png", "Image/28.png", "Image/29.png", "Image/30.png", "Image/31.png", "Image/32.png", "Image/33.png"],
  B: ["Image/21.png", "Image/41.png", "Image/43.png", "Image/10.png", "Image/14.png", "Image/16.png"],
  C: ["Image/17.png", "Image/18.png", "Image/19.png", "Image/20.png", "Image/21.png", "Image/22.png"],
  D: ["Image/35.png", "Image/36.png", "Image/37.png", "Image/38.png", "Image/39.png", "Image/42.png", "Image/40.png"],
  E: ["Image/9.png", "Image/10.png", "Image/11.png"],
  F: ["Image/12.png", "Image/11.png", "Image/13.png"],
  G: ["Image/14.png", "Image/15.png", "Image/16.png"],};

const galleryItems = document.querySelectorAll(".gallery img");

// Функция для смены изображения в области
function changeImage(areaClass) {
  const areaImages = imagesByArea[areaClass]; 
  const randomIndex = Math.floor(Math.random() * areaImages.length);
  const newImageSrc = areaImages[randomIndex];

  const imgElement = document.querySelector(`.${areaClass}`);

  // Избегаем замены на то же изображение
  if (imgElement.src.includes(newImageSrc)) {
    return changeImage(areaClass);
  }

  imgElement.classList.add("hidden");
  setTimeout(() => {
    imgElement.src = newImageSrc;
    imgElement.classList.remove("hidden");
  }, 500);
}

// Функция для рандомного выбора области
function changeRandomArea() {
  const areas = Object.keys(imagesByArea); 
  const randomArea = areas[Math.floor(Math.random() * areas.length)];
  changeImage(randomArea);
}

setInterval(changeRandomArea, 3500);

document.getElementById('year').textContent = new Date().getFullYear();

