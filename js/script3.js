
		document.querySelectorAll('.price-button').forEach(button => {
		button.addEventListener('click', function() {
		  // Получаем данные из атрибутов data-из кнопки
		  const plan = this.getAttribute('data-plan');
		  const price = this.getAttribute('data-price');

		  // Присваиваем их в скрытые поля
		  document.getElementById('hidden-plan').value = plan;
		  document.getElementById('hidden-price').value = price;
		});
	  });
	
        document.getElementById("myForm3").addEventListener("submit", submitForm);
		document.getElementById("form").addEventListener("submit", submitModalForm);

		let isFormSubmitted = false;
		let isFormSubmitte2 = false;

		function submitForm() {
		  event.preventDefault(); 
			
		  if (isFormSubmitted) {
			alert("Форма уже отправлена. Пожалуйста, подождите.");
			return;
		  }// Остановить стандартное поведение формы

		  const formData = new FormData(event.target);
		  const jsonData = {};
		  formData.forEach((value, key) => {
			jsonData[key] = value;
		  });

		  if (jsonData.name && jsonData.phone) {
				console.log("Отправляем JSON данные (основная форма):", JSON.stringify(jsonData));
				sendRequest(jsonData);
			} else {
				alert("Пожалуйста, заполните все обязательные поля в основной форме.");
			}
		  // Очистить форму
		  event.target.reset();
		}
		function submitModalForm() {
		  if (isFormSubmitte2) {
			alert("Форма уже отправлена. Пожалуйста, подождите.");
			return;
		  }
		  event.preventDefault(); // Остановить стандартное поведение формы
			const formData = new FormData(event.target);
			const jsonData = {};
			formData.forEach((value, key) => {
				jsonData[key] = value;
			});

		  // Считываем скрытые поля для модальной формы
		  jsonData['plan'] = document.getElementById('hidden-plan').value;
		  jsonData['price'] = document.getElementById('hidden-price').value;

		  // Добавляем остальные данные формы
		  formData.forEach((value, key) => {
			jsonData[key] = value;
		  });

		  if (jsonData.name && jsonData.phone && jsonData.plan && jsonData.price) {
				console.log("Отправляем JSON данные (модальная форма):", JSON.stringify(jsonData));
				sendRequest(jsonData);
			} else {
				alert("Пожалуйста, заполните все обязательные поля в модальной форме.");
			}

		  // Очистить форму
		  event.target.reset();
		}

		function sendRequest(jsonData) {
		  const request = new XMLHttpRequest();
		  request.open("POST", "/.netlify/functions/sendEmail");
		  request.setRequestHeader("Content-Type", "application/json");
          request.send(JSON.stringify(jsonData));
		  // Отправить данные
		  request.onreadystatechange = function () {
			if (request.readyState === XMLHttpRequest.DONE) {
			  if (request.status === 200) {
				console.log("Успех:", request.responseText);
				alert("Ваш запрос успешно отправлен!");
			  } else {
				console.error("Ошибка:", request.status, request.statusText);
				alert("Произошла ошибка при отправке запроса.");
			  }
			}
		  };

		  
		}// JavaScript Document