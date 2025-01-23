var container = document.getElementById("track");

function checkDimensions() {
    var images = document.querySelectorAll("#track img");
    var totalWidth = 0;

    images.forEach(function (img) {
        totalWidth += img.offsetWidth; // Суммируем ширину картинок
    });

    // Рассчитываем ширину контейнера в процентах
    var containerWidth = totalWidth;
    var containerPercentageWidth = (containerWidth / window.innerWidth) * 100;

    container.style.width = containerPercentageWidth + "%"; // Устанавливаем ширину в процентах
}
checkDimensions();

const scrollContainer = document.querySelector('.picture_scroll');
const scrollTrack = document.querySelector('.track');

let isScrollDragging = false;
let scrollStartX;
let initialScrollLeft;

// Флаг, чтобы определить, когда прокручиваем вручную
let isUserScrolling = false;

// Добавляем событие для начала перетаскивания
scrollContainer.addEventListener('mousedown', (e) => {
    isScrollDragging = true;
    scrollContainer.classList.add('dragging');
    scrollStartX = e.pageX - scrollContainer.offsetLeft;
    initialScrollLeft = scrollContainer.scrollLeft;
    
    e.preventDefault();
});

// Обработчик движения мыши
scrollContainer.addEventListener('mousemove', (e) => {
    if (!isScrollDragging) return;
    e.preventDefault();
    const currentX = e.pageX - scrollContainer.offsetLeft;
    const distance = (currentX - scrollStartX) * 2; // Ускорение прокрутки
    scrollContainer.scrollLeft = initialScrollLeft - distance;
});

// Завершаем перетаскивание
scrollContainer.addEventListener('mouseup', () => {
    isScrollDragging = false;
    scrollContainer.classList.remove('dragging');
});

// Завершаем перетаскивание, если мышь выходит за пределы контейнера
scrollContainer.addEventListener('mouseleave', () => {
    isScrollDragging = false;
    scrollContainer.classList.remove('dragging');
});
// Для мобильных устройств (сенсорное взаимодействие)
scrollContainer.addEventListener('touchstart', (e) => {
    isScrollDragging = true;
    scrollContainer.classList.add('dragging');
    scrollStartX = e.touches[0].pageX - scrollContainer.offsetLeft;
    initialScrollLeft = scrollContainer.scrollLeft;
    e.preventDefault();
});

scrollContainer.addEventListener('touchmove', (e) => {
    if (!isScrollDragging) return;
    e.preventDefault();
    const currentX = e.touches[0].pageX - scrollContainer.offsetLeft;
    const distance = (currentX - scrollStartX) * 2; // Ускорение прокрутки
    scrollContainer.scrollLeft = initialScrollLeft - distance;
});

scrollContainer.addEventListener('touchend', () => {
    isScrollDragging = false;
    scrollContainer.classList.remove('dragging');
});

scrollContainer.addEventListener('touchcancel', () => {
    isScrollDragging = false;
    scrollContainer.classList.remove('dragging');
});
// Бесконечный скролл
scrollContainer.addEventListener('scroll', function () {
    if (isUserScrolling) return; // Не делать бесконечный скролл, если пользователь прокручивает вручную

    const maxScrollPosition = scrollContainer.scrollWidth - scrollContainer.clientWidth;

    if (scrollContainer.scrollLeft <= 0) {
        // Перемещаемся в конец
        scrollContainer.scrollLeft = maxScrollPosition - 1;
    } else if (scrollContainer.scrollLeft >= maxScrollPosition) {
        // Перемещаемся в начало
        scrollContainer.scrollLeft = 1;
    }

    // Если контейнер прокручивается до конца, то обновляем картинки
    if (scrollContainer.scrollLeft >= maxScrollPosition || scrollContainer.scrollLeft <= 0) {
        updateTrack(); // Обновляем состояние контента
    }
});

// Управление колесиком мыши
container.addEventListener("wheel", function (e) {
    e.preventDefault();
    isUserScrolling = true; // Устанавливаем флаг, что пользователь прокручивает вручную
    container.scrollLeft += e.deltaY > 0 ? 100 : -100;

    // Ожидание завершения прокрутки, чтобы восстановить флаг
    clearTimeout(container.scrollTimeout);
    container.scrollTimeout = setTimeout(function() {
        isUserScrolling = false;
    }, 100);
});

// Функция для обновления картинок
function updateTrack() {
    const images = document.querySelectorAll("#track img");

    // Если картинок меньше 2, добавляем новые
    if (images.length < 2) {
        const img = document.createElement('img');
        img.src = "path_to_new_image"; // Путь к новой картинке
        img.alt = "New Image";
        scrollTrack.appendChild(img); // Добавляем новую картинку в конец
        checkDimensions(); // Пересчитываем размеры
    }
}

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
    2: [201, 202, 203, 204, 205, 206, 207, 208],
    3: [301, 302, 303, 304, 305, 306],
    4: [401, 402, 403, 404, 405, 406, 407, 408],
    5: [501, 502, 503, 504, 505, 506, 507, 508],
    6: [601, 602, 603, 604, 605, 606, 607],
    7: [701, 702, 703, 704, 705, 706, 707],
    8: [801, 802, 803, 804, 805, 806]
};

// Функция открытия модального окна

document.querySelectorAll('.image-modal-trigger').forEach(image => {
    image.addEventListener('click', function() {
        const imageIndex = this.dataset.image;  
        
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
		
    });
});
// Функция для загрузки изображений в слайдер
function loadSliderImages(imageIndex) {
    imageContainer2.innerHTML = ''; 

    // Пример слайдера для каждого набора изображений
    const totalImages = imageSets[imageIndex].length;  
    for (let i = 0; i < totalImages; i++) {
        const img = document.createElement('img');
        img.src = `Image/${imageIndex * 100 + (i + 1)}.jpg`;  
        img.className = 'popup-slider-image';
        imageContainer2.appendChild(img);
    }
}

// Закрытие модального окна
closeModalButton_2.addEventListener('click', function() {
    modal_pict.style.display = 'none';
	document.body.classList.remove('popup_modal-open');
});

// Закрытие модального окна при клике вне его
window.addEventListener('click', function(event) {
    if (event.target === modal_pict) {
        modal_pict.style.display = 'none';
		;
		document.body.classList.remove('popup_modal-open')
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