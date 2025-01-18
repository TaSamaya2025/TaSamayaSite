
var container = document.getElementById("track");
    var imagePath = "Image/"; 
    var totalImages = 8; 

    // Функция загрузки изображений
    function loadImages() {
      // Оригинальные изображения
      for (var i = 1; i <= totalImages; i++) {
        var img = document.createElement("img");
        img.src = imagePath + i + ".png";
        img.alt = "Image " + i;
        img.className = "image"; 
        img.dataset.imageSrc = img.src; 
        container.appendChild(img);
      }

      // Дублируем изображения для бесшовного скролла
      for (var j = 1; j <= totalImages; j++) {
        var duplicateImg = document.createElement("img");
        duplicateImg.src = imagePath + j + ".png";
        duplicateImg.className = "image"; 
        duplicateImg.dataset.imageSrc = duplicateImg.src;  
        container.appendChild(duplicateImg);
      }
    }

	loadImages();
	
	function checkDimensions() {
	  var images = document.querySelectorAll("#track img");
	  var totalWidth = 0;

	  images.forEach(function (img) {
		totalWidth += img.offsetWidth; // Суммируем ширину картинок
	  });

	  container.style.width = totalWidth + "px"; // Устанавливаем ширину
	}

	checkDimensions();

// Бесконечный скролл
    container.addEventListener("scroll", function () {
      var maxScrollLeft = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft <= 0) {
        // Перемещаемся в конец
        container.scrollLeft = maxScrollLeft - 1;
      } else if (container.scrollLeft >= maxScrollLeft) {
        // Перемещаемся в начало
        container.scrollLeft = 1;
      }
    });

    // Управление колесиком мыши
    container.addEventListener("wheel", function (e) {
      e.preventDefault();
      container.scrollLeft += e.deltaY > 0 ? 100 : -100; 
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
        }, 28); 
		
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
