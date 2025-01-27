document.addEventListener('DOMContentLoaded', () => {
  var slider = tns({
    container: '.track', // Указываем контейнер с изображениями
    items: 4, // Количество видимых слайдов
    slideBy: 1, // Количество слайдов за раз
    loop: true, // Включаем бесконечный скролл
    autoplay: true, // Автоплей
    autoplayTimeout: 2400, // Интервал прокрутки (мс)
    autoplayButtonOutput: false, // Убираем кнопки управления автоплеем
    speed: 900, // Скорость анимации
    mouseDrag: true, // Возможность прокрутки мышью
    controls: false, // Убираем стрелки управления
    nav: false, // Убираем точки навигации
  });

  // События для восстановления автоплея
  const track = document.querySelector('.track');
  let isUserScrolling = false;

  // Останавливаем автоплей при взаимодействии пользователя
  track.addEventListener('mousedown', () => {
    isUserScrolling = true;
    slider.pause();
  });

  track.addEventListener('mouseup', () => {
    isUserScrolling = false;
    slider.play();
  });

  track.addEventListener('mouseleave', () => {
    if (!isUserScrolling) slider.play();
  });

  track.addEventListener('wheel', () => {
    isUserScrolling = true;
    clearTimeout(track.scrollTimeout);
    track.scrollTimeout = setTimeout(() => {
      isUserScrolling = false;
      slider.play();
    }, 10);
  });
});

// Открытие модального окна
var openModalButtons = document.querySelectorAll('.image-modal-trigger');
var modal_pict = document.getElementById('popup-modal');
var modalImage = document.getElementById('popup-image');
var closeModalButton_2 = document.querySelector('.close-popup');

var imageContainer2 = document.getElementById('popup-image-container');
var leftArrow = document.querySelector('.left-popup-arrow');
var rightArrow = document.querySelector('.right-popup-arrow');

var imageSets = {
    1: [101, 102, 103, 104, 105, 106],
    2: [201, 202, 203, 204, 205, 206],
    3: [301, 302, 303, 304, 305, 306],
    4: [401, 402, 403, 404, 405, 406, 407],
    5: [501, 502, 503, 504, 505, 506, 507, 508],
    6: [601, 602, 603, 604, 605, 606, 607],
    7: [701, 702, 703, 704, 705, 706, 707],
    8: [801, 802, 803, 804, 805, 806]
};

// Функция для загрузки изображений в слайдер
function loadSliderImages(imageIndex) {
    imageContainer2.innerHTML = ''; // Очищаем контейнер перед добавлением новых изображений

    // Пример слайдера для каждого набора изображений
    const totalImages = imageSets[imageIndex].length;
    for (let i = 0; i < totalImages; i++) {
        const img = document.createElement('img');
        img.src = `Image/${imageIndex * 100 + (i + 1)}.jpg`; // Генерация пути для изображений
        img.className = 'popup-slider-image';
        img.dataset.imageIndex = imageIndex; // Добавляем атрибут для дальнейшей обработки
        imageContainer2.appendChild(img);
    }
}

// Открытие модального окна для изображений
document.querySelector('.picture_scroll').addEventListener('click', function(event) {
    // Проверяем, что клик был по изображению с классом image-modal-trigger
    if (event.target && event.target.classList.contains('image-modal-trigger')) {
        const imageIndex = event.target.dataset.image;
        
        // Для слайдера: генерируем картинки для слайдера
        loadSliderImages(imageIndex);
        
        // Открываем модальное окно
        document.getElementById('popup-modal').style.display = 'flex';
        document.body.classList.add('popup_modal-open');
        setTimeout(() => {
            const container_scr = document.getElementById('popup-image-container');
            const centerPosition = container_scr.scrollWidth / 2 - container.clientWidth / 2;
            container_scr.scrollLeft = centerPosition;
        }, 30); 
    }
});

// Закрытие модального окна
closeModalButton_2.addEventListener('click', function() {
    modal_pict.style.display = 'none';
    document.body.classList.remove('popup_modal-open');
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(event) {
    if (event.target === modal_pict) {
        modal_pict.style.display = 'none';
        document.body.classList.remove('popup_modal-open');
    }
});

leftArrow.addEventListener('click', () => {
    imageContainer2.scrollBy({ left: -400, behavior: 'smooth' });
});

rightArrow.addEventListener('click', () => {
    imageContainer2.scrollBy({ left: 400, behavior: 'smooth' });
});
    
let isMouseDown = false;
let startX;
let scrollLeft;
    
function startScrolling(e) {
	console.log("Начало прокрутки");
    isMouseDown = true;
    startX = e.pageX || e.touches[0].pageX;  
    scrollLeft = imageContainer2.scrollLeft; 
}

function doScrolling(e) {
    if (!isMouseDown) return; 
    const x = e.pageX || e.touches[0].pageX; 
    const walk = (x - startX); 
    imageContainer2.scrollLeft = scrollLeft - walk; 
	console.log("Прокрутка: ", walk, "scrollLeft:", container.scrollLeft);
}

function stopScrolling() {
	console.log("Завершение прокрутки");
    isMouseDown = false;
}

imageContainer2.addEventListener('mousedown', startScrolling); 
imageContainer2.addEventListener('mousemove', doScrolling);
imageContainer2.addEventListener('mouseup', stopScrolling); 
imageContainer2.addEventListener('mouseleave', stopScrolling); 